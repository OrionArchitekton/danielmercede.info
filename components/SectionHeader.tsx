import React from 'react';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4 mt-8 border-b border-neutral-100 pb-2">
      {title}
    </h2>
  );
};