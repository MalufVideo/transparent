import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', intensity = 'medium' }) => {
  let bgClass = '';
  
  switch (intensity) {
    case 'low':
      bgClass = 'bg-white/5 backdrop-blur-sm border-white/10';
      break;
    case 'high':
      // Adjusted for better visibility on transparent backgrounds
      bgClass = 'bg-white/10 backdrop-blur-lg border-white/30 shadow-2xl shadow-black/20';
      break;
    case 'medium':
    default:
      bgClass = 'bg-white/10 backdrop-blur-md border-white/20 shadow-xl';
      break;
  }

  return (
    <div className={`rounded-2xl border ${bgClass} ${className} transition-all duration-300`}>
      {children}
    </div>
  );
};