import React from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  return (
    <div className="homepage">
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(to right, #9DC88D, #05652D)' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={process.env.PUBLIC_URL + '/AppLogo.png'} width="240" height="60" className="d-inline-block align-top" alt="Logo" />
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Registration
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <h1>Hello {location.state?.id} and welcome to ECOMercado!</h1>
    </div>
  );
}

export default Home;