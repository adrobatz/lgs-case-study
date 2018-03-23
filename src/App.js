import React, { Component } from 'react';
import Navbar from './Navbar'
import './App.css';


class App extends Component {
      constructor(){
        super();
        this.state = {
          products: [],
          offset: 0,
          limit: 48,
          total: 0,
          active: false,
          pages: []
        }
        this.back = this.back.bind(this)
        this.next = this.next.bind(this)
        this.fetchProducts = this.fetchProducts.bind(this)
        this.changePageNumbers = this.changePageNumbers.bind(this)
      }

      componentDidMount(){
        if (this.props.match.params.productPage){
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
        var fetchOffset = (Number(this.props.match.params.productPage) - 1) * this.state.limit
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
            var productArr = []
            products.hits.map(product =>{
              return productArr.push({
                  id: product._id,
                  size: product._source.brandSize,
                  designer: product._source.designer,
                  price: product._source.price,
                  name: product._source.name,
                  sku: product._source.sku
                })
            })
            this.setState({products: productArr, pages: pageArr, total: products.total, offset: fetchOffset})
          })
          .catch(err =>{
            console.error(err)
          })
      }

      back(){
        var decrementedOffset = this.state.offset - this.state.limit
        var previousPage = Number(this.props.match.params.productPage) - 1
        this.setState({offset: decrementedOffset})
        this.props.history.push(`/${previousPage}`)
      }

      next(){
        var incrementedOffset = this.state.offset + this.state.limit
        var nextPage = Number(this.props.match.params.productPage) + 1
        this.setState({offset: incrementedOffset})
        this.props.history.push(`/${nextPage}`)
      }

      changePageNumbers(event){
        if (event.target.value){
          var newOffset = (event.target.value - 1) * this.state.limit
          this.setState({offset: newOffset})
        }
      }

      render() {
        var totalProducts = this.state.products
        var {pages} = this.state
        var lastPage = this.state.offset === 0
        var currentPage = Number(this.props.match.params.productPage)
        var displayPages = []
        if (currentPage <= 5){
          displayPages = pages.slice(1,6)
        } else {
          displayPages = pages.slice((currentPage - 2), (currentPage + 3))
        }
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
                <li><button disabled={lastPage} onClick={this.back}>{`< Previous`}</button></li>
                {!(currentPage >= 1 && currentPage < 7) &&
                  <li><a href={`/1`} onClick={this.changePageNumbers}>{1}</a>  ...</li>
                }
                {
                  displayPages.map(page =>{
                    return(
                           <li key={page}>
                           {currentPage === page ? (
                                <a href={`/${page}`} onClick={this.changePageNumbers} className="active">{page}</a>
                                ) : (
                                <a href={`/${page}`} onClick={this.changePageNumbers} className="in-active">{page}</a>
                                )
                            }
                           </li>
                           )
                  })
                }
                {!(currentPage <= pages[pages.length-1] && currentPage >= pages[pages.length-5]) &&
                  <li>...  <a href={`/${pages[pages.length-1]}`} onClick={this.changePageNumbers}>{pages[pages.length-1]}</a></li>
                }

                <li><button onClick={this.next}>{`Next >`}</button></li>

                </ul>
                <p className="total-pages">{this.state.total} total products</p>
                </div>
                </div>
                );
      }
    }

    export default App;
