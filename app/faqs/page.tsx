'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: "Why I created this website?",
    answer: "I created this website to help women with textured hair determine the best time to get a silk press. Managing textured hair can be challenging, especially with varying weather conditions. This website aims to provide the necessary information to make informed decisions about hair care, particularly when it comes to achieving the perfect silk press."
  },
  {
    question: "Key Points About Weather and Hair Styling",
    answer: "Understanding the relationship between weather, dew points, and hair styling is crucial for maintaining healthy and beautiful textured hair. Here are some key points: Dew Points, Humectants, Weather Impact, and Product Selection."
  },
];

const About: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-montserrat mb-6 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
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
  );
};

export default About;
