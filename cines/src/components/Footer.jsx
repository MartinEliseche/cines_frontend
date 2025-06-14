import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light mt-5 py-3">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <i className="bi bi-file-code-fill me-2 footer-icon"></i>
          <span className="footer-text">Desarrollado por Martín Eliseche</span>
        </div>
        <a
          href="https://github.com/MartinEliseche"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link d-flex align-items-center"
        >
          <i className="bi bi-github me-2 footer-icon"></i> GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
