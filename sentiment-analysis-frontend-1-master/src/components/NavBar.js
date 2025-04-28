import React, {Component} from 'react';
import '../styles/NavBar.css';
// import logo from '../images/white-hunter-logo.png';


const navbar = props => (
  <header className="navBarContainer">
    <nav className="myNavBar">
        <ul className="navBarLinks">
          <li><a href="/">Home</a></li>
          <li><a href="/sentiments">Sentiment Types</a></li>
          <li><a href="/about">About Us</a></li>
        </ul>
    </nav>
  </header>
);


export default navbar;