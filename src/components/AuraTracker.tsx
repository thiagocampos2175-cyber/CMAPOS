import React, { useState } from 'react';
import { Sparkles, Trophy, ChevronDown, ChevronUp, RotateCcw, ExternalLink } from 'lucide-react';
import { getAuraStatus } from '../utils/evaluation';

export interface TeamScore {
  id: number;
  name: string;
  family: string;
  score: number;
}

interface AuraTrackerProps {
  teams: TeamScore[];
  onUpdateScore: (teamId: number, delta: number) => void;
  onResetScores: () => void;
  onSelectTeamCase: (teamId: number) => void;
}

export const AuraTracker: React.FC<AuraTrackerProps> = ({
  teams,
  onUpdateScore,
  onResetScores,
  onSelectTeamCase,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Compute stats
  const totalAura = teams.reduce((acc, t) => acc + t.score, 0);
  const topTeam = [...teams].sort((a, b) => b.score - a.score)[0];

  return (
    <aside
      aria-label="Marcador de Aura por Escuadrón"
      className="bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm print:hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 text-white shadow-sm">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-purple-900">
                  Tablero de Aura por Escuadrón
                </span>
                <span className="text-xs bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-full border border-purple-200">
                  8 Equipos
                </span>
              </div>
              <p className="text-xs text-neutral-500 hidden sm:block">
                Líder actual: <strong className="text-purple-900 font-medium">{topTeam.name}</strong> ({topTeam.score > 0 ? `+${topTeam.score}` : topTeam.score} pts) · Total aula: {totalAura} pts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetScores}
              title="Reiniciar marcadores de aura"
              className="text-xs text-neutral-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors flex items-center gap-1 border border-neutral-200"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">Reiniciar</span>
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-purple-800 hover:bg-purple-100 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 border border-purple-200"
            >
              <span>{isExpanded ? 'Ocultar marcadores' : 'Mostrar 8 equipos'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2 border-t border-purple-100">
            {teams.map((team) => {
              const status = getAuraStatus(team.score);
              const isPositive = team.score > 0;
              const isNegative = team.score < 0;

              return (
                <div
                  key={team.id}
                  className="rounded-lg border border-neutral-200 bg-neutral-50/70 p-2 flex flex-col justify-between hover:border-purple-300 hover:bg-purple-50/30 transition-all text-xs"
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <button
                      type="button"
                      onClick={() => onSelectTeamCase(team.id)}
                      title={`Ir al caso de ${team.name}`}
                      className="font-bold text-neutral-800 hover:text-purple-700 text-left line-clamp-1 flex items-center gap-0.5 group"
                    >
                      <span>Eq {team.id}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-neutral-400 group-hover:text-purple-700" />
                    </button>
                    <span
                      className={`font-mono font-bold text-xs px-1.5 py-0.2 rounded ${
                        isPositive
                          ? 'text-emerald-700 bg-emerald-100'
                          : isNegative
                          ? 'text-red-700 bg-red-100'
                          : 'text-neutral-600 bg-neutral-200'
                      }`}
                    >
                      {team.score > 0 ? `+${team.score}` : team.score}
                    </span>
                  </div>

                  <div className="text-[10px] text-neutral-500 truncate mb-1" title={team.family}>
                    {team.family}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-neutral-200/60 mt-auto">
                    <span className="text-[9px] font-semibold text-neutral-600 truncate max-w-[50px]">
                      {team.score >= 50 ? '🗿 Sig' : team.score >= 20 ? '✨ Rizz' : team.score >= 0 ? '😐 NPC' : '🍳 Coc'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onUpdateScore(team.id, -10)}
                        aria-label={`Quitar 10 de aura al Equipo ${team.id}`}
                        title="-10 Aura (Error o red flag ignorada)"
                        className="w-5 h-5 flex items-center justify-center rounded bg-red-100 text-red-700 hover:bg-red-200 font-bold transition-colors active:scale-95"
                      >
                        −
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateScore(team.id, 10)}
                        aria-label={`Sumar 10 de aura al Equipo ${team.id}`}
                        title="+10 Aura (Buen razonamiento farmacológico)"
                        className="w-5 h-5 flex items-center justify-center rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold transition-colors active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};
