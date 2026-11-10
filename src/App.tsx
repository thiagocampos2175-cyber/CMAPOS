import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AuraTracker, TeamScore } from './components/AuraTracker';
import { TeacherModeModal } from './components/TeacherModeModal';
import { DrugTable } from './components/DrugTable';
import { RaasDiagram } from './components/RaasDiagram';
import { CaseCard } from './components/CaseCard';
import { RubricCalculator } from './components/RubricCalculator';
import { BossFinalQuiz } from './components/BossFinalQuiz';
import { CalloutBox } from './components/CalloutBox';
import { CLINICAL_CASES } from './data/cases';
import { REFERENCES } from './data/references';
import {
  HeartPulse,
  Activity,
  Flame,
  Award,
  BookOpen,
  Target,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Users,
  Calendar,
  GraduationCap,
  FileSpreadsheet,
  AlertOctagon,
  ArrowDown,
  Info,
  Send,
} from 'lucide-react';

const INITIAL_TEAMS: TeamScore[] = [
  { id: 1, name: 'Escuadrón 1', family: 'Tiazidas', score: 0 },
  { id: 2, name: 'Escuadrón 2', family: 'De Asa', score: 0 },
  { id: 3, name: 'Escuadrón 3', family: 'Ahorradores K⁺', score: 0 },
  { id: 4, name: 'Escuadrón 4', family: 'IECA / ARA-II', score: 0 },
  { id: 5, name: 'Escuadrón 5', family: 'ARNI & Aliskireno', score: 0 },
  { id: 6, name: 'Escuadrón 6', family: 'Calcioantagonistas', score: 0 },
  { id: 7, name: 'Escuadrón 7', family: 'Betabloqueadores & α₁', score: 0 },
  { id: 8, name: 'Escuadrón 8', family: 'Centrales & Vasodilatadores', score: 0 },
];

export default function App() {
  // Team scores
  const [teams, setTeams] = useState<TeamScore[]>(INITIAL_TEAMS);

  // Editable header metadata
  const [courseMeta, setCourseMeta] = useState({
    materia: 'Farmacología Médica y Terapéutica',
    docente: 'Dr. Campos',
    grupo: 'Grupo 4-A · Medicina',
    fecha: new Date().toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  });

  // Student scratchpads per case
  const [studentNotes, setStudentNotes] = useState<Record<number, string>>({});

  // Teacher mode state (PIN: 1234)
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isTeacherUnlocked, setIsTeacherUnlocked] = useState(false);

  // Metacognition answers
  const [metacognitionAnswers, setMetacognitionAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
  });
  const [metacognitionSaved, setMetacognitionSaved] = useState(false);

  // Aura handlers
  const handleUpdateScore = (teamId: number, delta: number) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, score: t.score + delta } : t))
    );
  };

  const handleResetScores = () => {
    if (window.confirm('¿Reiniciar a cero los marcadores de Aura de los 8 equipos?')) {
      setTeams(INITIAL_TEAMS);
    }
  };

  const handleSelectTeamCase = (teamId: number) => {
    const el = document.getElementById(`caso-equipo-${teamId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-purple-200 selection:text-purple-900 antialiased">
      {/* 1. Fixed Navigation Bar */}
      <Navbar
        isTeacherUnlocked={isTeacherUnlocked}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
        onPrint={handlePrint}
      />

      {/* 2. Top Aura Tracker (8 Teams) */}
      <AuraTracker
        teams={teams}
        onUpdateScore={handleUpdateScore}
        onResetScores={handleResetScores}
        onSelectTeamCase={handleSelectTeamCase}
      />

      {/* Teacher Mode Modal */}
      <TeacherModeModal
        isOpen={isTeacherModalOpen}
        isUnlocked={isTeacherUnlocked}
        onClose={() => setIsTeacherModalOpen(false)}
        onUnlock={() => setIsTeacherUnlocked(true)}
        onLock={() => setIsTeacherUnlocked(false)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
        {/* =========================================================
            SECCIÓN 1: INICIO
        ========================================================= */}
        <section
          id="inicio"
          aria-labelledby="inicio-heading"
          className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden p-6 sm:p-10 relative"
        >
          {/* Subtle decorative background gradient */}
          <div
            className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: '#7B2CBF' }}
          ></div>

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-extrabold uppercase tracking-wider mb-4 border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Unidad II · Farmacología médica · 8 equipos</span>
            </div>

            <h1
              id="inicio-heading"
              className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-tight"
            >
              WebQuest Antihipertensivos: <br className="hidden sm:inline" />
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-indigo-700 to-emerald-700"
              >
                ¿Aura farmacológica o estás cocinado?
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl">
              Plataforma instruccional médica para el análisis clínico-mecanístico de antihipertensivos.
              Domina sitios moleculares, predice efectos adversos y evita red flags 🚩 para convertirte en el
              <em> Main Character</em> del comité intrahospitalario.
            </p>

            {/* Editable Fields: Materia, Docente, Grupo, Fecha */}
            <div className="mt-8 pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-neutral-50/70 p-4 rounded-2xl border">
              <div>
                <label htmlFor="meta-materia" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-purple-700" />
                  <span>Materia:</span>
                </label>
                <input
                  id="meta-materia"
                  type="text"
                  value={courseMeta.materia}
                  onChange={(e) => setCourseMeta({ ...courseMeta, materia: e.target.value })}
                  className="w-full text-xs font-bold text-neutral-900 bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div>
                <label htmlFor="meta-docente" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-purple-700" />
                  <span>Docente:</span>
                </label>
                <input
                  id="meta-docente"
                  type="text"
                  value={courseMeta.docente}
                  onChange={(e) => setCourseMeta({ ...courseMeta, docente: e.target.value })}
                  placeholder="Dr. Campos"
                  className="w-full text-xs font-bold text-neutral-900 bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div>
                <label htmlFor="meta-grupo" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
                  <Users className="w-3 h-3 text-purple-700" />
                  <span>Grupo:</span>
                </label>
                <input
                  id="meta-grupo"
                  type="text"
                  value={courseMeta.grupo}
                  onChange={(e) => setCourseMeta({ ...courseMeta, grupo: e.target.value })}
                  className="w-full text-xs font-bold text-neutral-900 bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div>
                <label htmlFor="meta-fecha" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-purple-700" />
                  <span>Fecha:</span>
                </label>
                <input
                  id="meta-fecha"
                  type="text"
                  value={courseMeta.fecha}
                  onChange={(e) => setCourseMeta({ ...courseMeta, fecha: e.target.value })}
                  className="w-full text-xs font-bold text-neutral-900 bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 2: INTRODUCCIÓN
        ========================================================= */}
        <section id="introduccion" aria-labelledby="intro-heading" className="space-y-6">
          <div className="border-l-4 pl-4" style={{ borderColor: '#7B2CBF' }}>
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
              Marco Conceptual & Hemodinámica
            </span>
            <h2 id="intro-heading" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-0.5">
              2. Introducción Fisiopatológica & Narrativa del Escuadrón
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Box 1: Hemodinámica */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-sm mb-3">
                  PAM
                </div>
                <h3 className="font-bold text-neutral-900 text-base mb-1">
                  Ecuación Hemodinámica Central
                </h3>
                <p className="text-xs leading-relaxed text-neutral-600 mb-3">
                  La presión arterial media depende de dos determinantes biomecánicos fundamentales: el gasto cardiaco y la resistencia vascular periférica.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-200 text-center">
                <span className="font-mono font-extrabold text-base text-purple-900">
                  PAM ≈ GC × RVP
                </span>
                <span className="block text-[10px] text-purple-700 mt-0.5">
                  (Gasto Cardiaco × Resistencia Vascular Periférica)
                </span>
              </div>
            </div>

            {/* Box 2: Presión-Natriuresis */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col justify-between">
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm mb-3"
                  style={{ backgroundColor: '#2E7D32' }}
                >
                  Na⁺
                </div>
                <h3 className="font-bold text-neutral-900 text-base mb-1">
                  El Riñón Fija la Presión a Largo Plazo
                </h3>
                <p className="text-xs leading-relaxed text-neutral-600 mb-3">
                  A largo plazo, el riñón fija el nivel de presión mediante la relación <strong>presión-natriuresis</strong>; por eso casi todo antihipertensivo eficaz termina modificando, directa o indirectamente, el manejo renal del sodio.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-center">
                <span className="text-xs font-bold text-emerald-900">
                  Manejo Renal del Sodio = Eje Clave Crónico
                </span>
              </div>
            </div>

            {/* Box 3: Guía AHA/ACC 2025 */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs flex flex-col justify-between">
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs mb-3"
                  style={{ backgroundColor: '#D99A00' }}
                >
                  2025
                </div>
                <h3 className="font-bold text-neutral-900 text-base mb-1">
                  Definición AHA/ACC 2025
                </h3>
                <p className="text-xs leading-relaxed text-neutral-600 mb-3">
                  La guía AHA/ACC 2025 define hipertensión arterial como <strong>PA ≥130/80 mmHg</strong> y establece una meta de control general estricta <strong>&lt;130/80 mmHg</strong>.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-center">
                <span className="font-mono font-bold text-amber-900 text-sm">
                  PA ≥130/80 mmHg (Meta: &lt;130/80)
                </span>
              </div>
            </div>
          </div>

          {/* Narrative Callout */}
          <div className="rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-neutral-900 text-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0">🏥</span>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300">
                  Narrativa de la Misión
                </h3>
                <p className="text-base font-semibold text-white mt-1 leading-relaxed">
                  &ldquo;Su escuadrón es el comité de farmacoterapia del hospital. Cada equipo domina una familia de fármacos y debe resolver un caso real. Ganar aura = razonar bien; quedar cocinado = ignorar una red flag.&rdquo;
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-purple-200">
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                    🗿 <strong>Aura Sigma:</strong> Mecanismo impecable + Evidencia
                  </span>
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                    🍳 <strong>Cocinado:</strong> Interacción fatal o Red flag 🚩 desatendida
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 3: OBJETIVOS
        ========================================================= */}
        <section id="objetivos" aria-labelledby="obj-heading" className="space-y-6">
          <div className="border-l-4 pl-4" style={{ borderColor: '#2E7D32' }}>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
              Competencias Médicas
            </span>
            <h2 id="obj-heading" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-0.5">
              3. Objetivos de Aprendizaje
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Objetivo General */}
            <div className="lg:col-span-5 bg-emerald-50/60 rounded-2xl p-6 border border-emerald-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4 text-emerald-700" />
                  <span>Objetivo General</span>
                </div>
                <h3 className="text-xl font-extrabold text-neutral-950 leading-snug">
                  Prescripción y Vigilancia Farmacomecánica
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-800">
                  Seleccionar, justificar y vigilar un antihipertensivo a partir de su mecanismo de acción molecular y del contexto individualizado del paciente.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-200 text-xs font-medium text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Base para la toma de decisiones clínicas con fundamento de guías 2025.</span>
              </div>
            </div>

            {/* Objetivos Específicos */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-1">
                <Activity className="w-4 h-4 text-purple-700" />
                <span>Objetivos Específicos del Escuadrón</span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    letter: 'a',
                    title: 'Sitio y mecanismo de acción',
                    desc: 'Explicar con precisión biofísica y molecular el sitio y mecanismo de acción de cada familia antihipertensiva.',
                  },
                  {
                    letter: 'b',
                    title: 'Derivación de efectos adversos',
                    desc: 'Derivar los efectos adversos esperados a partir del mecanismo fisiopatológico y no por simple memorización de lista.',
                  },
                  {
                    letter: 'c',
                    title: 'Contraindicaciones e interacciones',
                    desc: 'Reconocer formalmente contraindicaciones absolutas e interacciones farmacológicas de alto riesgo clínico.',
                  },
                  {
                    letter: 'd',
                    title: 'Plan de vigilancia estructurado',
                    desc: 'Proponer un plan de vigilancia paraclínica riguroso (electrolitos Na⁺, K⁺, Mg²⁺, creatinina, frecuencia cardiaca).',
                  },
                  {
                    letter: 'e',
                    title: 'Comunicación con evidencia',
                    desc: 'Comunicar la decisión terapéutica fundamentada con evidencia de ensayos clínicos emblemáticos y guías actuales.',
                  },
                ].map((item) => (
                  <div
                    key={item.letter}
                    className="flex items-start gap-3 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:bg-purple-50/30 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.letter}
                    </span>
                    <div className="text-xs">
                      <strong className="text-neutral-950 font-bold block">{item.title}</strong>
                      <span className="text-neutral-600 leading-relaxed">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 4: RESUMEN (TABLA FILTRABLE + DIAGRAMA SRAA)
        ========================================================= */}
        <section id="resumen" aria-labelledby="resumen-heading" className="space-y-6">
          <div className="border-l-4 pl-4" style={{ borderColor: '#D99A00' }}>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
              Atlas Terapéutico
            </span>
            <h2 id="resumen-heading" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-0.5">
              4. Resumen Farmacológico & Diagrama Molecular del SRAA
            </h2>
          </div>

          {/* Interactive SRAA Diagram */}
          <RaasDiagram />

          {/* Filterable Table */}
          <DrugTable />
        </section>

        {/* =========================================================
            SECCIÓN 5: MISIÓN Y PROCESO
        ========================================================= */}
        <section id="mision" aria-labelledby="mision-heading" className="space-y-6">
          <div className="border-l-4 pl-4" style={{ borderColor: '#7B2CBF' }}>
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
              Instrucciones Operativas
            </span>
            <h2 id="mision-heading" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-0.5">
              5. Misión y Proceso de Trabajo Colaborativo
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  La Ruta de los 6 Pasos Farmacológicos
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Cada escuadrón debe completar esta secuencia de razonamiento antes de subir a la tribuna del comité.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-purple-50 text-purple-900 px-3 py-1.5 rounded-xl border border-purple-200 text-xs font-bold">
                <Clock className="w-4 h-4 text-purple-700" />
                <span>Tiempo: 60 min taller + 40 min exposiciones</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {[
                {
                  step: 1,
                  title: 'Lectura del caso clínico',
                  desc: 'Analizar la viñeta de su escuadrón, identificando datos demográficos, comorbilidades y paraclínicos iniciales.',
                  icon: '📖',
                },
                {
                  step: 2,
                  title: 'Identificar el problema',
                  desc: 'Detectar si se trata de un efecto adverso, una interacción de alto riesgo, una contraindicación o fallo de meta.',
                  icon: '🔍',
                },
                {
                  step: 3,
                  title: 'Explicación mecanística',
                  desc: 'Deducir el cuadro clínico a partir del sitio molecular (transportador NCC, NKCC2, ECA, AT₁, canal de Ca²⁺, receptor adrenérgico).',
                  icon: '🧬',
                },
                {
                  step: 4,
                  title: 'Propuesta de plan de acción',
                  desc: 'Definir exactamente: (a) qué fármaco suspender, (b) qué fármaco iniciar en su lugar y (c) qué parámetros vigilar y cuándo.',
                  icon: '📋',
                },
                {
                  step: 5,
                  title: 'Citar al menos 2 referencias',
                  desc: 'Respaldar el razonamiento citando ensayos clínicos emblemáticos (ONTARGET, PATHWAY-2, ALTITUDE, ALLHAT) o guías 2024/2025.',
                  icon: '📚',
                },
                {
                  step: 6,
                  title: 'Exposición e infografía (5 min)',
                  desc: 'Sintetizar la solución en una infografía visual clara y exponerla en exactamente 5 minutos ante el comité docente.',
                  icon: '🎤',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 hover:border-purple-300 hover:bg-purple-50/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-neutral-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 6: CASOS CLÍNICOS (8 TARJETAS)
        ========================================================= */}
        <section id="casos" aria-labelledby="casos-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 pl-4" style={{ borderColor: '#C0392B' }}>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-red-700">
                Resolución en Guardia
              </span>
              <h2 id="casos-heading" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-0.5">
                6. Casos Clínicos de los 8 Escuadrones
              </h2>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <span className="text-xs text-neutral-500 font-medium">
                {isTeacherUnlocked ? 'Modo Docente: Respuestas Visibles' : 'Respuestas con PIN docente'}
              </span>
            </div>
          </div>

          {/* 8 Case Cards */}
          <div className="space-y-8">
            {CLINICAL_CASES.map((caseItem) => {
              const teamScoreObj = teams.find((t) => t.id === caseItem.teamId);
              return (
                <CaseCard
                  key={caseItem.teamId}
                  caseData={caseItem}
                  teamAura={teamScoreObj ? teamScoreObj.score : 0}
                  onUpdateTeamAura={(delta) => handleUpdateScore(caseItem.teamId, delta)}
                  isTeacherModeUnlocked={isTeacherUnlocked}
                  onRequestTeacherUnlock={() => setIsTeacherModalOpen(true)}
                  studentNotes={studentNotes[caseItem.teamId] || ''}
                  onUpdateStudentNotes={(text) =>
                    setStudentNotes((prev) => ({ ...prev, [caseItem.teamId]: text }))
                  }
                />
              );
            })}
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 7: EVALUACIÓN (RÚBRICA + BOSS FINAL)
        ========================================================= */}
        <section id="evaluacion" aria-labelledby="eval-heading" className="space-y-8">
          <div className="border-l-4 pl-4" style={{ borderColor: '#7B2CBF' }}>
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
              Evaluación Sumativa & Formativa
            </span>
            <h2 id="eval-heading" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-0.5">
              7. Evaluación: Rúbrica Ponderada & Boss Final
            </h2>
          </div>

          {/* Rubric Calculator */}
          <RubricCalculator
            teams={teams}
            onApplyScoreToTeam={(teamId, delta) => handleUpdateScore(teamId, delta)}
          />

          {/* 10-Question Boss Final */}
          <BossFinalQuiz />
        </section>

        {/* =========================================================
            SECCIÓN 8: CONCLUSIONES Y METACOGNICIÓN
        ========================================================= */}
        <section id="conclusiones" aria-labelledby="conc-heading" className="space-y-6">
          <div className="border-l-4 pl-4" style={{ borderColor: '#2E7D32' }}>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
              Síntesis Clínica
            </span>
            <h2 id="conc-heading" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-0.5">
              8. Conclusiones y Metacognición Farmacológica
            </h2>
          </div>

          {/* 5 Core Conclusions */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Cinco Principios Innegociables en Farmacoterapia Antihipertensiva</span>
            </h3>

            <div className="space-y-3 pt-2">
              {[
                {
                  num: 1,
                  title: 'Del mecanismo se deduce el efecto adverso',
                  desc: 'No necesitas memorizar listas ciegas: si inhibes la ECA sabes que acumulas bradicinina (tos y angioedema) y relajas la eferente (creatinina); si bloqueas NCC en TCD preservas gradiente medular y concentras con ADH (hiponatremia).',
                },
                {
                  num: 2,
                  title: 'El riñón es el protagonista del control a largo plazo',
                  desc: 'Mediante la curva de presión-natriuresis, el manejo renal del sodio es el árbitro final de la volemia y del tono arteriolar crónico.',
                },
                {
                  num: 3,
                  title: 'Combinar familias complementarias supera a la monoterapia a dosis altas',
                  desc: 'Combinar dosis bajas de dihidropiridina + IECA/ARA-II + tiazida maximiza la eficacia vasodilatadora y natriurética con menor tasa de efectos adversos que elevar al máximo una sola droga.',
                },
                {
                  num: 4,
                  title: 'Cada familia tiene una red flag que hay que conocer de memoria',
                  desc: 'Nunca IECA en embarazo ni con ARA-II (ONTARGET); nunca sacubitril sin 36 h de lavado tras un IECA; nunca betabloqueo solo en feocromocitoma; nunca no-DHP en ICFEr.',
                },
                {
                  num: 5,
                  title: 'La vigilancia es parte integral del tratamiento, no un trámite',
                  desc: 'Solicitar electrolitos séricos (K⁺, Na⁺, Mg²⁺), creatinina y frecuencia cardiaca en las semanas 1 y 4 salva vidas y previene ingresos a terapia intensiva.',
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:bg-emerald-50/30 transition-colors"
                >
                  <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <div className="text-xs">
                    <strong className="text-neutral-900 text-sm font-bold block mb-0.5">
                      {item.title}
                    </strong>
                    <span className="text-neutral-700 leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metacognition Interactive Reflection Box */}
          <div className="bg-gradient-to-br from-neutral-900 via-purple-950 to-neutral-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                Reflexión para el Estudiante
              </span>
              <h3 className="text-xl font-bold mt-1">
                Tres Preguntas de Metacognición Médica
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                Interioriza lo aprendido registrando tu experiencia formativa tras resolver el caso.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="meta-q1" className="block text-xs font-bold text-purple-200 mb-1.5">
                  1. ¿Qué red flag clínica 🚩 no conocías antes de esta actividad?
                </label>
                <textarea
                  id="meta-q1"
                  rows={2}
                  value={metacognitionAnswers.q1}
                  onChange={(e) => setMetacognitionAnswers({ ...metacognitionAnswers, q1: e.target.value })}
                  placeholder="Ejemplo: No conocía la ventana obligatoria de 36 horas entre IECA y ARNI para evitar el angioedema..."
                  className="w-full text-xs p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label htmlFor="meta-q2" className="block text-xs font-bold text-purple-200 mb-1.5">
                  2. ¿Qué mecanismo farmacológico te ayudó a predecir un efecto adverso sin memorizarlo?
                </label>
                <textarea
                  id="meta-q2"
                  rows={2}
                  value={metacognitionAnswers.q2}
                  onChange={(e) => setMetacognitionAnswers({ ...metacognitionAnswers, q2: e.target.value })}
                  placeholder="Ejemplo: Comprender que las dihidropiridinas sólo dilatan la arteriola precapilar y no la vénula explica el edema hidrostático..."
                  className="w-full text-xs p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label htmlFor="meta-q3" className="block text-xs font-bold text-purple-200 mb-1.5">
                  3. ¿Qué harías distinto la próxima vez que valores a un paciente real en consulta o urgencias?
                </label>
                <textarea
                  id="meta-q3"
                  rows={2}
                  value={metacognitionAnswers.q3}
                  onChange={(e) => setMetacognitionAnswers({ ...metacognitionAnswers, q3: e.target.value })}
                  placeholder="Ejemplo: Siempre solicitaré electrolitos y función renal a la 2.ª o 4.ª semana de iniciar un diurético o bloqueador del SRAA..."
                  className="w-full text-xs p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMetacognitionSaved(true);
                    setTimeout(() => setMetacognitionSaved(false), 3000);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Guardar Reflexión Metacognitiva</span>
                </button>

                {metacognitionSaved && (
                  <span className="text-xs text-emerald-300 font-semibold animate-in fade-in">
                    ✓ Reflexión registrada en tu sesión
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 9: REFERENCIAS (VANCOUVER + DOI CLICABLES)
        ========================================================= */}
        <section id="referencias" aria-labelledby="ref-heading" className="space-y-6">
          <div className="border-l-4 pl-4" style={{ borderColor: '#7B2CBF' }}>
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
              Bibliografía Rigurosa
            </span>
            <h2 id="ref-heading" className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-0.5">
              9. Referencias Bibliográficas (Formato Vancouver)
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
            <p className="text-xs text-neutral-500 mb-4">
              Citas normativas de guías internacionales AHA/ACC 2025, ESC 2024, ensayos clínicos pivote y tratados de referencia. Haz clic en los DOIs para consultar las fuentes primarias.
            </p>

            <ol className="divide-y divide-neutral-200 text-xs text-neutral-800 leading-relaxed">
              {REFERENCES.map((ref) => (
                <li key={ref.id} className="py-3 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {ref.id}
                  </span>
                  <div className="space-y-1">
                    <div>{ref.citation}</div>
                    {ref.doi && ref.doiUrl && (
                      <a
                        href={ref.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-purple-700 hover:text-purple-900 hover:underline"
                      >
                        <span>doi:{ref.doi}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* =========================================================
            PIE DE PÁGINA OBLIGATORIO
        ========================================================= */}
        <footer className="pt-8 pb-12 border-t border-neutral-200 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/70 text-neutral-700 text-xs font-semibold">
            <Info className="w-3.5 h-3.5 text-neutral-500" />
            <span>Aviso Legal & Académico</span>
          </div>

          <p className="text-sm font-semibold text-neutral-800 max-w-2xl mx-auto">
            &ldquo;Material educativo; no sustituye el juicio clínico ni la ficha técnica.&rdquo;
          </p>

          <p className="text-xs text-neutral-500">
            WebQuest Didáctica de Farmacología Médica · Creada para docencia de pregrado y posgrado en ciencias de la salud.
          </p>
        </footer>
      </main>
    </div>
  );
}
