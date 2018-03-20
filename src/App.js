import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//CATEGORY PAGE - NO DETAILS
class App extends Component {
  constructor(){
    super();
    this.state = {
      products: [{
        id: '',
        size: '',
        designer: '',
        price: 0,
        name: ''
      }]
      }

  }
  componentDidMount(){
    fetch('https://api-dev.luxurygaragesale.com/v1/products/')
    .then(response =>{
      return response.json()
    })
    .then(products =>{
      products.hits.map(product =>{
        this.setState({
          products: [...this.state.products, {
            id: product._id,
            size: product._source.brandSize,
            designer: product._source.designer,
            price: product._source.price,
            name: product._source.name,
          }]
        })
      })
    })
      .catch(err =>{
        console.error(err)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
