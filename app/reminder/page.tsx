'use client'

import React, { useState } from 'react';

const Reminders: React.FC = () => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/schedule-reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appointmentDate, phoneNumber, city }),
    });

    const data = await response.json();
    setMessage(data.message || 'Failed to schedule reminder');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-montserrat mb-6 text-center">Silk Press Appointment Reminders</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-darkGrey">
        <div>
          <label className="block mb-2 font-montserrat">Appointment Date:</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-montserrat">Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-montserrat">City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-white hover:text-mustard rounded">
          Schedule Reminder
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Reminders;
