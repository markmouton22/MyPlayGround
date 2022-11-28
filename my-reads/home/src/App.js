import React, { Component } from 'react';
import MainComponent from './MainComponent';
import SearchBar from './SearchBar';
import './App.css'
import {Route} from  'react-router-dom';
import  {BrowserRouter} from "react-router-dom";
import * as BooksAPI from './BooksAPI';

class BooksApp extends  Component {
  
state = {}

componentWillMount() {
   this.getAll();
}

 getAll(){
     BooksAPI.getAll()
    .then(res =>  this.setState(...[{ data: JSON.stringify(res)}]));
}

render() {

    if(this.state.data && this.state.data.length > 0){
    return (

    <BrowserRouter>
     <div className="app">
     
     <Route exact path="/">
     <MainComponent data={this.state.data} /> 
     </Route>
     
     <Route path="/search">
     <SearchBar data={this.state.data} /> 
     </Route>
     
     </div>
    </BrowserRouter>
  
);
} else return null;
}
}
export default BooksApp