import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';

class BooksGrid extends Component {

constructor(props) {
super(props);
this.state = {
  data:[]
}
}
  
componentWillMount() {
  BooksAPI.getAll()
 .then(res =>  this.setState(...[{ data: JSON.stringify(res)}]));
}
  
async handleBookUpdate(book,event) {
   BooksAPI.update(book,event.target.value).then(BooksAPI.getAll()
 .then(res =>  this.setState(...[{ data: JSON.stringify(res)}])));
}
   

shelfBuilder(shelfName) {

 let  bookFilter=[];
 
     if(this.state.data && this.state.data.length > 0) {
         var jsonData = JSON.parse(this.state.data);

         bookFilter =  jsonData.filter(function (book) {
         return book.shelf === shelfName;
       });
    }
     
   return bookFilter.map((book) => {
    var imgLink = book.imageLinks.thumbnail;
    var authorsString = "";
    
    if( book &&  book.authors){
      
          book.authors.forEach((author, index) => { 
          authorsString = index > 0 ? authorsString.concat(" , "+author.toString()) : authorsString.concat(author.toString());
          });
    }
   if (imgLink !==""  && book && book.title && book.authors && authorsString!=="" )
  {
 return (
      
       <li key={book.id}>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128,height:193,backgroundImage:`url(${imgLink})`}}></div>
                
                <div className="book-shelf-changer">
                    <select onChange={(evt) => this.handleBookUpdate(book,evt)} defaultValue={shelfName}  >
                        <option key="currentlyReading" value="currentlyReading">Currently Reading</option>
                        <option key="wantToRead" value="wantToRead">Want to Read</option>
                        <option key="read" value="read">Read</option>
                        <option key="none" value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{authorsString}</div>
        </div>
    </li>
  
    ) //ListEnd
    }else return null;
   });
  
   }

 render(){
    return ( 
            <div className="list-books-content">
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                 <ol className="books-grid">
                   {this.shelfBuilder("currentlyReading")}
                 </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid">  
                     {this.shelfBuilder("wantToRead")}
                  </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                   <ol className="books-grid">  
                     {this.shelfBuilder("read")}
                   </ol>
                  </div>
                </div>
                         
          </div>
    
    );
}
}

export default BooksGrid;