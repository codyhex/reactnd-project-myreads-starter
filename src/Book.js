import React, {Component} from 'react'
import PropTypes from 'prop-types'


class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        shelfNameKeys: PropTypes.array.isRequired,
        shelfDisplayNames: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired //这个就是课里面学的，虽然action是在book class发生，
                                              //但是数据的变化要从上层管理者传进来handler。因为从逻辑上讲data holder不应该自己能改变数据
    }

    // moveToShelf(shelf) {
    //     this.props.onMoveBook(this.props.book, shelf)
    // }

    moveToShelf(shelfNameKey) {
      // 因为动作的主题就是这本书，所以可以写个shortcut，把书的obj固化下来，内部API只留一个target shelf
      this.props.onMoveBook(this.props.book, shelfNameKey)
    }

    render () {
        const {book} = this.props

        return (
          <div className="book">
              <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
            <div className="book-top">
              <div className="book-cover" style={{ height: 192, width: 128, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail: ''})` }}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf} onChange={(event) => this.moveToShelf( event.target.value )}
                  <option value="" disabled>Move to...</option>
                  {this.props.shelfNameKeys.map((key, index) => (
                    <option value={key}>{this.props.shelfDisplayNames[index]}</option>
                  ))}
                  <option value="none">None</option>  {/* 不知道为什么要有这个先写上吧 */}
                </div>


            </div>
          </div>
        )
    }
}

export default Book