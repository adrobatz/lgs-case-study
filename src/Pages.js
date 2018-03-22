import React, { Component } from 'react';
import {Link} from 'react-router-dom';

//CATEGORY PAGE - NO DETAILS
class Pages extends Component {
  constructor(){
    super();
    this.state = {
      offset: 0,
      limit: 10,
      nextPage: 1,
      previousPage: null
      }
    this.next = this.next.bind(this)

  }

  next(){
    var nextPage = Number(this.props.match.params.productPage) + 1
    this.setState({nextPage})
    return this.props.history.push(nextPage)
  }

  render() {
console.log("pages props", this.props)
    return (
      <div>

        <Link to={this.state.nextPage} onClick={this.next}>next</Link>
      </div>
    );
  }
}

export default Pages;
