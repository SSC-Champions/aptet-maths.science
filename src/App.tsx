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
  LeaderboardUser,
  UserProfile
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
  getActiveUser,
  setActiveUser,
  linkGoogleUser,
  getStoredAttempts, 
  saveQuizAttempt, 
  getSubjectProgressMap, 
  getUserStats, 
  getStoredReminders, 
  saveReminders, 
  getSheetsConfig, 
  saveSheetsConfig,
  getLeaderboardData,
  playStudyChime,
  getNextQuestionsForUser,
  markQuestionsAsAnsweredForUser,
  resetUserProgression,
  getUserAnsweredQuestionIds
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
import { LoginModal } from './components/LoginModal';

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
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'quizzes' | 'progress' | 'leaderboard' | 'reminders' | 'flashcards'>('quizzes');
  const [searchQuery, setSearchQuery] = useState('');
  
  // User Profile & Authentication State
  const [activeUser, setActiveUserState] = useState<UserProfile>(getActiveUser());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSheetsModal, setShowSheetsModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Active Quiz State (with PDF Sequence tracking)
  const [activeSubjectId, setActiveSubjectId] = useState<SubjectId | null>(null);
  const [activeQuizMode, setActiveQuizMode] = useState<QuizMode>('practice');
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<Question[]>([]);
  const [currentStartPdfNo, setCurrentStartPdfNo] = useState<number>(1);
  const [currentEndPdfNo, setCurrentEndPdfNo] = useState<number>(10);
  const [lastAttempt, setLastAttempt] = useState<QuizAttempt | null>(null);
  const [lastUserAnswers, setLastUserAnswers] = useState<Record<number, number>>({});
  const [lastFlaggedSet, setLastFlaggedSet] = useState<Set<number>>(new Set());

  // Persistent App State (Loaded per active user)
  const [progressMap, setProgressMap] = useState<Record<string, SubjectProgress>>(getSubjectProgressMap(activeUser.id));
  const [userStats, setUserStats] = useState<UserStats>(getUserStats(activeUser.id));
  const [attempts, setAttempts] = useState<QuizAttempt[]>(getStoredAttempts(activeUser.id));
  const [reminders, setReminders] = useState<StudyReminder[]>(getStoredReminders(activeUser.id));
  const [sheetsConfig, setSheetsConfig] = useState<GoogleSheetsConfig>(getSheetsConfig());
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>(getLeaderboardData());

  // In-app Notification Alert Toast
  const [reminderToast, setReminderToast] = useState<{ title: string; notes?: string } | null>(null);

  // Flashcards initial subject
  const [flashcardSubjectId, setFlashcardSubjectId] = useState<SubjectId>('cdp');

  // Reload state whenever active user changes
  const reloadUserState = (newUser: UserProfile) => {
    setActiveUserState(newUser);
    setProgressMap(getSubjectProgressMap(newUser.id));
    setUserStats(getUserStats(newUser.id));
    setAttempts(getStoredAttempts(newUser.id));
    setReminders(getStoredReminders(newUser.id));
    setLeaderboardUsers(getLeaderboardData());
    setActiveSubjectId(null);
    setLastAttempt(null);
  };

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        if (user.displayName || user.email) {
          const linked = linkGoogleUser(
            user.displayName || 'Google Student', 
            user.email || '', 
            user.photoURL || undefined
          );
          setActiveUserState(linked);
        }
      },
      () => {
        setCurrentUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Study Reminder Ticker (Every 30 seconds checks for time match)
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
          playStudyChime();
          setReminderToast({ title: r.title, notes: r.notes });

          if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification(`⏰ VidyaSetu Study Time: ${r.title}`, {
              body: r.notes || 'Time for your continuous practice questions!',
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
        const linked = linkGoogleUser(
          result.user.displayName || 'Google Student', 
          result.user.email || '', 
          result.user.photoURL || undefined
        );
        reloadUserState(linked);
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

  // Google Sheets Sync
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

  // START SEQUENTIAL QUIZ (Continues in exact PDF order, no repeats for same user)
  const handleStartSequentialQuiz = (subjId: SubjectId, count: number = 10) => {
    const { questions, startPdfNo, endPdfNo } = getNextQuestionsForUser(activeUser.id, subjId, count);

    setActiveSubjectId(subjId);
    setActiveQuizMode('practice');
    setActiveQuizQuestions(questions);
    setCurrentStartPdfNo(startPdfNo);
    setCurrentEndPdfNo(endPdfNo);
    setLastAttempt(null);
  };

  const handleResetProgression = (subjId: SubjectId) => {
    resetUserProgression(activeUser.id, subjId);
    setProgressMap(getSubjectProgressMap(activeUser.id));
  };

  // COMPLETE QUIZ
  const handleCompleteQuiz = (
    attempt: QuizAttempt, 
    answersMap: Record<number, number>, 
    flaggedSet: Set<number>
  ) => {
    saveQuizAttempt(attempt);

    // Mark questions as answered for this user so they are NOT repeated next time
    const answeredIds = activeQuizQuestions.map(q => q.id);
    markQuestionsAsAnsweredForUser(activeUser.id, attempt.subjectId, answeredIds);

    setLastAttempt(attempt);
    setLastUserAnswers(answersMap);
    setLastFlaggedSet(flaggedSet);

    // Refresh user state
    setAttempts(getStoredAttempts(activeUser.id));
    setProgressMap(getSubjectProgressMap(activeUser.id));
    setUserStats(getUserStats(activeUser.id));
    setLeaderboardUsers(getLeaderboardData());

    // Auto sync to sheets if configured & token available
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
        activeUser={activeUser}
        currentUser={currentUser}
        sheetsConfig={sheetsConfig}
        onOpenLoginModal={() => setShowLoginModal(true)}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
        onOpenSheetsModal={() => setShowSheetsModal(true)}
        isLoggingIn={isLoggingIn}
        activeRemindersCount={reminders.filter(r => r.enabled).length}
      />

      {/* In-app Reminder Toast Notification */}
      {reminderToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-indigo-900 text-white rounded-3xl p-4 shadow-2xl border border-indigo-500/50 flex items-start gap-3 animate-slide-up">
          <div className="w-9 h-9 rounded-2xl bg-indigo-700 flex items-center justify-center shrink-0">
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
            startPdfNo={currentStartPdfNo}
            endPdfNo={currentEndPdfNo}
            userId={activeUser.id}
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
            onContinueNextBatch={() => handleStartSequentialQuiz(activeSubjectId, 10)}
            onRetake={() => {
              setLastAttempt(null);
            }}
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
                  
                  <div className="relative z-10 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-xs font-bold uppercase tracking-wider">
                        <GraduationCap className="w-4 h-4 text-amber-400" />
                        <span>AP &amp; TS TET 2A Question Bank</span>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                        Continuous Sequential Mode Active
                      </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                      Subject-Wise Practice Quizzes
                    </h1>

                    <p className="text-indigo-100 text-sm sm:text-base mt-3 leading-relaxed">
                      Questions are delivered in the <span className="font-bold text-white underline decoration-amber-400">exact sequential order as printed in the exam question bank</span>. Your progress is saved so questions are <span className="font-bold text-amber-300">never repeated</span> for your student account!
                    </p>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 pt-6 border-t border-white/10 text-xs">
                      <div>
                        <span className="text-indigo-300 block">Logged In As</span>
                        <span className="text-base font-black text-white flex items-center gap-1.5 mt-0.5">
                          <span>{activeUser.avatar}</span>
                          <span>{activeUser.name}</span>
                        </span>
                      </div>
                      <div className="w-px h-8 bg-white/20" />
                      <div>
                        <span className="text-indigo-300 block">Sequential Order</span>
                        <span className="text-base font-black text-emerald-400">Page-by-Page PDF</span>
                      </div>
                      <div className="w-px h-8 bg-white/20" />
                      <div>
                        <span className="text-indigo-300 block">Step Derivations</span>
                        <span className="text-base font-black text-amber-300">Math &amp; Physics</span>
                      </div>
                      <div className="w-px h-8 bg-white/20" />
                      <div>
                        <span className="text-indigo-300 block">Memory Tricks</span>
                        <span className="text-base font-black text-pink-300">CDP, Telugu, Eng, Bio</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject Search & Quick Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      Subject Question Banks
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Select a subject to continue from your last unanswered question in the PDF sequence.
                    </p>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search subject or తెలుగు..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Subject Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSubjects.map(subj => {
                    const answeredList = getUserAnsweredQuestionIds(activeUser.id, subj.id);
                    return (
                      <SubjectCard
                        key={subj.id}
                        subject={subj}
                        progress={progressMap[subj.id]}
                        answeredCount={answeredList.length}
                        totalAvailable={subj.totalAvailable}
                        onStartSequentialQuiz={handleStartSequentialQuiz}
                        onResetProgression={handleResetProgression}
                        onOpenFlashcards={handleOpenFlashcards}
                      />
                    );
                  })}
                </div>

                {/* Switch Student Banner */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center shrink-0 text-2xl">
                      {activeUser.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          Current Student: {activeUser.name}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                          Continuous Progress Active
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mt-0.5">
                        Multiple students using this device? Switch or create profiles anytime so everyone receives non-repeating questions in sequence.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
                  >
                    <span>Switch / Manage Students</span>
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
                onStartQuiz={(id) => handleStartSequentialQuiz(id, 10)}
                onSyncAllToSheets={handleSyncAllToSheets}
                spreadsheetUrl={sheetsConfig.spreadsheetUrl}
                hasGoogleAuth={!!currentUser}
                onOpenGoogleSignIn={handleGoogleSignIn}
              />
            )}

            {activeTab === 'leaderboard' && (
              <Leaderboard
                users={leaderboardUsers}
                onStartQuiz={() => handleStartSequentialQuiz('cdp', 10)}
              />
            )}

            {activeTab === 'reminders' && (
              <StudyReminders
                reminders={reminders}
                userId={activeUser.id}
                onSaveReminders={(updated) => {
                  setReminders(updated);
                  saveReminders(updated, activeUser.id);
                }}
                onStartQuiz={(id) => handleStartSequentialQuiz(id, 10)}
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardsView
                initialSubjectId={flashcardSubjectId}
                onStartQuiz={(id) => handleStartSequentialQuiz(id, 10)}
              />
            )}
          </>
        )}
      </main>

      {/* Login & Student Switcher Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onGoogleSignIn={handleGoogleSignIn}
        onUserChanged={(u) => reloadUserState(u)}
        isLoggingIn={isLoggingIn}
      />

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
            <span>• TET Continuous Sequential Question Bank &amp; Progress Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Non-Repeating Questions</span>
            <span>•</span>
            <span>Step Derivations &amp; Memory Tricks</span>
            <span>•</span>
            <span>Google Sheets Sync Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
