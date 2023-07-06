import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Footer from '../footer/Footer';
import '../css/Wishlist.css';
import { BsPersonFill } from 'react-icons/bs';
import '../css/Navbar.css';
import { FaUser } from 'react-icons/fa';

const Wishlist = () => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Wishlist 1',
      price: 'Php 110.00',
      image: 'wishlist1.jpg',
      stockStatus: 'In Stock'
    },
    {
      id: 2,
      name: 'Wishlist 2',
      price: 'Php 120.00',
      image: 'wishlist2.jpg',
      stockStatus: 'Out of Stock'
    },
    {
        id: 3,
        name: 'Wishlist 3',
        price: 'Php 120.00',
        image: 'wishlist2.jpg',
        stockStatus: 'Available'
    },
    {
        id: 4,
        name: 'Wishlist 4',
        price: 'Php 120.00',
        image: 'wishlist2.jpg',
        stockStatus: 'Available'
    },
    {
        id: 5,
        name: 'Wishlist 5',
        price: 'Php 120.00',
        image: 'wishlist2.jpg',
        stockStatus: 'Available'
    },
    {
        id: 6,
        name: 'Wishlist 6',
        price: 'Php 120.00',
        image: 'wishlist2.jpg',
        stockStatus: 'Available'
    },
    // Sample Wishlists
  ]);

  const handleRemoveItem = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
  };


  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };


  return (
    <div className="wishlist">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: '#E3FCE9' }}>
      <Link to="/home">
        <img
          src={process.env.PUBLIC_URL + '/ecomercado-logo.png'}
          className="navbar-logo d-inline-block align-top"
          alt="Logo"
        />
        </Link>
        <div className="container">
          <form className="d-flex justify-content-center" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '600px', borderColor: '#05652D' }}
            />
            <button className="btn" type="submit" style={{ borderColor: '#05652D' }}>
              <img
                src={process.env.PUBLIC_URL + '/search-icon.png'}
                alt="Search"
                className="nav-icon"
                style={{
                  transform: hoveredIndex === 4 ? 'scale(1.1)' : 'scale(1)',
                }}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              />
            </button>
          </form>
          <button className="btn" type="submit" style={{ borderColor: 'transparent' }}>
            <Link to="/shopping-cart">
              <img
                src={process.env.PUBLIC_URL + '/shopping-cart.png'}
                alt="Cart"
                className="nav-icon"
                style={{
                  transform: hoveredIndex === 3 ? 'scale(1.1)' : 'scale(1)',
                }}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              />
            </Link>
          </button>
          <div className="d-flex justify-content-end align-items-center w-100">
            <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + '/home.png'}
                      alt="Home"
                      className="nav-icon"
                      style={{
                        transform: hoveredIndex === 0 ? 'scale(1.1)' : 'scale(1)',
                      }}
                      onMouseEnter={() => handleMouseEnter(0)}
                      onMouseLeave={handleMouseLeave}
                    />
                    Home
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + '/notification.png'}
                      alt="notif"
                      className="nav-icon"
                      style={{
                        transform: hoveredIndex === 1 ? 'scale(1.1)' : 'scale(1)',
                      }}
                      onMouseEnter={() => handleMouseEnter(1)}
                      onMouseLeave={handleMouseLeave}
                    />
                    Notification
                  </div>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Dropdown>
                  <Dropdown.Toggle
                    className="nav-link user-icon"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <FaUser
                        className='user-style'
                        style={{
                          fontSize:'24px',
                          transform: hoveredIndex === 2 ? 'scale(1.1)' : 'scale(1)',
                        }}
                        onMouseEnter={() => handleMouseEnter(2)}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item disabled>
                      <BsPersonFill size={16} color="#6c757d" style={{ marginRight: '5px' }} />
                      {location.state?.id}
                    </Dropdown.Item>
                    <Dropdown.Item href="/change-account">Change Account</Dropdown.Item>
                    <Dropdown.Item href="/change-password">Change Password</Dropdown.Item>
                    <Dropdown.Item href="/language">Language</Dropdown.Item>
                    <Dropdown.Item href="/help">Help</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="cart-wrap">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="main-heading mb-10">My Wishlist</div>
            <div className="table-wishlist">
              <table className="table" width="100%">
                <thead>
                  <tr>
                    <th width="40%">Product Name</th>
                    <th width="15%">Price</th>
                    <th width="15%">Status</th>
                    <th width="15%"></th>
                    <th width="15%"></th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item, index) => (
                    <tr key={item.id}>
                      <td width="40%">
                        <div className="d-flex align-items-center">
                          <div className="img-product">
                            <img
                              src={`${process.env.PUBLIC_URL}wishlist${index + 1}.jpg`}
                              alt=""
                              className="img-fluid md-4 shadow"
                              style={{ width: '100px', height: '100px', borderRadius: '10px' }}
                            />
                          </div>
                          <div className="name-product">
                            {item.name}
                          </div>
                        </div>
                      </td>
                      <td width="15%" className="price">{item.price}</td>
                      <td width="15%">
                        <span
                          className={
                            item.stockStatus === 'Out of Stock' ? 'out-of-stock-box' : 'in-stock-box'
                          }
                        >
                          {item.stockStatus}
                        </span>
                      </td>
                      <td width="15%">
                        <button
                          className="btn btn-primary"
                          style={{
                            backgroundColor: '#05652D',
                          }}
                        >
                          Add to Cart
                        </button>
                      </td>
                      <td width="15%" className="text-right">
                        <button
                          className="remove-button"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>


      <Footer />
    </div>
  );
};

export default Wishlist;
