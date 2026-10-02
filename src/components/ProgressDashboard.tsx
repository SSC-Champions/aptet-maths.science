import React, { useState } from 'react';
import { 
  UserStats, 
  SubjectProgress, 
  QuizAttempt, 
  SubjectId 
} from '../types/quiz';
import { SUBJECTS } from '../data/questionsData';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle, 
  Flame, 
  Award, 
  FileSpreadsheet, 
  Clock, 
  Sparkles, 
  ExternalLink,
  Target,
  AlertTriangle
} from 'lucide-react';

interface ProgressDashboardProps {
  userStats: UserStats;
  progressMap: Record<string, SubjectProgress>;
  attempts: QuizAttempt[];
  onStartQuiz: (subjectId: SubjectId) => void;
  onSyncAllToSheets: () => Promise<void>;
  spreadsheetUrl: string | null;
  hasGoogleAuth: boolean;
  onOpenGoogleSignIn: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  userStats,
  progressMap,
  attempts,
  onStartQuiz,
  onSyncAllToSheets,
  spreadsheetUrl,
  hasGoogleAuth,
  onOpenGoogleSignIn
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const overallAccuracy = userStats.totalQuestionsAnswered > 0
    ? Math.round((userStats.correctAnswersTotal / userStats.totalQuestionsAnswered) * 100)
    : 0;

  // Find strongest & weakest subjects
  let highestSubj: { name: string; acc: number } | null = null;
  let lowestSubj: { name: string; acc: number; id: SubjectId } | null = null;

  SUBJECTS.forEach(s => {
    const p = progressMap[s.id];
    if (p && p.totalAnswered > 0) {
      const acc = Math.round((p.correctAnswered / p.totalAnswered) * 100);
      if (!highestSubj || acc > highestSubj.acc) {
        highestSubj = { name: s.name, acc };
      }
      if (!lowestSubj || acc < lowestSubj.acc) {
        lowestSubj = { name: s.name, acc, id: s.id };
      }
    }
  });

