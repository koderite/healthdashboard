import type { ReactNode } from 'react';

interface SectionCardProps {
  children: ReactNode;
  width?: string;
  className?: string;
}

export function SectionCard({ children, width = 'auto', className = '' }: SectionCardProps) {
  return (
    <div
      className={`section-card ${className}`}
      style={{ width }}
    >
      {children}
    </div>
  );
}