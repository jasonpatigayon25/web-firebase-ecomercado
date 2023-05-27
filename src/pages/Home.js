import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 20000);

    return () => clearTimeout(fadeOutTimeout);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="homepage">
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "linear-gradient(to right, #9DC88D, #05652D)" }}>
        <img src={process.env.PUBLIC_URL + "/AppLogo.png"} width="240" height="60" className="d-inline-block align-top" alt="Logo" style={{ marginLeft: "50px" }} />

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
                <Link className="nav-link">Change Password</Link>
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

      {showWelcomeMessage && <h1 className="welcome-message" style={{ color: '#05652D' }}>Hello {location.state?.id} and welcome to ECOMercado!</h1>}

      <div className="card">
        <div className="card-body">
          <div className="carousel-wrapper">
            <h2 className="sale-alert" style={{ color: '#05652D' , textAlign: "center"}}>HUGE SALE ALERT</h2>
            <Carousel showThumbs={false} autoPlay>
              <div>
                <img src="Sale1.jpg" alt="Sale 1" height="600" width="800" />
                <p className="sale-label" style={{ color: '#05652D' }}>It is 60% off than the original</p>
              </div>
              <div>
                <img src="Sale2.jpg" alt="Sale 2" height="600" width="800" />
                <p className="sale-label" style={{ color: '#05652D' }}>It is 70% off than the original</p>
              </div>
              <div>
                <img src="Sale3.jpg" alt="Sale 3" height="600" width="800" />
                <p className="sale-label" style={{ color: '#05652D' }}>It is 50% off than the original</p>
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      <div className="recommendation-wrapper">
      <h2 className="recommendation-title" style={{ color: "#05652D", textAlign: "center" }}>
      RECOMMENDED FOR YOU
      </h2>
      <div className="recommendation-images" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div className="recommendation-images" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
  <div className="recommendation-item" style={{ margin: "10px", textAlign: "center" }}>
    <img src="shoes.png" alt="Shoes" style={{ width: "180px", height: "120px" }} />
    <p className="recommendation-label" style={{ color: "#05652D", fontSize: "16px", marginTop: "10px" }}>Shoes</p>
  </div>
  <div className="recommendation-item" style={{ margin: "10px", textAlign: "center" }}>
    <img src="artworks.png" alt="Artworks" style={{ width: "180px", height: "120px" }} />
    <p className="recommendation-label" style={{ color: "#05652D", fontSize: "16px", marginTop: "10px" }}>Artworks</p>
  </div>
  <div className="recommendation-item" style={{ margin: "10px", textAlign: "center" }}>
    <img src="homedecors.png" alt="Home Decors" style={{ width: "180px", height: "120px" }} />
    <p className="recommendation-label" style={{ color: "#05652D", fontSize: "16px", marginTop: "10px" }}>Home Decors</p>
  </div>
  <div className="recommendation-item" style={{ margin: "10px", textAlign: "center" }}>
    <img src="collectibles.png" alt="Collectibles" style={{ width: "180px", height: "120px" }} />
    <p className="recommendation-label" style={{ color: "#05652D", fontSize: "16px", marginTop: "10px" }}>Collectibles</p>
  </div>
  <div className="recommendation-item" style={{ margin: "10px", textAlign: "center" }}>
    <img src="furnitures.png" alt="Furnitures" style={{ width: "180px", height: "120px" }} />
    <p className="recommendation-label" style={{ color: "#05652D", fontSize: "16px", marginTop: "10px" }}>Furnitures</p>
  </div>
</div>
          </div>
          </div>
        </div>
      );
    }
    
    export default Home;