  const handleConfirmSync = async () => {
    setShowConfirmModal(false);
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      await onSyncAllToSheets();
      setSyncMessage('Successfully updated Google Spreadsheet with latest performance records!');
    } catch (err: any) {
      setSyncMessage(err.message || 'Failed to sync to Google Sheets');
    } finally {
      setIsSyncing(false);
    }
  };

  const ACHIEVEMENTS = [
    { title: 'First Steps', desc: 'Completed onboarding quiz', icon: '🌱', unlocked: true },
    { title: 'Quiz Initiator', desc: 'Completed your first practice quiz', icon: '🎯', unlocked: userStats.quizzesCompleted >= 1 },
    { title: 'Consistent Scholar', desc: 'Completed 5+ full quizzes', icon: '📚', unlocked: userStats.quizzesCompleted >= 5 },
    { title: 'Centurion', desc: 'Scored 100% accuracy in a quiz', icon: '💯', unlocked: userStats.achievements.includes('Centurion') },
    { title: 'XP Pioneer', desc: 'Earned 1000+ total XP', icon: '⚡', unlocked: userStats.totalXp >= 1000 },
    { title: 'Streak Champion', desc: 'Maintained a 3+ day study streak', icon: '🔥', unlocked: userStats.currentStreakDays >= 3 }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
                Student Analytics
              </span>
              <span className="text-xs text-indigo-300 font-medium">
                Real-time Progress Tracker
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Learning Mastery &amp; Performance
            </h1>
            <p className="text-indigo-200 text-sm mt-1 max-w-xl">
              Track your subject-by-subject accuracy, learning curves, study consistency, and export records directly to Google Sheets.
            </p>
          </div>

          {/* Sync CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {hasGoogleAuth ? (
              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={isSyncing}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/30 transition-all disabled:opacity-50"
              >
                <FileSpreadsheet className="w-4 h-4" />
                {isSyncing ? 'Syncing...' : 'Sync All to Sheets'}
              </button>
            ) : (
              <button
                onClick={onOpenGoogleSignIn}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-800 font-bold text-xs sm:text-sm shadow-md hover:bg-slate-50 transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                Connect Google Sheets
              </button>
            )}

            {spreadsheetUrl && (
              <a
                href={spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors"
              >
                <span>View Sheet</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {syncMessage && (
          <div className="relative z-10 mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 text-xs">
            {syncMessage}
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Overall Accuracy</span>
            <Target className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {overallAccuracy}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {userStats.correctAnswersTotal} correct of {userStats.totalQuestionsAnswered} answered
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Quizzes Completed</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {userStats.quizzesCompleted}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Across 6 subject categories
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-500">
            {userStats.currentStreakDays} Days
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Active daily study streak
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Total Points (XP)</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
            {userStats.totalXp}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Leaderboard rank points
          </p>
        </div>
      </div>

      {/* Subject Wise Mastery Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Subject Mastery Breakdown
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Detailed tracking of proficiency level per syllabus domain
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECTS.map(subj => {
            const p = progressMap[subj.id];
            const quizzes = p?.quizzesTaken || 0;
            const accuracy = p && p.totalAnswered > 0
              ? Math.round((p.correctAnswered / p.totalAnswered) * 100)
              : 0;
            const mastery = p?.masteryLevel || 'Novice';

            return (
              <div 
                key={subj.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {subj.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {mastery}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-3">
                    {subj.teluguName}
                  </p>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <span>Accuracy</span>
                      <span>{accuracy}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${subj.gradient} rounded-full`}
                        style={{ width: `${Math.min(100, Math.max(accuracy, 4))}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-4">
                    <span>{quizzes} tests completed</span>
                    <span>Best: {p?.bestScorePercentage || 0}%</span>
                  </div>
                </div>

                <button
                  onClick={() => onStartQuiz(subj.id)}
                  className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 transition-colors"
                >
                  Practice Now →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Diagnostic Insights (Strongest vs Focus Area) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 rounded-3xl p-6">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Top Performing Area
          </div>
          {highestSubj ? (
            <div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                {(highestSubj as any).name}
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                Highest subject accuracy at {(highestSubj as any).acc}%. Great job maintaining high retention!
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-500">
              Complete your first quiz to uncover your strongest subject.
            </p>
          )}
        </div>

        <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 rounded-3xl p-6">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Suggested Revision Focus
          </div>
          {lowestSubj ? (
            <div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                {(lowestSubj as any).name}
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                Accuracy is {(lowestSubj as any).acc}%. Taking targeted 10Q practice quizzes here will boost your composite score.
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-500">
              Take practice quizzes to identify subjects that need revision.
            </p>
          )}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
          Achievements &amp; Milestones
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Earn badges by maintaining study streaks, solving quizzes, and attaining high scores
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ACHIEVEMENTS.map(ach => (
            <div 
              key={ach.title}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                ach.unlocked 
                  ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
              }`}
            >
              <div className="text-3xl mb-2">{ach.icon}</div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                {ach.title}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                {ach.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Attempts History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Recent Quiz Attempts
          </h2>
          <span className="text-xs text-slate-500">
            {attempts.length} recorded sessions
          </span>
        </div>

        {attempts.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No quiz attempts recorded yet. Start practicing today!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Subject</th>
                  <th className="pb-3">Mode</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Accuracy</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3 text-right">XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {attempts.map(att => (
                  <tr key={att.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="py-3 text-slate-600 dark:text-slate-300 text-xs">
                      {att.date}
                    </td>
                    <td className="py-3 font-semibold text-slate-900 dark:text-white">
                      {att.subjectName}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                        {att.mode}
                      </span>
                    </td>
                    <td className="py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      {att.correctAnswers} / {att.totalQuestions}
                    </td>
                    <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">
                      {att.scorePercentage}%
                    </td>
                    <td className="py-3 font-mono text-xs text-slate-500">
                      {Math.floor(att.timeSpentSeconds / 60)}m {att.timeSpentSeconds % 60}s
                    </td>
                    <td className="py-3 text-right font-bold text-amber-500">
                      +{att.xpEarned}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Google Sheets Sync (Mandatory as per skill) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Sync All Performance Data to Google Sheets?
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              This will update your Google Spreadsheet <span className="font-semibold text-slate-900 dark:text-white">"VidyaSetu - Quiz Tracker &amp; Progress"</span> with current accuracy percentages, subject mastery levels, and study schedule reminders.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSync}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
              >
                Confirm &amp; Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
