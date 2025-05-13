import React from 'react';
import  './Footer.css'; // Import your CSS file 
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">copyrights&copy;<span style={{color:'#1abc9c'}}>Tawfik</span></p>
        
        <p className="footer__text">
          Follow me on{' '}
          <Link to="https://www.linkedin.com/in/tawfik-mohamed-b629a4245/" className="footer__link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </Link>{' '}
          and{' '}
          <Link to="https://github.com/TawfikMohamed040" className="footer__link" target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
