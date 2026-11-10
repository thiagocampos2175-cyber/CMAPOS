import React, { useState } from 'react';
import { Lock, Unlock, KeyRound, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { verifyTeacherPin, TEACHER_PIN } from '../utils/evaluation';

interface TeacherModeModalProps {
  isOpen: boolean;
  isUnlocked: boolean;
  onClose: () => void;
  onUnlock: () => void;
  onLock: () => void;
}

export const TeacherModeModal: React.FC<TeacherModeModalProps> = ({
  isOpen,
  isUnlocked,
  onClose,
  onUnlock,
  onLock,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyTeacherPin(pinInput)) {
      onUnlock();
      setPinInput('');
      setErrorMsg('');
      onClose();
    } else {
      setErrorMsg('PIN incorrecto. Revisa las instrucciones docentes.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in"
    >
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-purple-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <KeyRound className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h2 id="teacher-modal-title" className="font-bold text-lg leading-tight">
                Acceso a Modo Docente
              </h2>
              <p className="text-xs text-purple-200">
                Revela claves de respuesta, mecanismos y retroalimentación
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal de modo docente"
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isUnlocked ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 text-base">Modo Docente Activo</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Todas las respuestas clínicas esperadas, diagnósticos farmacomecánicos y sugerencias pedagógicas están visibles en los 8 casos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onLock();
                  onClose();
                }}
                className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 text-sm"
              >
                <Lock className="w-4 h-4" />
                <span>Bloquear y volver a Modo Alumno</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-neutral-600 leading-relaxed">
                Ingresa el PIN de seguridad docente para visualizar las respuestas modelo y criterios de evaluación de los 8 casos clínicos.
              </p>

              <div>
                <label htmlFor="teacher-pin-input" className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase">
                  PIN de Acceso Docente:
                </label>
                <div className="relative">
                  <input
                    id="teacher-pin-input"
                    type="password"
                    maxLength={10}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Introduce el PIN docente"
                    autoFocus
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-center font-mono text-lg tracking-widest placeholder:text-neutral-400 placeholder:text-sm placeholder:tracking-normal"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 text-center">
                  (PIN predeterminado en guía didáctica: <strong className="text-purple-700 font-mono">{TEACHER_PIN}</strong>)
                </p>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-xl text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Desbloquear</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
