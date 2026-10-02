/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  SubjectId, 
  QuizMode, 
  Question, 
  QuizAttempt, 
  SubjectProgress, 
  UserStats, 
  StudyReminder, 
  GoogleSheetsConfig,
  LeaderboardUser
} from './types/quiz';
import { SUBJECTS, QUESTIONS } from './data/questionsData';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken 
} from './services/auth';
import { 
  createQuizTrackerSpreadsheet, 
  appendQuizAttemptToSheet, 
  syncAllProgressToSheet 
} from './services/sheetsService';
import { 
  getStoredAttempts, 
  saveQuizAttempt, 
  getSubjectProgressMap, 
  getUserStats, 
  getStoredReminders, 
  saveReminders, 
  getSheetsConfig, 
  saveSheetsConfig,
  getLeaderboardData,
  playStudyChime
} from './services/storageService';
import { User } from 'firebase/auth';

import { Navbar } from './components/Navbar';
import { SubjectCard } from './components/SubjectCard';
import { QuizPlayer } from './components/QuizPlayer';
import { QuizResult } from './components/QuizResult';
import { ProgressDashboard } from './components/ProgressDashboard';
import { Leaderboard } from './components/Leaderboard';
import { StudyReminders } from './components/StudyReminders';
import { FlashcardsView } from './components/FlashcardsView';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';

