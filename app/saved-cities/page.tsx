'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter hook
import Navbar from '../components/Navbar';

const SavedCities = () => {
  const [savedCities, setSavedCities] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cities = JSON.parse(localStorage.getItem('savedCities') || '[]');
    setSavedCities(cities);
  }, []);

  const handleCityClick = (city: string) => {
    localStorage.setItem('selectedCity', city);
    router.push('/');
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: 'center' }}>Saved Cities</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {savedCities.map((city, index) => (
          <div
            key={index}
            onClick={() => handleCityClick(city)}
            style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '150px', cursor: 'pointer' }}
          >
            <p>{city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCities;
