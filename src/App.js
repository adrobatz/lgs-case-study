import React, { Component } from 'react';
import Navbar from './Navbar'
import './App.css';
import {Link} from 'react-router-dom';


class App extends Component {
      constructor(){
        super();
        this.state = {
          products: [],
          offset: 0,
          limit: 48,
          total: 0,
          firstPage: false,
          pages: []
        }
        this.back = this.back.bind(this)
        this.next = this.next.bind(this)
        this.fetchProducts = this.fetchProducts.bind(this)
        this.changePageNumbers = this.changePageNumbers.bind(this)
      }

      componentDidMount(){
        if (this.props.match.params.productPage){
          this.setState({offset: (Number(this.props.match.params.productPage) - 1) * this.state.limit})
        this.fetchProducts()
        }
      }

      componentDidUpdate(prevProps, prevState) {
        if (prevState.offset !== this.state.offset){
          this.fetchProducts()
          window.scrollTo(0, 0)
        }
      }

      fetchProducts(){
        fetch(`https://api-dev.luxurygaragesale.com/v1/products/?offset=${this.state.offset}&limit=${this.state.limit}`)
          .then(response =>{
            return response.json()
          })
          .then(products =>{
            var totalPages = products.total / this.state.limit
            var pageArr = []
            for (var i = 0; i < totalPages; i++){
              pageArr.push(i)
            }
            this.setState({pages: pageArr})
            var productArr = []
            products.hits.map(product =>{
              productArr.push({
                  id: product._id,
                  size: product._source.brandSize,
                  designer: product._source.designer,
                  price: product._source.price,
                  name: product._source.name,
                  sku: product._source.sku
                })
              this.setState({products: productArr})
            })
          })
          .catch(err =>{
            console.error(err)
          })
      }

      back(){
        var decrementedOffset = this.state.offset - this.state.limit
        this.setState({offset: decrementedOffset})
      }

      next(){
        var incrementedOffset = this.state.offset + this.state.limit
        this.setState({offset: incrementedOffset})
      }

      changePageNumbers(event){
        if (event.target.value){
          console.log(typeof event.target.value)
          var newOffset = (event.target.value - 1) * this.state.limit
          this.setState({offset: newOffset})
        }
      }

      render() {
        var totalProducts = this.state.products
        var lastPage = this.state.offset === 0
        return (
                <div>
                <Navbar />
                <div className="all-products">
                {
                  totalProducts.map(product =>{
                      return(
                             <div className="individual-product" key={product.id}>
                             <img src={`https://photos.luxurygaragesale.com/small/${product.sku}_1.jpg`} alt="product img"/>
                             <h4>{product.designer}</h4>
                             <h3>{product.name}</h3>
                             <p>{product.size}</p>
                             <p>${product.price}.00</p>
                             </div>
                             )
                  })
                }
                </div>
                <div className="page-numbers">
                <ul>
                <li><button disabled={lastPage} onClick={this.back}>back</button></li>
                {
                  this.state.pages.map(page =>{
                    return(
                           <li key={page}>
                           <a href={`/${page}`} onClick={this.changePageNumbers}>{page}</a>
                           </li>
                           )
                  })
                }
                <li><button onClick={this.next}>next</button></li>
                </ul>
                </div>
                </div>
                );
      }
    }

    export default App;
