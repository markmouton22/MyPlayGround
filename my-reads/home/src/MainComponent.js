import React, { Component } from 'react';
import BooksGrid from './BooksGrid';
import './App.css';
import {Link} from "react-router-dom";

class MainComponent extends Component {

constructor(props) {
super(props);
this.state = {data:[]}}

 
render(){
return (
<div>      
<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
           <BooksGrid data={this.props.data} />
            <div className="open-search">
           <Link to="/search" >Add a book</Link>
</div>
</div>
 </div>         
);
}
}
export default MainComponent;