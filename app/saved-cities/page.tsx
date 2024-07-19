'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SavedCities = () => {
  const [savedCities, setSavedCities] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cities = [];
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith('city-')) {
        cities.push(key.replace('city-', ''));
      }
    }
    setSavedCities(cities);
  }, []);

  const handleCityClick = (city: string) => {
    localStorage.setItem('selectedCity', city);
    router.push('/dashboard');
  };

  return (
    <div>
      <h1 className="text-4xl font-montserrat mb-6 text-center">Saved Cities</h1>
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
