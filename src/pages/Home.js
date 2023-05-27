import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="homepage">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "linear-gradient(to right, #9DC88D, #05652D)" }}
      >
          <img
            src={process.env.PUBLIC_URL + "/AppLogo.png"}
            width="240"
            height="60"
            className="d-inline-block align-top"
            alt="Logo"
            style={{ marginLeft: "50px" }}
          />
        
        <div className="container">
          <form className="d-flex justify-content-center" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "800px" }}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>

          <div className="d-flex justify-content-end align-items-center w-100">
            <ul className="navbar-nav flex-row">
                  <li className="nav-item">
                  <Link className="nav-link" to="/Profile">
                      Change Password
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Logout
                    </Link>
                  </li>
            </ul>
          </div>
        </div>
      </nav>

      <h1>Hello {location.state?.id} and welcome to ECOMercado!</h1>
    </div>
  );
}

export default Home;