import React, { useState } from 'react';
import { Question, SubjectId } from '../types/quiz';
import { SUBJECTS, QUESTIONS } from '../data/questionsData';
import { 
  Layers, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  CheckCircle, 
  Sparkles,
  HelpCircle,
  BookOpen
} from 'lucide-react';

interface FlashcardsViewProps {
  initialSubjectId?: SubjectId;
  onStartQuiz: (subjectId: SubjectId) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  initialSubjectId = 'cdp',
  onStartQuiz
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(initialSubjectId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());

  const subjectQuestions = QUESTIONS.filter(q => q.subjectId === selectedSubject);
  const activeSubject = SUBJECTS.find(s => s.id === selectedSubject) || SUBJECTS[0];
  const currentCard = subjectQuestions[currentIndex] || subjectQuestions[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % subjectQuestions.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + subjectQuestions.length) % subjectQuestions.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const rand = Math.floor(Math.random() * subjectQuestions.length);
    setCurrentIndex(rand);
  };

  const toggleMastered = (id: number) => {
    setMasteredIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!currentCard) {
    return null;
  }

  const isMastered = masteredIds.has(currentCard.id);
  const correctOption = currentCard.options.find(o => o.key === currentCard.correctAnswer);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header & Subject Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Active Recall Drill</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Concept Flashcards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Click cards to flip and test your immediate recall before taking mock tests
          </p>
        </div>

        {/* Subject Dropdown */}
        <select
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value as SubjectId);
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 shadow-xs"
        >
          {SUBJECTS.map(s => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.teluguName})
            </option>
          ))}
        </select>
      </div>

      {/* Flashcard Component */}
      <div className="perspective-1000 max-w-2xl mx-auto">
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={`cursor-pointer min-h-[340px] sm:min-h-[380px] p-6 sm:p-10 rounded-3xl border shadow-lg transition-all duration-300 flex flex-col justify-between select-none relative ${
            isFlipped 
              ? 'bg-gradient-to-tr from-emerald-950 via-slate-900 to-indigo-950 text-white border-emerald-500/50' 
              : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 hover:border-indigo-300'
          }`}
        >
          {/* Card Top Meta */}
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                isFlipped 
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40' 
                  : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
              }`}>
                {isFlipped ? 'Answer & Explanation' : 'Question / Concept'}
              </span>
              {currentCard.topic && (
                <span className="text-slate-400 text-[11px]">
                  {currentCard.topic}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Click to flip</span>
            </div>
          </div>

          {/* Card Content */}
          <div className="my-auto py-6 text-center">
            {!isFlipped ? (
              <div className="space-y-4">
                {currentCard.questionEn && (
                  <p className="text-lg sm:text-xl font-bold leading-relaxed">
                    {currentCard.questionEn}
                  </p>
                )}
                {currentCard.questionTe && (
                  <p className="text-base sm:text-lg font-medium text-indigo-600 dark:text-indigo-300 leading-relaxed font-sans">
                    {currentCard.questionTe}
                  </p>
                )}
                <p className="text-xs text-slate-400 italic mt-3">
                  (Try guessing the answer in your mind, then flip to verify)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase mb-1">
                  Correct Answer (Option {currentCard.correctAnswer})
                </div>
                
                {correctOption && (
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">
                    {correctOption.textEn || correctOption.textTe}
                  </div>
                )}

                {correctOption?.textTe && correctOption.textEn && (
                  <div className="text-lg font-semibold text-emerald-200">
                    {correctOption.textTe}
                  </div>
                )}

                {currentCard.explanation && (
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto pt-2 border-t border-white/10">
                    <span className="font-bold text-emerald-300">Rationale: </span>
                    {currentCard.explanation}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Card Bottom Controls */}
          <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 font-mono">
              Card {currentIndex + 1} of {subjectQuestions.length}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMastered(currentCard.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                isMastered 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isMastered ? 'Mastered ✓' : 'Mark as Mastered'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handleShuffle}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-100 transition-colors"
        >
          <Shuffle className="w-4 h-4 text-purple-500" />
          Shuffle
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
        >
          Next Card
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Practice Quiz Link */}
      <div className="text-center pt-4">
        <button
          onClick={() => onStartQuiz(selectedSubject)}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Ready? Take Practice Quiz for {activeSubject.name} →
        </button>
      </div>
    </div>
  );
};
