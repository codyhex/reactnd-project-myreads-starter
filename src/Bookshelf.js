import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Bookshelf extends Component {
  static propTypes = {
    // 所有书的data从上面传进来
    shelfName : PropTypes.string.isRequired,
    booksOnShelf : PropTypes.array.isRequired

  }

  render() {
    return (
    <div>
      <p>Name</p>
    </div>
  );
  }

//  下面这里 重点写如何把 data render 在一个 shelf 的 range 里/


}

export default Bookshelf