import { 
  BookOpen, 
  Sparkles, 
  Search, 
  BellRing, 
  ChevronRight, 
  Trophy, 
  GraduationCap, 
  Layers, 
  X,
  Flame,
  FileSpreadsheet
} from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'quizzes' | 'progress' | 'leaderboard' | 'reminders' | 'flashcards'>('quizzes');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active Quiz State
  const [activeSubjectId, setActiveSubjectId] = useState<SubjectId | null>(null);
  const [activeQuizMode, setActiveQuizMode] = useState<QuizMode>('practice');
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<Question[]>([]);
  const [lastAttempt, setLastAttempt] = useState<QuizAttempt | null>(null);
  const [lastUserAnswers, setLastUserAnswers] = useState<Record<number, number>>({});
  const [lastFlaggedSet, setLastFlaggedSet] = useState<Set<number>>(new Set());

  // Persistent App State
  const [progressMap, setProgressMap] = useState<Record<string, SubjectProgress>>(getSubjectProgressMap());
  const [userStats, setUserStats] = useState<UserStats>(getUserStats());
  const [attempts, setAttempts] = useState<QuizAttempt[]>(getStoredAttempts());
  const [reminders, setReminders] = useState<StudyReminder[]>(getStoredReminders());
  const [sheetsConfig, setSheetsConfig] = useState<GoogleSheetsConfig>(getSheetsConfig());
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>(getLeaderboardData());

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSheetsModal, setShowSheetsModal] = useState(false);

  // In-app Notification Alert Toast
  const [reminderToast, setReminderToast] = useState<{ title: string; notes?: string } | null>(null);

  // Flashcards initial subject
  const [flashcardSubjectId, setFlashcardSubjectId] = useState<SubjectId>('cdp');

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
      },
      () => {
        setCurrentUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Study Reminder Ticker (Checks every 30 seconds for scheduled times)
  useEffect(() => {
    const daysMap: Record<number, 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'> = {
      0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat'
    };

    const interval = setInterval(() => {
      const now = new Date();
      const currentDay = daysMap[now.getDay()];
      const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      reminders.forEach(r => {
        if (r.enabled && r.time === currentTimeStr && r.days.includes(currentDay)) {
          // Play chime
          playStudyChime();
          setReminderToast({ title: r.title, notes: r.notes });

          // Browser notification if granted
          if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification(`⏰ VidyaSetu Study Time: ${r.title}`, {
              body: r.notes || 'Time for your scheduled subject practice quiz!',
              icon: '/favicon.ico'
            });
          }
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [reminders]);

  // Auth Actions
  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setShowSheetsModal(true);
      }
    } catch (err) {
      console.error('Sign-in failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleSignOut = async () => {
    await logout();
    setCurrentUser(null);
  };

  // Google Sheets Management
  const handleCreateSpreadsheet = async () => {
    const token = await getAccessToken();
    if (!token) throw new Error('Please sign in with Google first.');

    const res = await createQuizTrackerSpreadsheet(token);
    const updated: GoogleSheetsConfig = {
      ...sheetsConfig,
      spreadsheetId: res.spreadsheetId,
      spreadsheetUrl: res.spreadsheetUrl,
      lastSyncedAt: new Date().toLocaleString(),
    };
    setSheetsConfig(updated);
    saveSheetsConfig(updated);

    // Initial sync
    await syncAllProgressToSheet(token, res.spreadsheetId, progressMap, reminders);
  };

  const handleSyncAllToSheets = async () => {
    const token = await getAccessToken();
    if (!token) throw new Error('Please sign in with Google first.');
    if (!sheetsConfig.spreadsheetId) {
      await handleCreateSpreadsheet();
      return;
    }

    await syncAllProgressToSheet(token, sheetsConfig.spreadsheetId, progressMap, reminders);
    const updated: GoogleSheetsConfig = {
      ...sheetsConfig,
      lastSyncedAt: new Date().toLocaleString()
    };
    setSheetsConfig(updated);
    saveSheetsConfig(updated);
  };

  const handleSyncAttemptToSheets = async (attempt: QuizAttempt): Promise<boolean> => {
    const token = await getAccessToken();
    if (!token) return false;

    let targetSpreadsheetId = sheetsConfig.spreadsheetId;
    if (!targetSpreadsheetId) {
      const created = await createQuizTrackerSpreadsheet(token);
      targetSpreadsheetId = created.spreadsheetId;
      const updated: GoogleSheetsConfig = {
        ...sheetsConfig,
        spreadsheetId: created.spreadsheetId,
        spreadsheetUrl: created.spreadsheetUrl,
        lastSyncedAt: new Date().toLocaleString()
      };
      setSheetsConfig(updated);
      saveSheetsConfig(updated);
    }

    const ok = await appendQuizAttemptToSheet(token, targetSpreadsheetId, attempt);
    if (ok) {
      attempt.syncedToSheets = true;
      const updatedAttempts = attempts.map(a => a.id === attempt.id ? { ...a, syncedToSheets: true } : a);
      setAttempts(updatedAttempts);
    }
    return ok;
  };

  // Start Quiz
  const handleStartQuiz = (subjId: SubjectId, mode: QuizMode = 'practice', count: number = 10) => {
    const matching = QUESTIONS.filter(q => q.subjectId === subjId);
    // Shuffle and pick requested count
    const shuffled = [...matching].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, matching.length));

    setActiveSubjectId(subjId);
    setActiveQuizMode(mode);
    setActiveQuizQuestions(selected);
    setLastAttempt(null);
  };

  // Complete Quiz
  const handleCompleteQuiz = (
    attempt: QuizAttempt, 
    answersMap: Record<number, number>, 
    flaggedSet: Set<number>
  ) => {
    saveQuizAttempt(attempt);
    setLastAttempt(attempt);
    setLastUserAnswers(answersMap);
    setLastFlaggedSet(flaggedSet);

    // Refresh state
    setAttempts(getStoredAttempts());
    setProgressMap(getSubjectProgressMap());
    setUserStats(getUserStats());
    setLeaderboardUsers(getLeaderboardData());

    // Auto sync to sheets if configured & logged in
    getAccessToken().then(token => {
      if (token && sheetsConfig.spreadsheetId && sheetsConfig.isAutoSyncEnabled) {
        appendQuizAttemptToSheet(token, sheetsConfig.spreadsheetId, attempt);
      }
    });
  };

  const handleExitQuiz = () => {
    setActiveSubjectId(null);
    setLastAttempt(null);
  };

  const handleOpenFlashcards = (subjId: SubjectId) => {
    setFlashcardSubjectId(subjId);
    setActiveTab('flashcards');
  };

  const activeSubjectInfo = activeSubjectId ? SUBJECTS.find(s => s.id === activeSubjectId) : null;

  const filteredSubjects = SUBJECTS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.teluguName.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Top Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveSubjectId(null);
          setLastAttempt(null);
          setActiveTab(tab);
        }}
        userStats={userStats}
        currentUser={currentUser}
        sheetsConfig={sheetsConfig}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
        onOpenSheetsModal={() => setShowSheetsModal(true)}
        isLoggingIn={isLoggingIn}
        activeRemindersCount={reminders.filter(r => r.enabled).length}
      />

      {/* In-app Reminder Toast Notification */}
      {reminderToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-indigo-900 text-white rounded-2xl p-4 shadow-2xl border border-indigo-500/50 flex items-start gap-3 animate-slide-up">
          <div className="w-8 h-8 rounded-xl bg-indigo-700 flex items-center justify-center shrink-0">
            <BellRing className="w-5 h-5 text-amber-400 animate-bounce" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm">Study Reminder Alert!</h4>
            <p className="text-xs text-indigo-200 mt-0.5">{reminderToast.title}</p>
            {reminderToast.notes && (
              <p className="text-[11px] text-indigo-300 mt-1 italic">{reminderToast.notes}</p>
            )}
          </div>
          <button 
            onClick={() => setReminderToast(null)}
            className="p-1 text-indigo-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* ACTIVE QUIZ SCREEN */}
        {activeSubjectId && activeSubjectInfo && !lastAttempt && (
          <QuizPlayer
            subject={activeSubjectInfo}
            mode={activeQuizMode}
            questions={activeQuizQuestions}
            onCompleteQuiz={handleCompleteQuiz}
            onExitQuiz={handleExitQuiz}
          />
        )}

        {/* QUIZ RESULT SCREEN */}
        {activeSubjectId && activeSubjectInfo && lastAttempt && (
          <QuizResult
            attempt={lastAttempt}
            subject={activeSubjectInfo}
            questions={activeQuizQuestions}
            userAnswers={lastUserAnswers}
            flaggedSet={lastFlaggedSet}
            onRetake={() => handleStartQuiz(activeSubjectId, activeQuizMode, activeQuizQuestions.length)}
            onBackToHome={handleExitQuiz}
            onSyncToSheets={handleSyncAttemptToSheets}
            spreadsheetUrl={sheetsConfig.spreadsheetUrl}
            hasGoogleAuth={!!currentUser}
            onOpenGoogleSignIn={handleGoogleSignIn}
          />
        )}

        {/* DEFAULT TAB VIEWS (when not inside quiz) */}
        {!activeSubjectId && (
          <>
            {activeTab === 'quizzes' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                
                {/* Hero / Exam Overview Banner */}
                <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-4">
                      <GraduationCap className="w-4 h-4 text-amber-400" />
                      <span>AP &amp; TS TET 2A Teacher Eligibility Test</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                      Subject-Wise Practice Quizzes
                    </h1>

                    <p className="text-indigo-100 text-sm sm:text-base mt-3 leading-relaxed">
                      Prepare with authentic bilingual practice questions across Child Development &amp; Pedagogy, Telugu, English, Mathematics, Physical Science, and Biology. Track your progress and sync achievements directly with Google Sheets.
                    </p>

                    {/* Quick Stats Banner inside hero */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 pt-6 border-t border-white/10 text-xs">
                      <div>
                        <span className="text-indigo-300 block">Total Questions</span>
                        <span className="text-lg font-black text-white">2,000+ Bits</span>
                      </div>
                      <div className="w-px h-8 bg-white/20" />
                      <div>
                        <span className="text-indigo-300 block">Languages</span>
                        <span className="text-lg font-black text-white">English &amp; తెలుగు</span>
                      </div>
                      <div className="w-px h-8 bg-white/20" />
                      <div>
                        <span className="text-indigo-300 block">Google Sheets Sync</span>
                        <span className="text-lg font-black text-emerald-400">Available ✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject Search & Quick Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      Select Practice Subject
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Choose a subject below to launch quick practice drills, mastery tests, or concept flashcards.
                    </p>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search subject by name or తెలుగు..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Subject Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSubjects.map(subj => (
                    <SubjectCard
                      key={subj.id}
                      subject={subj}
                      progress={progressMap[subj.id]}
                      onStartQuiz={handleStartQuiz}
                      onOpenFlashcards={handleOpenFlashcards}
                    />
                  ))}
                </div>

                {/* Quick Practice All Features Banner */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center shrink-0">
                      <Sparkles className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        Study Consistency Engine
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mt-0.5">
                        Students who maintain a 5-day study streak and practice 10 questions daily improve retention by over 45%. Set your custom reminders now!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('reminders')}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all shrink-0"
                  >
                    <span>Manage Reminders</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <ProgressDashboard
                userStats={userStats}
                progressMap={progressMap}
                attempts={attempts}
                onStartQuiz={(id) => handleStartQuiz(id, 'practice', 10)}
                onSyncAllToSheets={handleSyncAllToSheets}
                spreadsheetUrl={sheetsConfig.spreadsheetUrl}
                hasGoogleAuth={!!currentUser}
                onOpenGoogleSignIn={handleGoogleSignIn}
              />
            )}

            {activeTab === 'leaderboard' && (
              <Leaderboard
                users={leaderboardUsers}
                onStartQuiz={() => handleStartQuiz('cdp', 'practice', 10)}
              />
            )}

            {activeTab === 'reminders' && (
              <StudyReminders
                reminders={reminders}
                onSaveReminders={(updated) => {
                  setReminders(updated);
                  saveReminders(updated);
                }}
                onStartQuiz={(id) => handleStartQuiz(id, 'practice', 10)}
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardsView
                initialSubjectId={flashcardSubjectId}
                onStartQuiz={(id) => handleStartQuiz(id, 'practice', 10)}
              />
            )}
          </>
        )}
      </main>

      {/* Google Sheets Modal Hub */}
      <GoogleSheetsModal
        isOpen={showSheetsModal}
        onClose={() => setShowSheetsModal(false)}
        currentUser={currentUser}
        sheetsConfig={sheetsConfig}
        onCreateSpreadsheet={handleCreateSpreadsheet}
        onSyncAll={handleSyncAllToSheets}
        onSignIn={handleGoogleSignIn}
        onSignOut={handleGoogleSignOut}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 dark:text-slate-200">VidyaSetu</span>
            <span>• TET &amp; Competitive Exam Practice Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Bilingual Support (Telugu &amp; English)</span>
            <span>•</span>
            <span>Google Sheets Sync Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
