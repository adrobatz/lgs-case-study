import React, { Component } from 'react';
import './App.css';


//CATEGORY PAGE - NO DETAILS
class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      categories: []
      }

  }



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
