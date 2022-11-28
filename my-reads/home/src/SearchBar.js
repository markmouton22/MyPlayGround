import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Link} from "react-router-dom";

class SearchBar extends Component {

constructor(props) {
super(props);
 this.tempArr = [];

this.state = {
  searchQuery :'',
  searchData:[],
  data:[]
}

 this.onSearchChange =this.onSearchChange.bind(this);
 this.handleBookUpdate =this.handleBookUpdate.bind(this);
}
   
 async  onSearchChange(event){
  
const query = event.target.value;

  this.setState(...[{ searchQuery: query}]);
   if(query && query !==""  ) {

    this.setState(...[{ searchData: []}]);
   
     await  this.setSearchData(query);
     }else{
     await this.setState(...[{ searchData: []}]);
   }
  }

async setSearchData(searchQuery,isUpdate) {
  var data = this.props.data;
  if(isUpdate){
    
   await  BooksAPI.getAll()
   .then(res =>  data = JSON.stringify(res) );
  }
  
await this.setState(...[{ searchData: []}]);
  if(searchQuery.length  > 0 ) {
   await BooksAPI.search(searchQuery,20).then((res) => {
    
    if(data && res && Array.isArray(res)){
      this.setState(...[{ searchData: []}]);
        
        res.forEach((book) => { 
          var jsonData = JSON.parse(data);
          
          var  getBook =  jsonData.filter(function (data) {
          return data.id === book.id;
       });
     
          if(getBook.length > 0){
            
            var getData = this.state.searchData;   
            getData.push(getBook[0]);   
              if(typeof getData !== "undefined" && getData !== null){
               this.setState(...[{ searchData:getData }]);
            }
              
            }else{
                book.shelf ='none'
                var searchValue = this.state.searchData;   
                searchValue.push(book);  
                 if(typeof searchValue !== "undefined" && searchValue !== null){
                   this.setState(...[{ searchData:searchValue }]);
              }
            }
        }
       );
    }

  });

}
}

 async handleBookUpdate(book,event) {
   BooksAPI.update(book,event.target.value).then(this.setSearchData(this.state.searchQuery,true));
}
 
shelfBuilder(shelfName) {
     
 if(this.state.searchData && this.state.searchData.length > 0) {
         
   var  bookFilter =  this.state.searchData.filter(function (book) {
      if(book){ return book.shelf === shelfName;} else{ return null;}
    });
 }

 try {
      if(this.state.searchData && this.state.searchData.length > 0) { return bookFilter.map((book) => {
      var imgLink ="";
       book && book.imageLinks && book.imageLinks.thumbnail ? imgLink = book.imageLinks.thumbnail : imgLink = "";
       var authorsString = "";
       if(book &&  book.authors){
      
        book.authors.forEach((author, index) => { 
        authorsString = index > 0 ? authorsString.concat(" , "+author.toString()) : authorsString.concat(author.toString());
        });
  }
     if (imgLink !==""  && book && book.title && book.authors && authorsString!=="" )
     {
        return (
        <ol className="books-grid" key={book.id} value={book.title}>
           <li>
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
        </ol>
      
        ); //ListEnd
       }else return null;
       });}else return (<h3>The shelf is empty :( Please use the searchbar to search :)</h3>);
    } catch (error) {
      console.log(error);
    }
   }

   render(){
    return ( 
      <div>
       <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.onSearchChange} />
              </div>
         </div>
             <br />
             <br />
             <br />
        </div>

     <div className="list-books-content">
                <div className="bookshelf">

                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                   {this.shelfBuilder("currentlyReading")}
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                     {this.shelfBuilder("wantToRead")}
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                     {this.shelfBuilder("read")}
                  </div>
                </div>
                 <div className="bookshelf">
                  <h2 className="bookshelf-title">None</h2>
                  <div className="bookshelf-books">
                     {this.shelfBuilder("none")}
                  </div>
                </div>
     
          </div>

</div>
);
}
}
export default SearchBar;