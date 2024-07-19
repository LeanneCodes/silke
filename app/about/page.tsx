// pages/about.tsx
import React from 'react';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-montserrat mb-6 text-center">About Us</h1>
      <div className="prose mx-auto">
        <h2 className="text-2xl font-bold">Why I Created This Website</h2>
        <p>
          I created this website to help women with textured hair determine the best time to get a silk press. Managing textured hair can be challenging, especially with varying weather conditions. This website aims to provide the necessary information to make informed decisions about hair care, particularly when it comes to achieving the perfect silk press.
        </p>
        
        <h2 className="text-2xl font-bold">Key Points About Weather and Hair Styling</h2>
        <p>
          Understanding the relationship between weather, dew points, and hair styling is crucial for maintaining healthy and beautiful textured hair. Here are some key points based on the <Link href="https://holisticenchilada.com/curly-girl-guide-weather-styling-dew-points-humectants/">Curly Girl Guide to Weather Styling, Dew Points, and Humectants</Link>:
        </p>
        <ul>
          <li>
            <strong>Dew Points:</strong> Dew point is the temperature at which air becomes saturated with moisture. For curly and textured hair, the dew point is more important than humidity levels. Dew points between 40°F and 60°F are ideal for hair styling.
          </li>
          <li>
            <strong>Humectants:</strong> Humectants are ingredients that attract moisture from the environment into the hair. In high dew points, humectants can make hair frizzy, while in low dew points, they can dry out the hair. Choosing the right products based on the dew point is essential.
          </li>
          <li>
            <strong>Weather Impact:</strong> Weather conditions affect hair health and styling. High humidity and high dew points can cause frizz and loss of definition, while low humidity and low dew points can lead to dryness and breakage.
          </li>
          <li>
            <strong>Product Selection:</strong> Using products that align with the current dew point and weather conditions can help maintain the desired hairstyle and keep hair healthy. This includes choosing the right types of humectants and anti-humectants.
          </li>
        </ul>
        <p>
          By understanding these factors, you can make better decisions about when to get a silk press and how to care for your textured hair in various weather conditions.
        </p>
      </div>
      <div className="text-center mt-6">
        <Link href="/">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default About;
