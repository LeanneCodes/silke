import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='flex justify-between px-20 py-8 z-50'>
      <div className='flex justify-between w-full align-middle'>
        <div>
          <h1 className='font-playwrite text-3xl'>
            <Link href="/">
              silke
            </Link>
          </h1>
        </div>
        <div>
          <Link href="/" className='font-montserrat'>Home</Link>
          <Link href="/faqs" style={{ marginLeft: '15px' }} className='font-montserrat'>FAQs</Link>
          <Link href="/dashboard" style={{ marginLeft: '15px' }} className='font-montserrat'>Dashboard</Link>
          <Link href="/saved-cities" style={{ marginLeft: '15px' }} className='font-montserrat'>Saved Cities</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
