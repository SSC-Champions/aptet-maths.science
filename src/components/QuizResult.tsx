import React, { useState, useEffect } from 'react';
import { QuizAttempt, Question, SubjectInfo } from '../types/quiz';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Flag, 
  Clock, 
  Sparkles, 
  FileSpreadsheet, 
  ExternalLink,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';

interface QuizResultProps {
  attempt: QuizAttempt;
  subject: SubjectInfo;
  questions: Question[];
  userAnswers: Record<number, number>;
  flaggedSet: Set<number>;
  onRetake: () => void;
  onBackToHome: () => void;
  onSyncToSheets: (attempt: QuizAttempt) => Promise<boolean>;
  spreadsheetUrl: string | null;
  hasGoogleAuth: boolean;
  onOpenGoogleSignIn: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  attempt,
  subject,
  questions,
  userAnswers,
  flaggedSet,
  onRetake,
  onBackToHome,
  onSyncToSheets,
  spreadsheetUrl,
  hasGoogleAuth,
  onOpenGoogleSignIn
}) => {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(attempt.syncedToSheets || false);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    if (attempt.scorePercentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [attempt.scorePercentage]);

  const handleSheetsExport = async () => {
    if (!hasGoogleAuth) {
      onOpenGoogleSignIn();
      return;
    }

    setIsSyncing(true);
    setSyncError(null);
    try {
      const ok = await onSyncToSheets(attempt);
      if (ok) {
        setIsSynced(true);
      } else {
        setSyncError('Failed to sync row to Google Sheets. Please ensure spreadsheet exists.');
      }
    } catch (err: any) {
      setSyncError(err.message || 'Error syncing to Sheets');
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredQuestions = questions.filter(q => {
    const isAnswered = userAnswers[q.id] !== undefined;
    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    const isFlagged = flaggedSet.has(q.id);

    if (filter === 'incorrect') {
      return !isCorrect;
    }
    if (filter === 'flagged') {
      return isFlagged;
    }
    return true;
  });

  const minutes = Math.floor(attempt.timeSpentSeconds / 60);
  const seconds = attempt.timeSpentSeconds % 60;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Score Card Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-lg mb-8 text-center relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center shadow-md">
            <Trophy className="w-8 h-8 text-amber-500" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
            {subject.name} • {attempt.mode.replace('_', ' ').toUpperCase()}
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
            {attempt.scorePercentage >= 80 
              ? 'Outstanding Performance! 🎉' 
              : attempt.scorePercentage >= 60 
              ? 'Good Effort! Keep Practicing 👍' 
              : 'Keep Learning & Strengthening Concepts 💪'}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Completed on {attempt.date}
          </p>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mt-6">
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Score</span>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {attempt.correctAnswers} / {attempt.totalQuestions}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Accuracy</span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {attempt.scorePercentage}%
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Time Taken</span>
              <div className="text-2xl font-black text-slate-700 dark:text-slate-200 mt-1 font-mono">
                {minutes}m {seconds}s
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">XP Earned</span>
              <div className="text-2xl font-black text-amber-500 mt-1 flex items-center justify-center gap-1">
                <Sparkles className="w-5 h-5" />
                +{attempt.xpEarned}
              </div>
            </div>
          </div>

          {/* Google Sheets Sync Integration Area */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleSheetsExport}
                disabled={isSyncing || isSynced}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all ${
                  isSynced
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                {isSyncing 
                  ? 'Syncing to Sheets...' 
                  : isSynced 
                  ? 'Saved to Google Sheets ✓' 
                  : 'Save Attempt to Google Sheets'}
              </button>

              {spreadsheetUrl && (
                <a
                  href={spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <span>Open Sheet</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}
            </div>

            {syncError && (
              <p className="text-xs text-rose-600 mt-2 font-medium">
                {syncError}
              </p>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={onRetake}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>

            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              All Subjects
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Review Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Review Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Answer Review &amp; Explanations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review every question with detailed bilingual explanation
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'all' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'text-slate-500'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'incorrect' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs' : 'text-slate-500'
              }`}
            >
              Mistakes ({questions.filter(q => userAnswers[q.id] !== q.correctAnswer).length})
            </button>
            <button
              onClick={() => setFilter('flagged')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'flagged' ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs' : 'text-slate-500'
              }`}
            >
              Flagged ({flaggedSet.size})
            </button>
          </div>
        </div>

        {/* Questions Breakdown List */}
        <div className="space-y-6">
          {filteredQuestions.map((q, idx) => {
            const selectedKey = userAnswers[q.id];
            const isCorrect = selectedKey === q.correctAnswer;
            const isFlagged = flaggedSet.has(q.id);

            return (
              <div 
                key={q.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCorrect 
                    ? 'border-emerald-200/80 bg-emerald-50/20 dark:border-emerald-900/60 dark:bg-emerald-950/10' 
                    : 'border-rose-200/80 bg-rose-50/20 dark:border-rose-900/60 dark:bg-rose-950/10'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      #{idx + 1}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                    {q.topic && (
                      <span className="text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {q.topic}
                      </span>
                    )}
                  </div>

                  {isFlagged && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                      <Flag className="w-3 h-3 fill-amber-500" />
                      Flagged
                    </span>
                  )}
                </div>

                {/* Question */}
                <div className="space-y-1 mb-4">
                  {q.questionEn && (
                    <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {q.questionEn}
                    </p>
                  )}
                  {q.questionTe && (
                    <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                      {q.questionTe}
                    </p>
                  )}
                </div>

                {/* Options Review */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {q.options.map(opt => {
                    const isKey = opt.key === q.correctAnswer;
                    const isUserChoice = opt.key === selectedKey;

                    let optBg = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                    if (isKey) {
                      optBg = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                    } else if (isUserChoice && !isCorrect) {
                      optBg = 'bg-rose-500 text-white border-rose-600 font-bold';
                    }

                    return (
                      <div 
                        key={opt.key}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${optBg}`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono font-bold">({opt.key})</span>
                          <span className="truncate">{opt.textEn || opt.textTe}</span>
                        </div>
                        {isKey && <Check className="w-4 h-4 shrink-0 text-white" />}
                        {isUserChoice && !isCorrect && <XCircle className="w-4 h-4 shrink-0 text-white" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
