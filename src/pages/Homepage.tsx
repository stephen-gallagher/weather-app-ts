import React from 'react';
import WeatherDisplay from '../components/WeatherDisplay';

interface HomepageProps {
  h2Text: string;
}

export default function Homepage({ h2Text }: HomepageProps) {
  return (
    <div>
      <h2>{h2Text}</h2>
      <WeatherDisplay />
    </div>
  );
}
