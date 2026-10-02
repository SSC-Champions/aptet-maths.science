import React from 'react';
import { SubjectInfo, SubjectProgress, QuizMode, SubjectId } from '../types/quiz';
import { 
  Brain, 
  BookOpen, 
  Languages, 
  Calculator, 
  Atom, 
  Dna, 
  Play, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Layers,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface SubjectCardProps {
  subject: SubjectInfo;
  progress: SubjectProgress | undefined;
  answeredCount: number;
  totalAvailable: number;
  onStartSequentialQuiz: (subjectId: SubjectId, count: number) => void;
  onResetProgression: (subjectId: SubjectId) => void;
  onOpenFlashcards: (subjectId: SubjectId) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
  BookOpen: <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
  Languages: <Languages className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  Calculator: <Calculator className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
  Atom: <Atom className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
  Dna: <Dna className="w-6 h-6 text-green-600 dark:text-green-400" />,
};

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  progress,
  answeredCount,
  totalAvailable,
  onStartSequentialQuiz,
  onResetProgression,
  onOpenFlashcards
}) => {
  const quizzesTaken = progress?.quizzesTaken || 0;
  const bestScore = progress?.bestScorePercentage || 0;
  const mastery = progress?.masteryLevel || 'Novice';
  const isCompletedAll = answeredCount >= totalAvailable && totalAvailable > 0;
  const nextQStart = isCompletedAll ? 1 : answeredCount + 1;
  const nextQEnd = isCompletedAll ? Math.min(10, totalAvailable) : Math.min(answeredCount + 10, totalAvailable);

  const getMasteryColor = (level: string) => {
    switch (level) {
      case 'Master': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300 border-purple-200';
      case 'Proficient': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200';
    }
  };

  const progressPct = totalAvailable > 0 
    ? Math.round((answeredCount / totalAvailable) * 100) 
    : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      
      {/* Top Banner & Subject Info */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            {ICON_MAP[subject.icon] || <BookOpen className="w-6 h-6 text-indigo-500" />}
          </div>
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getMasteryColor(mastery)}`}>
            {mastery}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {subject.name}
        </h3>
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          {subject.teluguName}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {subject.description}
        </p>

        {/* Sequential Progression Progress */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-slate-600 dark:text-slate-300 font-semibold">
              PDF Sequence Progress
            </span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {answeredCount} / {totalAvailable} ({progressPct}%)
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${subject.gradient} rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(100, Math.max(progressPct, 4))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
            <span>
              {isCompletedAll ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> All PDF bits completed!
                </span>
              ) : (
                <span>Next up: PDF #{nextQStart} - #{nextQEnd}</span>
              )}
            </span>
            <span>Best: {bestScore}%</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 sm:p-5 bg-slate-50/70 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onStartSequentialQuiz(subject.id, 10)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs hover:shadow-indigo-500/20 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            {isCompletedAll ? 'Practice Again (10Q)' : `Continue PDF #${nextQStart}–#${nextQEnd}`}
          </button>

          {answeredCount > 0 && (
            <button
              onClick={() => {
                if (window.confirm(`Reset question progression for ${subject.name}? You will start fresh from Question #1 in the PDF.`)) {
                  onResetProgression(subject.id);
                }
              }}
              title="Reset PDF Question sequence to #1"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => onStartSequentialQuiz(subject.id, 20)}
            className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            Long Batch (20Q)
          </button>

          <button
            onClick={() => onOpenFlashcards(subject.id)}
            className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <Layers className="w-3 h-3" />
            Flashcards
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
