import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './main-page';
import SearchPage from './search-page';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
	  books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  
  updateShelf = (updatedBook, shelf) => {
    BooksAPI.update({ id: updatedBook.id }, shelf).then(response => {
      const newBook = Object.assign({}, updatedBook, {shelf});
      
	  this.setState((state) => ({
        books: state.books.filter((b) => (
                b.id !== updatedBook.id
        )).concat(shelf !== "none" ? [ newBook ]: [])
	}))
 
	  
    })
  }
  
  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage books={this.state.books} handleShelfUpdate={this.updateShelf}/>
        )}/>
        <Route path='/search' render={() => (
          <SearchPage books={this.state.books} handleShelfUpdate={this.updateShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
