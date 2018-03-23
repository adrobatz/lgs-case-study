import React, { Component } from 'react';
import Navbar from './Navbar'
import './App.css';
import {Link} from 'react-router-dom';

//CATEGORY PAGE - NO DETAILS
class App extends Component {
  constructor(){
    super();
    this.state = {
      products: [],
      limit: 10,
      firstPage: false
    }
    this.back = this.back.bind(this)
    this.next = this.next.bind(this)
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

      back(){
        if (this.props.match.params.productPage === 1){
          this.setState({firstPage: true})
        } else if (this.props.match.params.productPage > 1){
          var previousPage = Number(this.props.match.params.productPage) - 1
          this.props.history.push(`/${previousPage}`)
          this.setState({firstPage: false})
        }
      }

      next(){
        var nextPage = Number(this.props.match.params.productPage) + 1
        this.props.history.push(`/${nextPage}`)
      }

      render() {

        var {limit} = this.state
        var totalProducts = this.state.products
        var currentPage = this.props.match.params.productPage
        var pageNumbers = []
        var pageCounter = 0

        for (var i = 0; i < totalProducts.length; i++){
          if (i % limit === 0){
            pageCounter++
            pageNumbers.push(pageCounter)
          }
        }
        var lastPage = pageNumbers[pageNumbers.length-1] === Number(this.props.match.params.productPage)
        return (
                <div>
                <Navbar />
                <div className="all-products">
                {
                  totalProducts.map(product =>{
                    if (totalProducts.indexOf(product) >= ((currentPage - 1) * limit) && totalProducts.indexOf(product) <= ((limit*currentPage) - 1)){
                      return(
                             <div className="individual-product" key={product.id}>
                             <img src={`https://photos.luxurygaragesale.com/small/${product.sku}_1.jpg`} alt="product img"/>
                             <h4>{product.designer}</h4>
                             <h3>{product.name}</h3>
                             <p>{product.size}</p>
                             <p>${product.price}.00</p>
                             </div>
                             )
                    }
                  })
                }
                </div>
                <div className="page-numbers">
                <ul>
                <li><button disabled={this.state.firstPage} onClick={this.back}>back</button></li>
                {
                  pageNumbers.map(page =>{
                    return(
                           <li key={page}>
                           <Link to={`/${page}`}>{page}</Link>
                           </li>
                           )
                  })
                }
                <li><button disabled={lastPage} onClick={this.next}>next</button></li>
                </ul>
                </div>
                </div>
                );
      }
    }

    export default App;
