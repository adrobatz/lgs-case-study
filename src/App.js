import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';

//CATEGORY PAGE - NO DETAILS
class App extends Component {
  constructor(){
    super();
    this.state = {
      products: [],
      offset: 0,
      limit: 10
      }
    this.handleClick = this.handleClick.bind(this)
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

  handleClick(event){
    console.log(this.props.match.params.productPage)
    event.preventDefault();
    this.setState({offset: (event.target.value - 1) * this.state.limit})
  }

  render() {

//offset = (pageNumber - 1) * limit
    //display page numbers
    var {limit, offset} = this.state
    var totalProducts = this.state.products
    var productsPerPage = []
    var pageNumbers = []
    var pageCounter = 0
    var currentPage = this.props.match.params.productPage
    for (var i = 0; i < totalProducts.length; i++){
      if (i % limit === 0){
        pageCounter++
        pageNumbers.push(pageCounter)
      }
    }
    return (
      <div>
      <h1>this is page {currentPage}</h1>
        {
          totalProducts.map(product =>{
            if (totalProducts.indexOf(product) >= ((currentPage - 1) * limit) && totalProducts.indexOf(product) <= (limit*currentPage)){
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
                      <li key={page}>
                      <Link to={`/${page}`}>{page}</Link>
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
