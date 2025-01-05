import React from 'react';
import type { Event } from '../types';

interface FootballFieldProps {
  events: Event[];
  onFieldClick: (x: number, y: number) => void;
}

export const FootballField: React.FC<FootballFieldProps> = ({ events, onFieldClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onFieldClick(x, y);
  };

  return (
    <div
      className="relative w-full aspect-[2/1] bg-emerald-900 rounded-lg cursor-crosshair border-2 border-emerald-700"
      onClick={handleClick}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
        {/* Linha de fundo */}
        <rect x="-50" y="0" width="0.1" height="100" fill="none" stroke="white" strokeWidth="0.5" />
        <rect x="150" y="0" width="0.1" height="100" fill="none" stroke="white" strokeWidth="0.5" />

        {/* Linha de Lateral */}

        <rect x="-50" y="100" width="200" height="0.1" fill="none" stroke="white" strokeWidth="0.5" />
        <rect x="-50" y="0" width="200" height="0.1" fill="none" stroke="white" strokeWidth="0.5" />

        {/* Linha de meio campo */}
        <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />

        {/* Círculo central */}
        <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="0.5" />

        {/* Ponto central */}
        <circle cx="50" cy="50" r="0.5" fill="white" />

        {/* Pequena área */}
        <rect x="-50" y="30" width="15" height="40" fill="none" stroke="white" strokeWidth="0.5" />
        <rect x="135" y="30" width="15" height="40" fill="none" stroke="white" strokeWidth="0.5" />

        {/* Grande Área */}
        <rect x="-50" y="20" width="30" height="60" fill="none" stroke="white" strokeWidth="0.5" />
        <rect x="120" y="20" width="30" height="60" fill="none" stroke="white" strokeWidth="0.5" />


        {/* Ponto de penalti */}
        <circle cx="-28" cy="50" r="1" fill="white" />
        <circle cx="128" cy="50" r="1" fill="white" />
      </svg>

      {/* Event markers */}
      {events.map((event, index) => (
        <div
          key={index}
          className="absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform"
          style={{ left: `${event.x}%`, top: `${event.y}%` }}
          title={`Event ${index + 1}: ${event.description || 'No description'}`}
        />
      ))}
    </div>
  );
};