import "../App.css";

function Navbar() {

  return (
    <nav className="navbar">

      <h2>Indian Stock Tracker</h2>

      <ul>
        <li>Home</li>

        <li>Market</li>

        <li>
          <a href="#watchlist">
            Watchlist
          </a>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;