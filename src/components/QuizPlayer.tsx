import React, { useState, useEffect } from 'react';
import { Question, SubjectInfo, QuizMode, QuizAttempt } from '../types/quiz';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Send,
  Lightbulb,
  Binary,
  HelpCircle,
  Hash
} from 'lucide-react';

interface QuizPlayerProps {
  subject: SubjectInfo;
  mode: QuizMode;
  questions: Question[];
  startPdfNo: number;
  endPdfNo: number;
  userId: string;
  onCompleteQuiz: (attempt: QuizAttempt, answersMap: Record<number, number>, flaggedSet: Set<number>) => void;
  onExitQuiz: () => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  subject,
  mode,
  questions,
  startPdfNo,
  endPdfNo,
  userId,
  onCompleteQuiz,
  onExitQuiz
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [languageMode, setLanguageMode] = useState<'both' | 'telugu' | 'english'>('both');
  const [instantFeedback, setInstantFeedback] = useState<boolean>(true); // default true for immediate learning
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(
    mode === 'timed_exam' ? questions.length * 60 : 0
  );
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
      if (mode === 'timed_exam') {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, questions.length]);

  const currentQ = questions[currentIndex];
  const totalQ = questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  if (!currentQ) return null;

  const handleSelectOption = (optionKey: number) => {
    if (userAnswers[currentQ.id] !== undefined && instantFeedback) {
      return;
    }
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optionKey }));
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) next.delete(currentQ.id);
      else next.add(currentQ.id);
      return next;
    });
  };

  const finishQuiz = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / totalQ) * 100);
    const xp = correctCount * 15 + (scorePct >= 80 ? 50 : 20);

    const attempt: QuizAttempt = {
      id: `att-${Date.now()}`,
      userId,
      subjectId: subject.id,
      subjectName: subject.name,
      mode,
      date: new Date().toLocaleString(),
      startPdfNo,
      endPdfNo,
      totalQuestions: totalQ,
      correctAnswers: correctCount,
      scorePercentage: scorePct,
      timeSpentSeconds: elapsedSeconds,
      xpEarned: xp,
      syncedToSheets: false
    };

    onCompleteQuiz(attempt, userAnswers, flaggedQuestions);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const hasAnsweredCurrent = userAnswers[currentQ.id] !== undefined;
  const selectedAnswer = userAnswers[currentQ.id];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;
  const isMathOrPhysics = subject.id === 'mathematics' || subject.id === 'physical_science';

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Quiz Top Navigation Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onExitQuiz}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Exit Quiz"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {subject.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  PDF Sequence #{startPdfNo} to #{endPdfNo}
                </span>
              </div>
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mt-0.5">
                <span>Question {currentIndex + 1} of {totalQ}</span>
                <span className="text-xs text-slate-400 font-mono">(PDF Question #{currentQ.pdfQuestionNo})</span>
              </h2>
            </div>
          </div>

          {/* Timers & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {mode === 'timed_exam' ? (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold ${
                timeRemaining < 120 
                  ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-300' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(elapsedSeconds)}</span>
              </div>
            )}

            {/* Language Switcher */}
            <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLanguageMode('both')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  languageMode === 'both' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'text-slate-500'
                }`}
              >
                Dual
              </button>
              <button
                onClick={() => setLanguageMode('telugu')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  languageMode === 'telugu' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'text-slate-500'
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLanguageMode('english')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  languageMode === 'english' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'text-slate-500'
                }`}
              >
                English
              </button>
            </div>

            {/* Instant Feedback Toggle */}
            <button
              onClick={() => setInstantFeedback(!instantFeedback)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                instantFeedback
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-800 dark:text-amber-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
              title="Toggle instant answer explanations"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Instant Learn</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQ) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-5 transition-all">
        
        {/* Header Meta */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-black text-xs border border-indigo-200 dark:border-indigo-800">
              #{currentQ.pdfQuestionNo}
            </span>
            {currentQ.topic && (
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                {currentQ.topic}
              </span>
            )}
          </div>

          <button
            onClick={handleToggleFlag}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              flaggedQuestions.has(currentQ.id)
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border-amber-300'
                : 'text-slate-500 hover:text-slate-700 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${flaggedQuestions.has(currentQ.id) ? 'fill-amber-500 text-amber-600' : ''}`} />
            <span>{flaggedQuestions.has(currentQ.id) ? 'Flagged' : 'Flag'}</span>
          </button>
        </div>

        {/* Question Text */}
        <div className="space-y-3 mb-8">
          {(languageMode === 'both' || languageMode === 'english') && currentQ.questionEn && (
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.questionEn}
            </p>
          )}
          {(languageMode === 'both' || languageMode === 'telugu') && currentQ.questionTe && (
            <p className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
              {currentQ.questionTe}
            </p>
          )}
        </div>

        {/* 4 Interactive Option Cards */}
        <div className="space-y-3">
          {currentQ.options.map(opt => {
            const isSelected = selectedAnswer === opt.key;
            const isAnswerKey = currentQ.correctAnswer === opt.key;

            let optionStyle = 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-indigo-50/40 dark:hover:bg-slate-800/60';
            let badgeStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';

            if (isSelected) {
              optionStyle = 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-xs ring-1 ring-indigo-500';
              badgeStyle = 'bg-indigo-600 text-white';
            }

            if (instantFeedback && hasAnsweredCurrent) {
              if (isAnswerKey) {
                optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-500';
                badgeStyle = 'bg-emerald-600 text-white';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 ring-1 ring-rose-500';
                badgeStyle = 'bg-rose-600 text-white';
              }
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleSelectOption(opt.key)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 group ${optionStyle}`}
              >
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${badgeStyle}`}>
                  ({opt.key})
                </span>

                <div className="flex-1 space-y-1">
                  {(languageMode === 'both' || languageMode === 'english') && opt.textEn && (
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {opt.textEn}
                    </div>
                  )}
                  {(languageMode === 'both' || languageMode === 'telugu') && opt.textTe && (
                    <div className="text-sm text-slate-700 dark:text-slate-300 font-sans">
                      {opt.textTe}
                    </div>
                  )}
                </div>

                {instantFeedback && hasAnsweredCurrent && (
                  <div className="shrink-0 pt-0.5">
                    {isAnswerKey ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* INSTANT EXPLANATION SECTION (When Answered in Instant Mode) */}
        {instantFeedback && hasAnsweredCurrent && (
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-4">
            
            {/* Status Header */}
            <div className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-xs sm:text-sm ${
              isCorrect 
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300' 
                : 'bg-rose-50 text-rose-900 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300'
            }`}>
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Correct Answer! (+15 XP)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>Incorrect. The correct answer is Option ({currentQ.correctAnswer})</span>
                </>
              )}
            </div>

            {/* REQUIREMENT: If Math or Physics and submitted answer -> Show Step-by-Step Derivation */}
            {isMathOrPhysics && currentQ.stepExplanation && (
              <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Binary className="w-4 h-4" />
                  <span>Step-by-Step Mathematical Derivation</span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 font-mono text-xs">
                    <span className="font-bold text-indigo-600 block">Formula / Principle:</span>
                    {currentQ.stepExplanation.formulaOrConcept}
                  </div>

                  <div className="text-slate-600 dark:text-slate-400 text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Given Data: </span>
                    {currentQ.stepExplanation.givenData}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="font-bold text-xs text-slate-700 dark:text-slate-300 block">Calculation Steps:</span>
                    {currentQ.stepExplanation.stepByStepCalc.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs font-mono bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                        <span className="font-bold text-indigo-500 shrink-0">Step {sIdx + 1}:</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <span className="font-bold">Conclusion: </span>
                    {currentQ.stepExplanation.conclusion}
                  </div>
                </div>
              </div>
            )}

            {/* REQUIREMENT: For other subjects (CDP, Telugu, English, Biology) -> Brief Explanation + Easy Memory Trick */}
            {!isMathOrPhysics && (
              <div className="space-y-3">
                {currentQ.briefExplanation && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-bold text-slate-900 dark:text-white">Explanation: </span>
                    {currentQ.briefExplanation}
                  </div>
                )}

                {currentQ.memoryTrick && (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300/80 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm leading-relaxed shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-800 dark:text-amber-300">
                      <Lightbulb className="w-4 h-4 fill-amber-500 text-amber-600 shrink-0" />
                      <span>Easy Memory Trick (గుర్తుంచుకునే సులభ చిట్కా):</span>
                    </div>
                    <p className="font-medium">
                      {currentQ.memoryTrick}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Controls & Palette */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
        
        {/* Next / Previous / Submit Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="text-xs font-semibold text-slate-500">
            {answeredCount} of {totalQ} Answered
          </div>

          {currentIndex === totalQ - 1 ? (
            <button
              onClick={() => setShowSubmitModal(true)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(prev => Math.min(totalQ - 1, prev + 1))}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Question Palette Circles */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>PDF Sequence Palette</span>
            <div className="flex items-center gap-3 text-[10px] normal-case">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"/> Answered</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"/> Flagged</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 inline-block"/> Unanswered</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isFlagged = flaggedQuestions.has(q.id);
              const isCurrent = idx === currentIndex;

              let btnStyle = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';

              if (isAnswered) {
                btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
              }
              if (isFlagged) {
                btnStyle = 'bg-amber-500 text-white border-amber-600 font-bold';
              }
              if (isCurrent) {
                btnStyle += ' ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 ${btnStyle}`}
                  title={`PDF Question #${q.pdfQuestionNo}`}
                >
                  <span className="text-[10px] opacity-70">#{q.pdfQuestionNo}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Submit Quiz?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              You have answered <span className="font-bold text-indigo-600">{answeredCount}</span> of <span className="font-bold">{totalQ}</span> questions from PDF sequence #{startPdfNo}–#{endPdfNo}.
              {totalQ - answeredCount > 0 && (
                <span className="block mt-1 text-amber-600 dark:text-amber-400 font-semibold">
                  ⚠️ Note: {totalQ - answeredCount} unanswered questions will be marked 0.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors"
              >
                Continue Test
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  finishQuiz();
                }}
                className="px-5 py-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
