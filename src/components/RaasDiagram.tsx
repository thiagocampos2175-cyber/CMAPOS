import React, { useState } from 'react';
import { ShieldCheck, Info, AlertOctagon, Zap } from 'lucide-react';

interface RaasDrugTarget {
  name: string;
  category: string;
  targetStep: string;
  description: string;
  clinicalNote: string;
  badgeColor: string;
}

const DRUG_TARGETS: Record<string, RaasDrugTarget> = {
  aliskireno: {
    name: 'Aliskireno',
    category: 'Inhibidor directo de la Renina',
    targetStep: 'Conversión de Angiotensinógeno en Angiotensina I',
    description: 'Bloquea la hendidura catalítica de la renina secretada por las células yuxtaglomerulares renales.',
    clinicalNote: '🚩 Ensayo ALTITUDE: Contraindicado asociar a IECA/ARA-II por exceso de eventos adversos (hiperpotasemia, ictus, fallo renal).',
    badgeColor: 'border-amber-400 bg-amber-50 text-amber-900',
  },
  ieca: {
    name: 'IECA ("-pril")',
    category: 'Inhibidor de la Enzima Convertidora de Angiotensina',
    targetStep: 'Conversión de Angiotensina I en Angiotensina II',
    description: 'Inhibe la ECA (idéntica a la Cininasa II). Reduce Angiotensina II y simultáneamente bloquea la degradación de bradicinina y sustancia P.',
    clinicalNote: '🚩 Tos seca (bradicinina), angioedema, teratógeno en embarazo, contraindicado en estenosis bilateral de arteria renal.',
    badgeColor: 'border-purple-400 bg-purple-50 text-purple-900',
  },
  ara2: {
    name: 'ARA-II ("-sartán")',
    category: 'Antagonista del Receptor AT₁',
    targetStep: 'Unión de Angiotensina II a su receptor efector AT₁',
    description: 'Bloqueo competitivo selectivo del receptor AT₁. Permite que la Ang II sobrante active receptores AT₂ (vasodilatadores). No acumula bradicinina.',
    clinicalNote: '🚩 Ensayo ONTARGET: Jamás combinar simultáneamente con IECA. Teratógeno absoluto en embarazo.',
    badgeColor: 'border-indigo-400 bg-indigo-50 text-indigo-900',
  },
  arm: {
    name: 'ARM ("Espironolactona / Eplerenona")',
    category: 'Antagonista del Receptor Mineralocorticoide',
    targetStep: 'Acción nuclear de la Aldosterona en el Túbulo Colector',
    description: 'Inhibe la transcripción de canales ENaC y bomba Na⁺/K⁺ ATPasa estimulados por la aldosterona. Provoca natriuresis con retención de potasio.',
    clinicalNote: '🚩 Cuarto fármaco de elección en HTA resistente (PATHWAY-2). Cuidado crítico con hiperpotasemia si TFGe <45.',
    badgeColor: 'border-emerald-400 bg-emerald-50 text-emerald-900',
  },
  arni: {
    name: 'ARNI ("Sacubitril / Valsartán")',
    category: 'Inhibidor de Neprilisina + Bloqueador de Receptor AT₁',
    targetStep: 'Doble vía: Degradación de péptidos natriuréticos + Bloqueo AT₁',
    description: 'El profármaco sacubitril inhibe la neprilisina aumentando ANP, BNP y bradicinina; el valsartán bloquea el receptor AT₁.',
    clinicalNote: '🚩 Regla mandataria: esperar 36 horas tras la última dosis de un IECA antes de iniciar para evitar angioedema fatal.',
    badgeColor: 'border-red-400 bg-red-50 text-red-900',
  },
};

