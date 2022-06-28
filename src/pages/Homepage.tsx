import React from 'react';
import WeatherDisplay from '../components/WeatherDisplay';

interface HomepageProps {
  h2Text: string;
}

export default function Homepage() {
  return (
    <div>
      <WeatherDisplay />
    </div>
  );
}
