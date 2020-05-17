import React, {Component} from 'react'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import Book from "./Book";

class SearchBooks extends Component {
  // 如何传进来数据
  // 应该传什么数据
  // 怎么缓存搜索结果
  // 如何解决本地数据一致性，也就是同步的问题。


  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    shelfNameKeys: PropTypes.array.isRequired,
    shelfDisplayNames: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }
  // 我还是不太明白什么时候要用 state，是需要有 var 变化检测的时候吗？
  state = {
    query: '',
    books_filtered: []
  }

  // 用变量名注册成为函数
  updateQuery = (query) => {
    if (query === '') {
      this.setState( {
        query: '',
        books_filtered: []
      })
    } else {
      // 原来还有trim这个细节？
      this.setState({query: query.trim() }) // 应该是用来去 空格的？

      BooksAPI.search(query).then( (matched_books) => {
        if (matched_books.error) {
          // 居然 array 还有 error这个value 检测 ？？？
          matched_books = []
        }
        // to show only the matched results that is on my shelf
        // use my local shelf info to overwrite the search results
        console.log('search results full', query, matched_books)
        matched_books.map(matched_book => (
          this.props.booksOnShelf.filter( (local_book) => (local_book.id === matched_book.id ) )
            .map(local_book => matched_book.shelf = local_book.shelf)
        ))

        this.setState({books_filtered: matched_books} )   // 注意花括号
        console.log('search results filtered', query, matched_books)
      })
    }
  }


  searchBook = (query) => {
    if (query === ''){
      this.setState(() => ({
        books_filtered: []
      }))
    }
    else {
      BooksAPI.search(query).then((new_books) => {
        let filtered_books = new_books

        if ('error' in filtered_books){
          this.setState(() => ({
            books_filtered: filtered_books
          }))
        }
        else {

          for (let filtered_book of filtered_books){
            for (let my_book of this.props.booksOnShelf){
              if (filtered_book.id === my_book.id){
                filtered_book.shelf = my_book.shelf
              }
            }
            if (typeof(filtered_book.shelf) === 'undefined'){
              filtered_book.shelf = "none"
            }
          }
          this.setState(() => ({
            books_filtered: filtered_books
          }))
        }
      })
    }
  }

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event => this.updateQuery(event.target.value))}
            />
          </div>
          {/* 把query返回来的书 按 title 全部列出来就行。然后下拉菜单都一样，复用onMove实现移动操作。*/}
          <div className='search-books-results'>
            <ol className='books-grid'>
              {this.state.books_filtered.sort(sortBy('title'))
                .map(book => (
                  <Book
                    book={book}
                    shelfNameKeys={this.props.shelfNameKeys}
                    shelfDisplayNames={this.props.shelfDisplayNames}
                    onMoveBook={this.props.onMoveBook}
                  />
                ))
              }
              {console.log('search displays', this.state.books_filtered)}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBooks