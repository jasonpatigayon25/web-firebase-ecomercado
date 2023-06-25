import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3" style={{ background: "transparent" }}>
      <div className="container text-center">
        <span className="text-muted">
          &copy; 2023 ECOMercado. All rights reserved. |{" "}
          <Link to="/terms">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
