import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route, Link} from 'react-router-dom'
import './App.css'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    shelfNameKeys: ["currentlyReading", "wantToRead", "read", "none"],
    shelfDisplayNames: ["Currently Reading", "Want To Read", "Read", "None"]
  }

  moveBook = (book, shelf) => {
    if (this.state.books) { // 安全检查是对的
      BooksAPI.update(book, shelf).then(() => {  // 先更新 backend 数据
        book.shelf = shelf;
        this.setState(prevState => ({
          // 把旧 state 里面的 其他书filter出来然后跟 updated的这本书 concat成一个新state。效率好低
          // NOTE：但是研究过后发现这种 waste mem的方法是最好的，因为不会产生更多的麻烦比如 race，或者 内部setState不work
          // 注意：如果只要新增一个item的话用 concat是可以的
          // books: prevState.books.filter(b => b.id !== book.id).concat([ book ])
          // ES6 以后可以用 spread 符号 这么写，感觉运行的快了一些。
          // https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
          books: [...prevState.books.filter(bk => bk.id !== book.id), book]
        }))
      })
      console.log(this.state.books)
    }
  }

  componentDidMount() {
    // 这个fetch后台的数据里面装的是 book info array list
    // 所以存到 state：books 比较合适。
    // 不如说所有的 fetched data 都存到 root 级别 app 里面去
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books}) // 如果state里是单一变量，或者是名字一样的就可以直接传？我猜的
        // this.setState((prevState) => ({ books:books }))  // 这里如果要用 prevState 就需要传个匿名函数进去
        console.log(books)
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Bookshelf
              /*  把数据data， 也就是书全部传进 shelf 里面，让他自己独立现实好。*/
              shelfName={"my-reads"}
              booksOnShelf={this.state.books}
              onMoveBook={this.moveBook}
            />
            <div className="open-search">
              {/* 这个open-search 是 css button, 真简单，用link以后什么都不用写？ */}
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        {/*  所以 route 的相对路径就是在 root div 下的并列 components */}
        <Route exact path='/search' render={() => (
          <SearchBooks booksOnShelf={this.state.books}  // 这太坑爹了 同一个变量不同 scope里面名字不同
                       shelfNameKeys={this.state.shelfNameKeys}
                       shelfDisplayNames={this.state.shelfDisplayNames}
                       onMoveBook={this.moveBook}/>

        )}/>

      </div>


      // <div className="app">
      //   {this.state.showSearchPage ? (
      //     <div className="search-books">
      //       <div className="search-books-bar">
      //         <button className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</button>
      //         <div className="search-books-input-wrapper">
      //           {/*
      //             NOTES: The search from BooksAPI is limited to a particular set of search terms.
      //             You can find these search terms here:
      //             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
      //
      //             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
      //             you don't find a specific author or title. Every search is limited by search terms.
      //           */}
      //           <input type="text" placeholder="Search by title or author"/>
      //         {/*  这里如何传 query 进去search 然后把找到的结果 放在下面 display 出来。 就是 shelf 一样？ */}
      //
      //         </div>
      //       </div>
      //       <div className="search-books-results">
      //         <ol className="books-grid"></ol>
      //       </div>
      //     </div>
      //   ) : (
      //
      //   )}
      // </div>
    )
  }
}

export default BooksApp