export const RaasDiagram: React.FC = () => {
  const [selectedDrug, setSelectedDrug] = useState<string | null>('ieca');

  const activeDrug = selectedDrug ? DRUG_TARGETS[selectedDrug] : null;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 md:p-7">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 uppercase">
              Fisiología & Dianas Farmacológicas
            </span>
            <span className="text-xs text-neutral-400 hidden sm:inline">• Haz clic en cada diana</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mt-1">
            Diagrama Molecular del Eje SRAA (Sistema Renina-Angiotensina-Aldosterona)
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            Identifica el sitio molecular exacto donde impacta cada familia antihipertensiva y sus consecuencias clínicas.
          </p>
        </div>

        {/* Drug filter buttons */}
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(DRUG_TARGETS).map(([key, item]) => {
            const isSelected = selectedDrug === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedDrug(isSelected ? null : key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-purple-700 text-white border-purple-800 shadow-sm'
                    : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Pathway Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Pathway Diagram Cards */}
        <div className="lg:col-span-7 space-y-3">
          {/* Step 1: Angiotensinógeno */}
          <div className="relative rounded-xl border border-neutral-200 bg-neutral-50/70 p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-700 font-bold text-xs flex items-center justify-center">1</span>
                <div>
                  <span className="text-xs uppercase tracking-wide text-neutral-500 font-semibold">Sustrato Hepático</span>
                  <div className="font-bold text-neutral-900 text-sm">Angiotensinógeno</div>
                </div>
              </div>
              <span className="text-[11px] bg-neutral-200/80 text-neutral-700 px-2 py-0.5 rounded font-mono">Hígado</span>
            </div>

            {/* Catalyst + Inhibitor */}
            <div className="my-2 py-1.5 px-3 rounded-lg bg-amber-50/80 border border-amber-200 flex items-center justify-between">
              <span className="text-xs text-amber-900 font-medium">
                Enzima: <strong>Renina</strong> (Riñón / aparato yuxtaglomerular)
              </span>
              <button
                type="button"
                onClick={() => setSelectedDrug('aliskireno')}
                className={`text-xs px-2 py-0.5 rounded font-bold transition-all border ${
                  selectedDrug === 'aliskireno'
                    ? 'bg-amber-700 text-white border-amber-800'
                    : 'bg-white text-amber-800 border-amber-300 hover:bg-amber-100'
                }`}
              >
                Bloqueado por: Aliskireno ⚡
              </button>
            </div>

            <div className="text-center text-neutral-400 text-xs">↓</div>

            {/* Step 2: Angiotensina I */}
            <div className="mt-1 flex items-center justify-between border-t border-neutral-200 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-700 font-bold text-xs flex items-center justify-center">2</span>
                <div>
                  <span className="text-xs uppercase tracking-wide text-neutral-500 font-semibold">Decapéptido Inactivo</span>
                  <div className="font-bold text-neutral-900 text-sm">Angiotensina I</div>
                </div>
              </div>
              <span className="text-[11px] bg-neutral-200/80 text-neutral-700 px-2 py-0.5 rounded font-mono">Circulante</span>
            </div>

            {/* Catalyst + Inhibitor */}
            <div className="my-2 py-1.5 px-3 rounded-lg bg-purple-50/80 border border-purple-200 flex items-center justify-between">
              <span className="text-xs text-purple-900 font-medium">
                Enzima: <strong>ECA</strong> (Cininasa II endotelial)
              </span>
              <button
                type="button"
                onClick={() => setSelectedDrug('ieca')}
                className={`text-xs px-2 py-0.5 rounded font-bold transition-all border ${
                  selectedDrug === 'ieca'
                    ? 'bg-purple-700 text-white border-purple-800'
                    : 'bg-white text-purple-800 border-purple-300 hover:bg-purple-100'
                }`}
              >
                Inhibido por: IECA ("-pril") ⚡
              </button>
            </div>

            <div className="text-center text-neutral-400 text-xs">↓</div>

            {/* Step 3: Angiotensina II */}
            <div className="mt-1 flex items-center justify-between border-t border-neutral-200 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center">3</span>
                <div>
                  <span className="text-xs uppercase tracking-wide text-red-700 font-semibold">Potente Vasoconstrictor</span>
                  <div className="font-bold text-neutral-900 text-sm">Angiotensina II</div>
                </div>
              </div>
              <span className="text-[11px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono">Efector central</span>
            </div>

            {/* Receptor Block + Inhibitor */}
            <div className="my-2 py-1.5 px-3 rounded-lg bg-indigo-50/80 border border-indigo-200 flex items-center justify-between">
              <span className="text-xs text-indigo-900 font-medium">
                Diana: <strong>Receptor AT₁</strong> (Vasos & Adrenal)
              </span>
              <button
                type="button"
                onClick={() => setSelectedDrug('ara2')}
                className={`text-xs px-2 py-0.5 rounded font-bold transition-all border ${
                  selectedDrug === 'ara2'
                    ? 'bg-indigo-700 text-white border-indigo-800'
                    : 'bg-white text-indigo-800 border-indigo-300 hover:bg-indigo-100'
                }`}
              >
                Bloqueado por: ARA-II ("-sartán") ⚡
              </button>
            </div>

            <div className="text-center text-neutral-400 text-xs">↓</div>

            {/* Step 4: Aldosterona */}
            <div className="mt-1 flex items-center justify-between border-t border-neutral-200 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">4</span>
                <div>
                  <span className="text-xs uppercase tracking-wide text-emerald-800 font-semibold">Mineralocorticoide Renal</span>
                  <div className="font-bold text-neutral-900 text-sm">Aldosterona</div>
                </div>
              </div>
              <span className="text-[11px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono">Corteza adrenal</span>
            </div>

            {/* ARM Inhibitor */}
            <div className="my-2 py-1.5 px-3 rounded-lg bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
              <span className="text-xs text-emerald-900 font-medium">
                Diana: <strong>Receptor Mineralocorticoide</strong> (Túbulo colector)
              </span>
              <button
                type="button"
                onClick={() => setSelectedDrug('arm')}
                className={`text-xs px-2 py-0.5 rounded font-bold transition-all border ${
                  selectedDrug === 'arm'
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                Bloqueado por: ARM (Espironolactona/Eplerenona) ⚡
              </button>
            </div>
          </div>

          {/* ARNI Double Component */}
          <div className="rounded-xl border border-red-200 bg-red-50/60 p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-600" />
                <span className="font-bold text-neutral-900 text-sm">
                  ARNI: Sacubitril / Valsartán (Mecanismo Dual Innovador)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDrug('arni')}
                className={`text-xs px-2 py-0.5 rounded font-bold transition-all border ${
                  selectedDrug === 'arni'
                    ? 'bg-red-700 text-white border-red-800'
                    : 'bg-white text-red-700 border-red-300 hover:bg-red-100'
                }`}
              >
                Ver ARNI ⚡
              </button>
            </div>
            <p className="text-xs text-neutral-700 mt-1.5 leading-relaxed">
              <strong>1. Sacubitril:</strong> Inhibe la neprilisina (endopeptidasa neutra), preservando péptidos natriuréticos (ANP, BNP) y bradicinina. <br />
              <strong>2. Valsartán:</strong> Bloquea simultáneamente el receptor AT₁ de la Angiotensina II.
            </p>
          </div>
        </div>

        {/* Drug Details Panel */}
        <div className="lg:col-span-5 bg-neutral-50 rounded-xl p-5 border border-neutral-200 sticky top-24">
          {activeDrug ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Detalle Farmacomecánico
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold border border-purple-200">
                  {activeDrug.category}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-neutral-900">{activeDrug.name}</h4>
                <p className="text-xs font-medium text-neutral-600 mt-0.5">
                  <strong>Punto de bloqueo:</strong> {activeDrug.targetStep}
                </p>
              </div>

              <div className="text-xs leading-relaxed text-neutral-700 bg-white p-3 rounded-lg border border-neutral-200">
                {activeDrug.description}
              </div>

              <div className="text-xs leading-relaxed font-semibold text-red-900 bg-red-100/70 p-3 rounded-lg border border-red-200">
                {activeDrug.clinicalNote}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-500">
              <Info className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
              <p className="text-sm font-medium">Selecciona un fármaco arriba para ver su sitio molecular y su red flag.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
