import { useState } from 'react';

interface LandingPageProps {
  onCitySubmit: (city: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onCitySubmit }) => {
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    if (city.trim()) {
      onCitySubmit(city);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-[90vh] w-dvh mt-[-100px]'>
      <h1 className='font-playwrite text-9xl mb-10'>silke</h1>
      <p className='font-montserrat mb-10 px-20 text-center'>Ensure perfect weather and dew point for your next silk press!</p>
      <div className='flex'>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={{ padding: '10px', width: '200px', marginRight: '10px', borderRadius: '10px' }}
          className='font-montserrat text-darkGrey'
        />
        <button onClick={handleSubmit} style={{ padding: '10px 20px' }} className='font-montserrat hover:text-mustard'>Check Weather</button>
      </div>
    </div>
  );
};

export default LandingPage;
