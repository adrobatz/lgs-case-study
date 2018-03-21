import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

//CATEGORY PAGE - NO DETAILS
class App extends Component {
  constructor(){
    super();
    this.state = {
      products: [],
      offset: 1,
      limit: 10
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

    //display page numbers
    var {limit, offset} = this.state
    var products = this.state.products
    var pageNumbers = []
    var pageCounter = 0
    var currentPage = this.props.match.params.currentPage
    for (var i = 0; i < products.length; i++){
      if (i % limit === 0){
        pageCounter++
        pageNumbers.push(pageCounter)
      }
    }

    return (
      <div>
      <h1>this is page {currentPage}</h1>
        {
          products.map(product =>{
            if (products.indexOf(product) >= offset && products.indexOf(product) <= (limit*currentPage)){
            console.log("product on page", products.indexOf(product))
            return(
            <div key={product.id}>
            <img src={`https://photos.luxurygaragesale.com/small/${product.sku}_1.jpg`} alt="product img"/>
            <h3>{product.name}</h3>
            <h4>{product.designer}</h4>
            <p>{product.size}</p>
            <p>${product.price}.00</p>
            </div>
            )
            }
          })
        }
        <div className="pageNumbers">
          <ul>
            {
            pageNumbers.map(page =>{
              return(
                      <li ley={page}>
                      <a href = {page}>{page}</a>
                      </li>
                     )
            })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
