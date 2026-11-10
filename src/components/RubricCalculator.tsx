import React, { useState } from 'react';
import {
  RubricScores,
  calculateWeightedScore,
  calculateAuraDelta,
  getAuraStatus,
  RUBRIC_WEIGHTS,
} from '../utils/evaluation';
import { Calculator, Award, Sparkles, Check, ArrowRight } from 'lucide-react';
import { TeamScore } from './AuraTracker';

interface RubricCalculatorProps {
  teams: TeamScore[];
  onApplyScoreToTeam: (teamId: number, auraDelta: number) => void;
}

const CRITERIA_DATA = [
  {
    key: 'mecanismo' as keyof RubricScores,
    title: '1. Razonamiento desde el mecanismo',
    weight: '30%',
    weightVal: RUBRIC_WEIGHTS.mecanismo,
    levels: {
      4: 'Deriva los efectos adversos y el plan terapéutico con precisión molecular impecable.',
      3: 'Explica el sitio y efecto con propiedad técnica; leves omisiones menores en cinética/dinámica.',
      2: 'Razonamiento superficial; confunde sitios tubulares o receptores diana.',
      1: 'Desconoce el mecanismo; propone acciones incongruentes con la fisiopatología.',
    },
  },
  {
    key: 'seguridad' as keyof RubricScores,
    title: '2. Seguridad: Red flags e interacciones',
    weight: '25%',
    weightVal: RUBRIC_WEIGHTS.seguridad,
    levels: {
      4: 'Detecta todas las red flags clínicas e interacciones críticas (evita combinaciones letales).',
      3: 'Identifica la red flag principal y propone sustitución segura.',
      2: 'Omite advertencias clave (p. ej., ventana de lavado o monitoreo de K⁺).',
      1: 'Ignora una red flag letal; incurre en yatrogenia grave sin advertirlo.',
    },
  },
  {
    key: 'evidencia' as keyof RubricScores,
    title: '3. Evidencia citada (Ensayos & Guías)',
    weight: '20%',
    weightVal: RUBRIC_WEIGHTS.evidencia,
    levels: {
      4: 'Cita con soltura al menos 2 referencias normativas con autores o ensayos (ONTARGET, ALTITUDE, PATHWAY-2, ALLHAT).',
      3: 'Menciona la guía AHA/ACC 2025 o ESC 2024 de forma pertinente.',
      2: 'Citas vagas o sin vinculación directa con la resolución clínica.',
      1: 'No cita evidencia o respalda con fuentes no científicas.',
    },
  },
  {
    key: 'equipo' as keyof RubricScores,
    title: '4. Trabajo en equipo & Colaboración',
    weight: '10%',
    weightVal: RUBRIC_WEIGHTS.equipo,
    levels: {
      4: 'Todos los integrantes del escuadrón dominan el caso y articulan respuestas de forma sinérgica.',
      3: 'Buena participación de la mayoría de los integrantes.',
      2: 'Dependencia evidente de un solo miembro ("main character" solitario).',
      1: 'Falta evidente de coordinación interna; contradicciones entre miembros.',
    },
  },
  {
    key: 'exposicion' as keyof RubricScores,
    title: '5. Exposición (5 min) e Infografía',
    weight: '15%',
    weightVal: RUBRIC_WEIGHTS.exposicion,
    levels: {
      4: 'Síntesis visual de alto impacto (infografía clara), manejo riguroso del tiempo y claridad expositiva.',
      3: 'Infografía completa y exposición comprensible en tiempo asignado.',
      2: 'Infografía saturada o exposición fuera del límite de 5 minutos.',
      1: 'Sin material visual o exposición desestructurada.',
    },
  },
];

const LEVEL_LABELS = {
  4: { label: '4 · Sigma', desc: 'Sobresaliente', badge: 'bg-purple-100 text-purple-900 border-purple-300' },
  3: { label: '3 · Buen aura', desc: 'Satisfactorio', badge: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  2: { label: '2 · En riesgo', desc: 'Suficiente', badge: 'bg-amber-100 text-amber-900 border-amber-300' },
  1: { label: '1 · Cocinado', desc: 'Insuficiente', badge: 'bg-red-100 text-red-900 border-red-300' },
};

export const RubricCalculator: React.FC<RubricCalculatorProps> = ({
  teams,
  onApplyScoreToTeam,
}) => {
  const [selectedTeamId, setSelectedTeamId] = useState<number>(1);
  const [scores, setScores] = useState<RubricScores>({
    mecanismo: 4,
    seguridad: 4,
    evidencia: 4,
    equipo: 4,
    exposicion: 4,
  });
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const weightedScore = calculateWeightedScore(scores);
  const auraDelta = calculateAuraDelta(weightedScore);

  const handleSelectLevel = (key: keyof RubricScores, level: number) => {
    setScores((prev) => ({ ...prev, [key]: level }));
    setAppliedNotice(null);
  };

  const handleApply = () => {
    onApplyScoreToTeam(selectedTeamId, auraDelta);
    const team = teams.find((t) => t.id === selectedTeamId);
    setAppliedNotice(
      `¡Se aplicaron ${auraDelta >= 0 ? `+${auraDelta}` : auraDelta} puntos de Aura al ${team?.name}!`
    );
    setTimeout(() => setAppliedNotice(null), 4000);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 sm:p-7">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 uppercase">
              Evaluación Normativa & Gamificada
            </span>
            <span className="text-xs text-neutral-400 font-mono">Escala 1–4 ponderada</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mt-1 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-purple-700" />
            <span>Rúbrica de Desempeño y Calculadora de Aura</span>
          </h3>
          <p className="text-xs text-neutral-600 mt-1">
            Evalúa la exposición de 5 minutos y la infografía de cada escuadrón. El puntaje ponderado genera aura proporcional.
          </p>
        </div>

        {/* Team Selector */}
        <div className="flex items-center gap-2 bg-neutral-50 p-2 rounded-xl border border-neutral-200">
          <label htmlFor="team-select" className="text-xs font-bold text-neutral-700 whitespace-nowrap">
            Evaluar a:
          </label>
          <select
            id="team-select"
            value={selectedTeamId}
            onChange={(e) => {
              setSelectedTeamId(Number(e.target.value));
              setAppliedNotice(null);
            }}
            className="text-xs font-bold py-1.5 px-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.family})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Criteria Rows */}
      <div className="space-y-4 my-6">
        {CRITERIA_DATA.map((crit) => {
          const currentVal = scores[crit.key];
          return (
            <div
              key={crit.key}
              className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-neutral-900 text-sm">{crit.title}</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                    Ponderación: {crit.weight}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-neutral-600">
                  Nivel actual: {currentVal} ({LEVEL_LABELS[currentVal as 1 | 2 | 3 | 4].label})
                </span>
              </div>

              {/* 4 Levels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {([4, 3, 2, 1] as const).map((lvl) => {
                  const isSelected = currentVal === lvl;
                  const lvlMeta = LEVEL_LABELS[lvl];

                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handleSelectLevel(crit.key, lvl)}
                      className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
                        isSelected
                          ? `${lvlMeta.badge} ring-2 ring-purple-600 shadow-xs font-semibold`
                          : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="font-bold text-xs">{lvlMeta.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-purple-700 shrink-0" />}
                      </div>
                      <p className="text-[11px] leading-relaxed line-clamp-3">
                        {crit.levels[lvl]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Results and Aura Conversion Card */}
      <div className="rounded-2xl bg-gradient-to-br from-neutral-900 via-purple-950 to-neutral-900 text-white p-5 sm:p-6 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase font-bold text-purple-300 tracking-wider">
              Calificación Ponderada Final
            </span>
            <div className="flex items-baseline gap-3 justify-center md:justify-start">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                {weightedScore.toFixed(2)}
              </span>
              <span className="text-sm text-purple-300 font-medium">/ 4.00 pts</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-yellow-400 text-yellow-950">
                {weightedScore >= 3.6
                  ? 'Nivel Sigma 🗿'
                  : weightedScore >= 2.8
                  ? 'Buen Aura ✨'
                  : weightedScore >= 2.0
                  ? 'En Riesgo ⚠️'
                  : 'Cocinado 🍳'}
              </span>
            </div>
            <p className="text-xs text-neutral-300 max-w-md">
              Conversión de gamificación: {auraDelta >= 0 ? `+${auraDelta}` : auraDelta} puntos de Aura otorgados a la bolsa del escuadrón.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={handleApply}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-yellow-300" />
              <span>Aplicar {auraDelta >= 0 ? `+${auraDelta}` : auraDelta} Aura al Eq {selectedTeamId}</span>
            </button>
          </div>
        </div>

        {appliedNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-semibold text-center animate-in fade-in">
            {appliedNotice}
          </div>
        )}
      </div>
    </div>
  );
};
