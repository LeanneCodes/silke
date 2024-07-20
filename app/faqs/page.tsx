'use client';

import React, { useState } from 'react';
import faqs from './faqs.json';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  [key: string]: FAQ[];
}

const About: React.FC = () => {
  const [activeIndexes, setActiveIndexes] = useState<{ [category: string]: number | null }>({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleAnswer = (category: string, index: number) => {
    setActiveIndexes(prev => ({
      ...prev,
      [category]: prev[category] === index ? null : index
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredFaqs = Object.entries(faqs).reduce((acc, [category, faqList]) => {
    const filteredList = faqList.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredList.length > 0) {
      acc[category] = filteredList;
    }
    return acc;
  }, {} as FAQCategory);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-montserrat mb-6 text-center">Frequently Asked Questions</h1>
      <div className="mb-6 text-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search FAQs"
          className="py-2 ps-4 mt-6 border border-gray-300 rounded-full xs:w-full md:w-3/5 lg:w-2/5 text-darkGrey"
        />
      </div>
      {Object.entries(filteredFaqs).map(([category, faqList]) => (
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
                  <div className="p-4 bg-white text-darkGrey font-montserrat rounded-b" dangerouslySetInnerHTML={{ __html: faq.answer }} />
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
