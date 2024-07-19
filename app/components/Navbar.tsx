import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <div>
        <Link href="/">Home</Link>
        <Link href="/reminders" style={{ marginLeft: '15px' }}>Reminders</Link>
      </div>
      <div>
        {/* Placeholder for future authentication buttons */}
      </div>
    </nav>
  );
};

export default Navbar;
