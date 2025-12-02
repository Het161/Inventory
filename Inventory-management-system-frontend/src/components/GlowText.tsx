'use client';

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'low' | 'medium' | 'high';
}

export default function GlowText({ children, className = '', glow = 'medium' }: GlowTextProps) {
  const glowStyles = {
    low: 'dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]',
    medium: 'dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]',
    high: 'dark:drop-shadow-[0_0_30px_rgba(255,255,255,1)]',
  };

  return (
    <span className={`${className} ${glowStyles[glow]}`}>
      {children}
    </span>
  );
}
