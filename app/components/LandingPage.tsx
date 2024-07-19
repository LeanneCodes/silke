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
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <img src="/logo.png" alt="Logo" style={{ width: '150px', marginBottom: '20px' }} />
      <h1>Welcome to Weather App</h1>
      <p>Enter your city to get the latest weather information</p>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        style={{ padding: '10px', width: '200px', marginRight: '10px' }}
      />
      <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>Get Weather</button>
    </div>
  );
};

export default LandingPage;
