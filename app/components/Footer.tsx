import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-[-25px] text-white py-4 relative bottom-0">
      <div className="container mx-auto text-center">
        <p className='font-montserrat'>&copy; {new Date().getFullYear()} <span className='font-playwrite'>silke</span>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
