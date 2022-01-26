import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', url: '/auth/signup' },
    !currentUser && { label: 'Sign In', url: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', url: '/tickets/new' },
    currentUser && { label: 'My Orders', url: '/orders' },
    currentUser && { label: 'Sign Out', url: '/auth/signout' },
  ]
    .filter((link) => link)
    .map(({ label, url }) => {
      return (
        <li key={url} className="nav-item">
          <Link href={url}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link href="/">
        <a className="navbar-brand">Ticketing</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
