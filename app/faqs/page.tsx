'use client';

import React, { useState } from 'react';
import faqs from './faqs.json';

const About: React.FC = () => {
  const [activeIndexes, setActiveIndexes] = useState<{ [category: string]: number | null }>({});

  const toggleAnswer = (category: string, index: number) => {
    setActiveIndexes(prev => ({
      ...prev,
      [category]: prev[category] === index ? null : index
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-montserrat mb-6 text-center">Frequently Asked Questions</h1>
      {Object.entries(faqs).map(([category, faqList]) => (
        <div key={category} className="mb-8">
          <h2 className="text-3xl font-montserrat mb-4">{category.replace(/([A-Z])/g, ' $1')}</h2>
          <div className="space-y-4">
            {faqList.map((faq, index) => (
              <div key={index} className='bg-sage opacity-80 rounded'>
                <button
                  onClick={() => toggleAnswer(category, index)}
                  className="w-full flex justify-between items-center text-left py-2 px-4 bg-primary text-white font-montserrat rounded-t"
                >
                  {faq.question}
                  <span className="text-2xl">{activeIndexes[category] === index ? '-' : '+'}</span>
                </button>
                {activeIndexes[category] === index && (
                  <div className="p-4 bg-white text-darkGrey font-montserrat rounded-b">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
