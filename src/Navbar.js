import React, { Component } from 'react';
import './App.css';

class Navbar extends Component {

  render() {

    return (
      <div className="navbar">
      <div className="navbar-logo">
        <img className="logo" src="/LGS_logo.png" alt="logo"/>
        </div>
        <ul className="categories">
          <li>Clothing</li>
          <li>Bags</li>
          <li>Shoes</li>
          <li>Accessories</li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
