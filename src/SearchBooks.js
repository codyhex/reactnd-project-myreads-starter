import React, {Component} from 'react'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import * as BookAPI from './BooksAPI'
import sortBy from 'sort-by'
import Book from "./Book";

class SearchBooks extends React.Component {
  // 如何传进来数据
  // 应该传什么数据
  // 怎么缓存搜索结果
  // 如何解决本地数据一致性，也就是同步的问题。


  static propTypes = {
    booksOnShelf: PropTypes.array,
    shelfNameKeys: PropTypes.string.isRequired,
    shelfDisplayNames: PropTypes.string.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }
  // 我还是不太明白什么时候要用 state，是需要有 var 变化检测的时候吗？
  state = {
    query: '',
    books: []
  }

  // 用变量名注册成为函数
  updateQuery = (query) => {
    if (query === "") {
      this.setState( {
        query: "",
        books: []
      })
    } else {
      // 原来还有trim这个细节？
      this.setState({query: query.trim() }) // 应该是用来去 空格的？

      BookAPI.search(query).then( (books) => {
        if (books.error) {
          // 居然 array 还有 error这个value 检测 ？？？
          books = []
        }
        console.log(books)
        books.map(book => (
          this.props.booksOnShelf.filter( (bk) => (bk.id === book.id ))
            .map(bk => book.shelf = bk.shelf) // 这句 map 没明白
        ))

        this.setState({books} )   // 注意花括号

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
              {this.state.books.sort(sortBy('title'))
                .map(book => (
                  <Book
                    book={book}
                    shelfNameKeys={this.props.shelfNameKeys}
                    shelfDisplayNames={this.props.shelfDisplayNames}
                    onMoveBook={this.props.onMoveBook}
                  />
                ))
              }
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBooks