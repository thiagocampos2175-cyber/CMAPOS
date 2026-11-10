import React, { useState } from 'react';
import { ClinicalCase } from '../data/cases';
import { CalloutBox } from './CalloutBox';
import { Lock, Unlock, CheckCircle, ChevronDown, ChevronUp, FileText, Sparkles, Award } from 'lucide-react';

interface CaseCardProps {
  caseData: ClinicalCase;
  teamAura: number;
  onUpdateTeamAura: (delta: number) => void;
  isTeacherModeUnlocked: boolean;
  onRequestTeacherUnlock: () => void;
  studentNotes: string;
  onUpdateStudentNotes: (notes: string) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  caseData,
  teamAura,
  onUpdateTeamAura,
  isTeacherModeUnlocked,
  onRequestTeacherUnlock,
  studentNotes,
  onUpdateStudentNotes,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const canViewAnswer = isTeacherModeUnlocked;

  return (
    <article
      id={`caso-equipo-${caseData.teamId}`}
      className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden transition-all hover:shadow-md print:shadow-none print:border print:border-neutral-300 print:rounded-none print:break-after-page print:mb-8"
      style={{ pageBreakAfter: 'always' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-neutral-900 via-purple-950 to-neutral-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 print:bg-none print:text-neutral-900 print:border-b print:border-neutral-400">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-600/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider print:text-neutral-900 print:bg-neutral-200">
              {caseData.familyTitle}
            </span>
            <span className="text-yellow-400 text-xs font-semibold print:text-neutral-700">
              &ldquo;{caseData.codename}&rdquo;
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1 print:text-neutral-900">
            Misión Escuadrón {caseData.teamId}: {caseData.codename}
          </h3>
        </div>

        {/* Aura Scoring Pill */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20 print:hidden">
          <span className="text-xs text-purple-200 font-medium">Aura del Equipo:</span>
          <span
            className={`font-mono font-bold text-sm px-2 py-0.5 rounded ${
              teamAura > 0
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                : teamAura < 0
                ? 'bg-red-500/20 text-red-300 border border-red-400/30'
                : 'bg-neutral-500/20 text-neutral-300'
            }`}
          >
            {teamAura > 0 ? `+${teamAura}` : teamAura} pts
          </span>
          <div className="flex items-center gap-1 ml-1 border-l border-white/20 pl-2">
            <button
              type="button"
              onClick={() => onUpdateTeamAura(-10)}
              title="-10 Aura por error o red flag ignorada"
              aria-label={`Quitar 10 de aura al Equipo ${caseData.teamId}`}
              className="w-6 h-6 flex items-center justify-center rounded bg-red-500/30 hover:bg-red-500/50 text-red-200 font-bold text-xs transition-colors"
            >
              −10
            </button>
            <button
              type="button"
              onClick={() => onUpdateTeamAura(10)}
              title="+10 Aura por acierto farmacológico"
              aria-label={`Sumar 10 de aura al Equipo ${caseData.teamId}`}
              className="w-6 h-6 flex items-center justify-center rounded bg-emerald-500/30 hover:bg-emerald-500/50 text-emerald-200 font-bold text-xs transition-colors"
            >
              +10
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Patient Synopsis Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
          <div>
            <span className="text-neutral-500 font-medium block">Edad / Perfil:</span>
            <span className="font-bold text-neutral-800">{caseData.patientData.age}</span>
          </div>
          <div>
            <span className="text-neutral-500 font-medium block">Paraclínico Clave:</span>
            <span className="font-mono font-bold text-neutral-900 bg-neutral-200/60 px-1.5 py-0.5 rounded">
              {caseData.patientData.keyLab}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 font-medium block">Hallazgo Farmacológico:</span>
            <span className="font-semibold text-neutral-800 line-clamp-1" title={caseData.patientData.clinicalFinding}>
              {caseData.patientData.clinicalFinding}
            </span>
          </div>
        </div>

        {/* Clinical Vignette */}
        <div>
          <h4 className="text-xs uppercase font-bold text-neutral-500 tracking-wider mb-1.5">
            Viñeta Clínica Real
          </h4>
          <p className="text-sm leading-relaxed text-neutral-800 bg-white p-4 rounded-xl border border-neutral-200 shadow-xs font-normal">
            {caseData.vignette}
          </p>
        </div>

        {/* Guiding Questions */}
        <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-100">
          <h4 className="text-xs uppercase font-bold text-purple-900 tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-700"></span>
            <span>Preguntas Guía para el Escuadrón</span>
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-800 font-medium leading-relaxed">
            {caseData.guideQuestions.map((q, idx) => (
              <li key={idx} className="pl-1">
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Reusable Callout Boxes: 🟣 Explicación, 🟢 Mnemotecnia, 🔴 Red flag */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <CalloutBox type="explicacion">
            {caseData.callouts.explicacion}
          </CalloutBox>
          <CalloutBox type="mnemotecnia">
            {caseData.callouts.mnemotecnia}
          </CalloutBox>
          <CalloutBox type="redFlag">
            {caseData.callouts.redFlag}
          </CalloutBox>
        </div>

        {/* Student Workspace (Interactive Scratchpad) */}
        <div className="border border-neutral-200 rounded-xl p-4 bg-neutral-50/60 print:hidden">
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => setShowNotes(!showNotes)}
              className="text-xs font-bold text-neutral-700 flex items-center gap-1.5 hover:text-purple-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Espacio de Trabajo del Equipo (Borrador de Justificación y Plan)</span>
              {showNotes ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <span className="text-[11px] text-neutral-400">
              {studentNotes.trim().length > 0 ? `${studentNotes.trim().length} caracteres` : 'Borrador editable'}
            </span>
          </div>

          {showNotes && (
            <div className="space-y-2 mt-2">
              <textarea
                value={studentNotes}
                onChange={(e) => onUpdateStudentNotes(e.target.value)}
                placeholder="Escribe aquí los argumentos del equipo: 1) Fármaco a suspender, 2) Justificación mecanística, 3) Fármaco a iniciar, 4) Vigilancia y citas..."
                rows={3}
                className="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-neutral-800 placeholder:text-neutral-400"
              />
              <p className="text-[11px] text-neutral-500 italic">
                💡 Este borrador te sirve para sintetizar tu infografía y la exposición de 5 minutos ante el comité.
              </p>
            </div>
          )}
        </div>

        {/* Teacher Mode Solution Area */}
        <div className="pt-2">
          {canViewAnswer ? (
            <div className="rounded-xl border-2 border-dashed border-purple-300 bg-purple-50/40 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                  <Unlock className="w-4 h-4 text-purple-700" />
                  <span>Respuesta Esperada y Criterio Clínico (Modo Docente Activo)</span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
                  PIN Validado ✓
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-neutral-800">
                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <strong className="text-purple-900 block font-bold mb-1">
                    Diagnóstico Clínico-Farmacológico:
                  </strong>
                  <span>{caseData.expectedAnswer.diagnosis}</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <strong className="text-purple-900 block font-bold mb-1">
                    Mecanismo Fisiopatológico y Molecular:
                  </strong>
                  <p className="whitespace-pre-line">{caseData.expectedAnswer.pharmacologicalMechanism}</p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <strong className="text-purple-900 block font-bold mb-1">
                    Plan de Acción Terapéutico Riguroso:
                  </strong>
                  <p className="whitespace-pre-line font-medium text-neutral-900">
                    {caseData.expectedAnswer.actionPlan}
                  </p>
                </div>

                <div className="bg-purple-100/70 p-3 rounded-lg border border-purple-200 text-purple-950 font-medium">
                  <strong>Evidencia & Cita de Apoyo: </strong>
                  <span>{caseData.expectedAnswer.evidenceNotes}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/80 print:hidden">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-neutral-500" />
                <span className="text-xs text-neutral-600 font-medium">
                  Respuestas clínicas modelo reservadas para el facilitador.
                </span>
              </div>
              <button
                type="button"
                onClick={onRequestTeacherUnlock}
                className="text-xs font-semibold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1"
              >
                <span>Desbloquear con PIN</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
