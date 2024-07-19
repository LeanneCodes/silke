import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-primary text-white py-4 absolute bottom-0">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} <span className='font-playwrite'>silke</span>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
