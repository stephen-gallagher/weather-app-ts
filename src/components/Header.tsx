import React from 'react';

interface HeaderProps {
  h2Text: string;
}

export default function Header({ h2Text }: HeaderProps) {
  return (
    <header>
      <h2 className="p-3 border-bottom border-dark">{h2Text}</h2>
    </header>
  );
}
