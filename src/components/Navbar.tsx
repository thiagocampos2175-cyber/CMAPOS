import React, { useState } from 'react';
import {
  HeartPulse,
  Printer,
  Lock,
  Unlock,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  isTeacherUnlocked: boolean;
  onOpenTeacherModal: () => void;
  onPrint: () => void;
}

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#introduccion', label: 'Introducción' },
  { href: '#objetivos', label: 'Objetivos' },
  { href: '#resumen', label: 'Resumen' },
  { href: '#mision', label: 'Misión' },
  { href: '#casos', label: 'Casos' },
  { href: '#evaluacion', label: 'Evaluación' },
  { href: '#conclusiones', label: 'Conclusiones' },
  { href: '#referencias', label: 'Referencias' },
];

export const Navbar: React.FC<NavbarProps> = ({
  isTeacherUnlocked,
  onOpenTeacherModal,
  onPrint,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand Logo & Title */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 text-neutral-900 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105"
              style={{ backgroundColor: '#7B2CBF' }}
            >
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-neutral-900 flex items-center gap-1">
                <span>WebQuest Antihipertensivos</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 font-bold border border-purple-200 hidden md:inline">
                  Aura vs Cocinado
                </span>
              </span>
              <span className="text-[10px] text-neutral-500 font-medium hidden sm:block">
                Farmacología Médica · 8 Equipos
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-neutral-600">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="px-2.5 py-1.5 rounded-lg hover:text-purple-700 hover:bg-purple-50 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions: Print & Teacher Mode */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrint}
              title="Imprimir guía o exportar a PDF (un caso por página)"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors border border-neutral-200"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-600" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              type="button"
              onClick={onOpenTeacherModal}
              title="Activar/desactivar Modo Docente (respuestas clínicas)"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-xs border ${
                isTeacherUnlocked
                  ? 'bg-purple-100 text-purple-900 border-purple-300 hover:bg-purple-200'
                  : 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800'
              }`}
            >
              {isTeacherUnlocked ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-purple-700" />
                  <span className="hidden sm:inline">Modo Docente (Activo)</span>
                  <span className="sm:hidden">Docente ✓</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Modo docente</span>
                </>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú de navegación móvil"
              className="lg:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 py-3 space-y-2 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-3 gap-1.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-left px-2.5 py-2 text-xs font-medium rounded-lg text-neutral-700 hover:bg-purple-50 hover:text-purple-700"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onPrint();
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-purple-700 py-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
            <span className="text-[11px] text-neutral-400">PIN: 1234</span>
          </div>
        </div>
      )}
    </header>
  );
};
