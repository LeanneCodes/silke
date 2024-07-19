import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <div>
        <Link href="/">Home</Link>
        <Link href="/dashboard" style={{ marginLeft: '15px' }}>Dashboard</Link>
        <Link href="/saved-cities" style={{ marginLeft: '15px' }}>Saved Cities</Link>
        <Link href="/reminders" style={{ marginLeft: '15px' }}>Reminders</Link>
        <Link href="/account" style={{ marginLeft: '15px' }}>Account</Link>
      </div>
    </nav>
  );
};

export default Navbar;
