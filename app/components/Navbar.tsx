'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-primary text-white w-full z-50'>
      <div className='flex justify-between items-center px-5 py-4 md:px-20'>
        <div>
          <h1 className='font-playwrite text-3xl'>
            <Link href="/">
              silke
            </Link>
          </h1>
        </div>
        <div className='hidden md:flex space-x-6'>
          <Link href="/" className='font-montserrat hover:text-mustard'>Home</Link>
          <Link href="/faqs" className='font-montserrat hover:text-mustard'>FAQs</Link>
          <Link href="/dashboard" className='font-montserrat hover:text-mustard'>Dashboard</Link>
          <Link href="/saved-cities" className='font-montserrat hover:text-mustard'>Saved Cities</Link>
          {/* <Link href="/reminder" className='font-montserrat hover:text-mustard'>Appointment Reminder</Link> */}
        </div>
        <div className='md:hidden'>
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden text-white'>
          <Link href="/" className='block px-5 py-2 font-montserrat hover:text-mustard' onClick={toggleMenu}>Home</Link>
          <Link href="/faqs" className='block px-5 py-2 font-montserrat hover:text-mustard' onClick={toggleMenu}>FAQs</Link>
          <Link href="/dashboard" className='block px-5 py-2 font-montserrat hover:text-mustard' onClick={toggleMenu}>Dashboard</Link>
          <Link href="/saved-cities" className='block px-5 py-2 font-montserrat hover:text-mustard' onClick={toggleMenu}>Saved Cities</Link>
          {/* <Link href="/reminder" className='block px-5 py-2 font-montserrat hover:text-mustard'>Appointment Reminder</Link> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
