import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Header from './Header'
import Book from './Book'

class SearchBooks extends Component {

	state = {
    	query: '',
    	message: false,
    	books: []
    }

	handleInput = (query) => {
	    if (!query) {
	    	this.setState({query: '', books: []})
	    	this.setState({message: false})
	    } else {
	    	this.setState({ query: query.trim() })
	    	BooksAPI.search(query).then((books) => {
	    		this.setState({message: false})
		        if (books.error) {
		        	books = []
		        	this.setState({message: true})
		        }
		        books.map(book => (this.props.allBooks.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
		        this.setState({books})
	    	})
	    }
	}

	render() {
		return (
			<div className='search-page'>
				<Header />
				<div className="search-books">
	            	<div className="search-books-bar">
	            		<Link to="/" className='close-search'>Close</Link>
	            		<div className="search-books-input-wrapper">
				            <input
				            	type="text"
				            	placeholder="Search by title or author"
				            	onChange={(e) => this.handleInput(e.target.value)}
				            />
	              		</div>
	            	</div>
	            	<div className="search-books-results">
	              			<ol className="books-grid">
	              				{this.state.books.sort(sortBy('title'))
					                .map(book => (
					                    <Book 
					                      onMoveBook={this.props.onMoveBook}
					                      key={book.id}
					                      book={book}
					                    />
				                	))
				                }
				                {(this.state.message === true) &&
							        <span className='searchErrorMessage'>
							          No results on that search. Try something else!
							        </span>
							    }
	              			</ol>
	            	</div>
	          	</div>
	        </div>
		)
	}
}

export default SearchBooks