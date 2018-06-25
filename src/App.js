import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import FrontPage from './FrontPage'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    }).catch((err) => {
      console.log(err)
    })
  }

  moveBook = (book, shelf) => {
    if (this.state.books) {
      BooksAPI.update(book,shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <FrontPage
              onMoveBook={this.moveBook}
              allBooks={this.state.books}
            />
          )}/>
          <Route path="/search" render={() => (
            <SearchPage
              onMoveBook={this.moveBook}
              allBooks={this.state.books}
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
