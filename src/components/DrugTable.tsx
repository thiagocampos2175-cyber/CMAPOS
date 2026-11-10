import React, { useState } from 'react';
import { Search, Filter, ShieldAlert, Pill } from 'lucide-react';
import { DRUG_FAMILIES, DrugFamily } from '../data/drugSummary';

export const DrugTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todas las familias' },
    { id: 'diuretico', label: 'Diuréticos' },
    { id: 'sraa', label: 'Eje SRAA' },
    { id: 'calcioantagonista', label: 'Calcioantagonistas' },
    { id: 'simpatico', label: 'Sistema Simpático' },
    { id: 'vasodilatador', label: 'Vasodilatadores' },
  ];

  const filteredFamilies = DRUG_FAMILIES.filter((item) => {
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchLower) ||
      item.examples.toLowerCase().includes(searchLower) ||
      item.mechanism.toLowerCase().includes(searchLower) ||
      item.adverseEffects.toLowerCase().includes(searchLower) ||
      item.redFlag.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      {/* Search and Filters Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-neutral-50 via-purple-50/20 to-neutral-50 border-b border-neutral-200">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Pill className="w-5 h-5 text-purple-700" />
              <span>Tabla de Farmacología Antihipertensiva Comparada</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Filtra por mecanismo, efectos adversos o detecta las red flags clínicas 🚩 de cada clase.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar fármaco, diana o efecto..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white shadow-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-neutral-200/70">
          <span className="text-xs font-semibold text-neutral-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Categoría:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-700 text-white shadow-sm font-semibold'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-neutral-400 font-mono">
            {filteredFamilies.length} {filteredFamilies.length === 1 ? 'familia' : 'familias'}
          </span>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-100/80 border-b border-neutral-200 text-xs font-bold text-neutral-700 uppercase tracking-wider">
              <th scope="col" className="p-3.5 min-w-[170px]">Familia</th>
              <th scope="col" className="p-3.5 min-w-[180px]">Ejemplos Representativos</th>
              <th scope="col" className="p-3.5 min-w-[220px]">Sitio / Mecanismo de Acción</th>
              <th scope="col" className="p-3.5 min-w-[210px]">Efectos Adversos Clave</th>
              <th scope="col" className="p-3.5 min-w-[230px]">Red Flag Farmacológica 🚩</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 text-xs">
            {filteredFamilies.length > 0 ? (
              filteredFamilies.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`hover:bg-purple-50/40 transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/40'
                  }`}
                >
                  <td className="p-3.5 font-bold text-neutral-900 align-top">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-medium text-neutral-700 align-top">
                    {item.examples}
                  </td>
                  <td className="p-3.5 text-neutral-800 leading-relaxed align-top">
                    {item.mechanism}
                  </td>
                  <td className="p-3.5 text-neutral-700 leading-relaxed align-top">
                    <span className="font-mono text-[11px] bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800 border border-neutral-200">
                      {item.adverseEffects}
                    </span>
                  </td>
                  <td className="p-3.5 align-top">
                    <div className="flex items-start gap-1.5 bg-red-50/80 text-red-950 p-2 rounded-lg border border-red-200 leading-snug">
                      <span className="shrink-0 text-sm">🚩</span>
                      <span className="font-medium text-[11px]">{item.redFlag}</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-neutral-500">
                  No se encontraron familias farmacológicas que coincidan con &ldquo;{searchTerm}&rdquo;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
