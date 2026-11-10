import React from 'react';
import { AlertCircle, Lightbulb, ShieldAlert } from 'lucide-react';

interface CalloutBoxProps {
  type: 'explicacion' | 'mnemotecnia' | 'redFlag';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const CalloutBox: React.FC<CalloutBoxProps> = ({
  type,
  title,
  children,
  className = '',
}) => {
  if (type === 'explicacion') {
    return (
      <div
        className={`rounded-xl border border-purple-200 bg-purple-50/80 p-4 text-purple-950 transition-all ${className}`}
        style={{ borderLeftWidth: '5px', borderLeftColor: '#7B2CBF' }}
      >
        <div className="flex items-center gap-2 mb-1.5 font-semibold text-purple-900 text-sm">
          <span className="text-base" role="img" aria-label="Explicación">🟣</span>
          <span>{title || 'Explicación Farmacomecánica'}</span>
        </div>
        <div className="text-sm leading-relaxed text-purple-900/90">{children}</div>
      </div>
    );
  }

  if (type === 'mnemotecnia') {
    return (
      <div
        className={`rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-emerald-950 transition-all ${className}`}
        style={{ borderLeftWidth: '5px', borderLeftColor: '#2E7D32' }}
      >
        <div className="flex items-center gap-2 mb-1.5 font-semibold text-emerald-900 text-sm">
          <span className="text-base" role="img" aria-label="Mnemotecnia">🟢</span>
          <span>{title || 'Mnemotecnia & Brainrot Rizz'}</span>
        </div>
        <div className="text-sm leading-relaxed text-emerald-900/90">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-red-200 bg-red-50/90 p-4 text-red-950 transition-all ${className}`}
      style={{ borderLeftWidth: '5px', borderLeftColor: '#C0392B' }}
    >
      <div className="flex items-center gap-2 mb-1.5 font-bold text-red-800 text-sm">
        <span className="text-base" role="img" aria-label="Red flag">🔴</span>
        <span>{title || 'Red Flag Farmacológica 🚩'}</span>
      </div>
      <div className="text-sm font-medium leading-relaxed text-red-950">{children}</div>
    </div>
  );
};
