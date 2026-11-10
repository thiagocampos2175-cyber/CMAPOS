import React, { useState } from 'react';
import { BOSS_QUIZ, QuizQuestion } from '../data/bossQuiz';
import { evaluateQuizResult } from '../utils/evaluation';
import { Skull, CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, Zap } from 'lucide-react';

export const BossFinalQuiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const totalQuestions = BOSS_QUIZ.length;
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    // Only set if not already answered
    if (userAnswers[questionId] !== undefined) return;

    const nextAnswers = { ...userAnswers, [questionId]: optionIdx };
    setUserAnswers(nextAnswers);

    if (Object.keys(nextAnswers).length === totalQuestions) {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsCompleted(false);
  };

  // Calculate score
  const correctCount = Object.entries(userAnswers).reduce((acc, [qid, ansIdx]) => {
    const q = BOSS_QUIZ.find((item) => item.id === Number(qid));
    return q && q.correctIndex === ansIdx ? acc + 1 : acc;
  }, 0);

  const resultMeta = evaluateQuizResult(correctCount, totalQuestions);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200 uppercase flex items-center gap-1">
              <Skull className="w-3.5 h-3.5" />
              <span>Desafío Interactivo Final</span>
            </span>
            <span className="text-xs text-neutral-400 font-mono">10 Reactivos Clínicos</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mt-1">
            Boss Final: ¿Aura Farmacológica Gigachad o Totalmente Cocinado?
          </h3>
          <p className="text-xs text-neutral-600 mt-1">
            Pon a prueba tu criterio frente a las 10 situaciones críticas extraídas de los 8 casos clínicos. Retroalimentación inmediata en cada reactivo.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-bold">Progreso</div>
            <div className="text-sm font-extrabold font-mono text-purple-900">
              {answeredCount} / {totalQuestions} respondidas
            </div>
          </div>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 text-neutral-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-neutral-200"
              title="Reiniciar cuestionario"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6 my-6">
        {BOSS_QUIZ.map((q, qIndex) => {
          const selectedIdx = userAnswers[q.id];
          const hasAnswered = selectedIdx !== undefined;
          const isCorrect = hasAnswered && selectedIdx === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                hasAnswered
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-red-300 bg-red-50/20'
                  : 'border-neutral-200 bg-neutral-50/40 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {q.id}
                  </span>
                  <span className="text-[11px] font-semibold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">
                    {q.sourceCase}
                  </span>
                </div>
                {hasAnswered && (
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>¡Aura +10! Correcto</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>¡Cocinado! Incorrecto</span>
                      </>
                    )}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-neutral-900 mb-3 leading-snug">
                {q.question}
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedIdx === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let optionStyle =
                    'border-neutral-200 bg-white text-neutral-800 hover:bg-purple-50 hover:border-purple-300';

                  if (hasAnswered) {
                    if (isThisCorrect) {
                      optionStyle =
                        'border-emerald-500 bg-emerald-100/70 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyle =
                        'border-red-400 bg-red-100/70 text-red-950 font-medium line-through';
                    } else {
                      optionStyle = 'border-neutral-200 bg-white/70 text-neutral-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${optionStyle}`}
                    >
                      <span className="font-bold text-[11px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback Explanation Box */}
              {hasAnswered && (
                <div
                  className={`mt-3.5 p-3.5 rounded-xl text-xs leading-relaxed border animate-in fade-in ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-red-50 border-red-200 text-red-950'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    <span>💡 Justificación Farmacomecánica:</span>
                  </div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {answeredCount === totalQuestions && (
        <div className="rounded-2xl bg-gradient-to-br from-neutral-900 via-purple-950 to-neutral-900 text-white p-6 shadow-xl text-center space-y-4 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-400 text-white flex items-center justify-center mx-auto shadow-md">
            <Award className="w-8 h-8 text-neutral-900" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">
              Veredicto del Comité de Farmacoterapia
            </span>
            <h3 className="text-2xl font-black mt-1">{resultMeta.verdict}</h3>
            <p className="text-sm text-purple-200 mt-1 max-w-md mx-auto">
              {resultMeta.description}
            </p>
          </div>

          <div className="inline-flex items-center gap-4 bg-white/10 px-5 py-2.5 rounded-xl border border-white/20">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-neutral-300">Aciertos</div>
              <div className="text-xl font-bold font-mono text-emerald-400">
                {correctCount} / {totalQuestions}
              </div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-neutral-300">Eficacia</div>
              <div className="text-xl font-bold font-mono text-yellow-300">
                {resultMeta.percentage}%
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Intentar de nuevo para ganar más Aura</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
