'use client';

import React, { useState, useEffect } from 'react';
import faqs from './faqs.json'

const About: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
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
                  onClick={() => toggleAnswer(index)}
                  className="w-full text-left py-2 px-4 bg-primary text-white font-montserrat rounded-t"
                >
                  {faq.question}
                </button>
                {activeIndex === index && (
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
