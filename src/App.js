import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
//CATEGORY PAGE - NO DETAILS
class App extends Component {
  constructor(){
    super();
    this.state = {
      products: []
      }

  }
  componentDidMount(){
    fetch('https://api-dev.luxurygaragesale.com/v1/products/')
    .then(response =>{
      return response.json()
    })
    .then(products =>{
      return products.hits.map(product =>{
        return this.setState({
          products: [...this.state.products, {
            id: product._id,
            size: product._source.brandSize,
            designer: product._source.designer,
            price: product._source.price,
            name: product._source.name,
            sku: product._source.sku
          }]
        })
      })
    })
      .catch(err =>{
        console.error(err)
      })
  }

  render() {
    let products = this.state.products
    return (
      <div>
        {
          products.map(product =>{
            return(
            <div key={product.id}>
            <img src={`https://photos.luxurygaragesale.com/medium/${product.sku}_1.jpg`} alt="product img"/>
            <h3>{product.name}</h3>
            <h4>{product.designer}</h4>
            <p>{product.size}</p>
            <p>${product.price}.00</p>
            </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
