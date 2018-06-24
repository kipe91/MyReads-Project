import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import Header from './Header'
import Book from './Book'

class FrontPage extends Component {
	render() {
		const shelves = ["currentlyReading", "wantToRead", "read"]
		const shelveNames = ["Currently Reading:", "Want To Read:", "Read:"]
		return (
			<div>
				<div className="list-books">
	    			<Header />
	    			{shelves.map((shelf, index) => {
						return (
				            <div key={index} className="list-books-content">
				              <div>
				                <div className="bookshelf">
				                  <h2 className="bookshelf-title">{shelveNames[index]}</h2>
				                  <div className="bookshelf-books">
				                    <ol className="books-grid">
				                      {this.props.allBooks.sort(sortBy('title'))
				                          .filter(book => book.shelf === shelf)
				                          .map(book => (
				                            <Book 
				                              onMoveBook={this.props.onMoveBook}
				                              key={book.id}
				                              book={book}
				                            />
				                          ))
				                        }
				                    </ol>
				                  </div>
				                </div>
				              </div>
				            </div>
				        )
        			})}
        			<div className="open-search">
		            	<Link to="/search"> Add a book </Link>
		            </div>
				</div>
		    </div>
		)
	}
}

export default FrontPage