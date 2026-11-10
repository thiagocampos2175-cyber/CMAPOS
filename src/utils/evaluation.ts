export interface RubricScores {
  mecanismo: number; // 1 to 4
  seguridad: number; // 1 to 4
  evidencia: number; // 1 to 4
  equipo: number;    // 1 to 4
  exposicion: number;// 1 to 4
}

export const RUBRIC_WEIGHTS = {
  mecanismo: 0.30,
  seguridad: 0.25,
  evidencia: 0.20,
  equipo: 0.10,
  exposicion: 0.15,
} as const;

export const TEACHER_PIN = '1234';

/**
 * Calculates weighted score from 1.0 to 4.0
 */
export function calculateWeightedScore(scores: RubricScores): number {
  const total =
    scores.mecanismo * RUBRIC_WEIGHTS.mecanismo +
    scores.seguridad * RUBRIC_WEIGHTS.seguridad +
    scores.evidencia * RUBRIC_WEIGHTS.evidencia +
    scores.equipo * RUBRIC_WEIGHTS.equipo +
    scores.exposicion * RUBRIC_WEIGHTS.exposicion;
  return Number(total.toFixed(2));
}

/**
 * Converts weighted score (1.0 to 4.0) to Aura delta points
 * 3.6 - 4.0: +40 (Sigma total)
 * 2.8 - 3.59: +20 (Buen aura)
 * 2.0 - 2.79: -10 (En riesgo)
 * < 2.0: -30 (Cocinado)
 */
export function calculateAuraDelta(weightedScore: number): number {
  if (weightedScore >= 3.6) return 40;
  if (weightedScore >= 2.8) return 20;
  if (weightedScore >= 2.0) return -10;
  return -30;
}

export function getAuraStatus(aura: number): { title: string; badge: string; color: string } {
  if (aura >= 60) {
    return { title: 'Aura Sigma Absoluta', badge: '🗿 SIGMA', color: 'text-purple-700 bg-purple-100 border-purple-300' };
  }
  if (aura >= 20) {
    return { title: 'Buen Aura Farmacológica', badge: '✨ MAIN CHARACTER', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
  }
  if (aura >= 0) {
    return { title: 'NPC en Observación', badge: '😐 NPC NEUTRAL', color: 'text-amber-700 bg-amber-100 border-amber-300' };
  }
  return { title: 'Cocinado en Guardia', badge: '🍳 COCINADO 🚩', color: 'text-red-700 bg-red-100 border-red-300' };
}

export function verifyTeacherPin(inputPin: string): boolean {
  return inputPin.trim() === TEACHER_PIN;
}

export function evaluateQuizResult(correctCount: number, totalQuestions = 10): {
  percentage: number;
  verdict: string;
  badge: string;
  description: string;
} {
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  if (percentage >= 90) {
    return {
      percentage,
      verdict: 'Aura Sigma Desbloqueada 🗿⚡',
      badge: 'Farmacólogo Gigachad',
      description: 'Manejas los sitios moleculares, red flags y ensayos clínicos a nivel residente senior. Inmune a las red flags.',
    };
  }
  if (percentage >= 70) {
    return {
      percentage,
      verdict: 'Buen Rizz Farmacológico ✨💊',
      badge: 'Main Character Clínico',
      description: 'Gran criterio clínico. Salvaste al paciente y fundamentaste la mayoría de tus decisiones.',
    };
  }
  if (percentage >= 50) {
    return {
      percentage,
      verdict: 'Modo NPC en Riesgo ⚠️',
      badge: 'Interno con Sueño',
      description: 'Cuidado: se te escaparon un par de red flags críticas (angioedema o estenosis bilateral). Revisa los mecanismos.',
    };
  }
  return {
    percentage,
    verdict: 'Completamente Cocinado 🍳💀🚩',
    badge: 'Expulsado del Comité',
    description: 'Recetaste IECA + ARA-II, diste betabloqueador solo en feocromocitoma o metiste sacubitril sin esperar las 36 horas. ¡A estudiar el Goodman & Gilman!',
  };
}
