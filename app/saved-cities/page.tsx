'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SavedCities = () => {
  const [savedCities, setSavedCities] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cities = [];
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith('city-')) {
        cities.push(key.replace('city-', ''));
      }
    }
    setSavedCities(cities);
    setFilteredCities(cities);
  }, []);

  const handleCityClick = (city: string) => {
    localStorage.setItem('selectedCity', city);
    router.push('/dashboard');
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    const filtered = savedCities.filter(city => city.toLowerCase().startsWith(letter.toLowerCase()));
    setFilteredCities(filtered);
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div>
      <h1 className="text-4xl font-montserrat mb-12 text-center">Saved Cities</h1>
      <div className="text-center mb-4 px-20">
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`m-1 px-[0.55rem] py-[0.1rem] hover:bg-darkGrey hover:rounded-full hover:text-white ${selectedLetter === letter ? 'bg-transparent text-white hover:bg-transparent' : 'bg-white opacity-50 rounded-full text-black'}`}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className='flex flex-wrap justify-center mt-20 h-[50vh] items-center'>
        {filteredCities.map((city, index) => (
          <div
            key={index}
            onClick={() => handleCityClick(city)}
            className='m-3 p-3 cursor-pointer w-40 text-center rounded-full uppercase hover:bg-darkGrey'
            style={{ border: '1px solid #ccc' }}
          >
            <p>{city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCities;
