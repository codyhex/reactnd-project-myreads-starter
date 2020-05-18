import React, {Component} from 'react'
import PropTypes from 'prop-types'


class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfNameKeys: PropTypes.array.isRequired,    // books 里面这个 key 是下拉菜单用的。
    shelfDisplayNames: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired //这个就是课里面学的，虽然action是在book class发生，
                                          //但是数据的变化要从上层管理者传进来handler。因为从逻辑上讲data holder不应该自己能改变数据
  }


  moveToShelf(shelfNameKey) {
    // 因为动作的主题就是这本书，所以可以写个shortcut，把书的obj固化下来，内部API只留一个target shelf
    this.props.onMoveBook(this.props.book, shelfNameKey)
  }

  render() {
    const {book} = this.props // 这样是create 一个快捷键ref

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{height: 192, width: 128, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail : ''})`}}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(event) => this.moveToShelf(event.target.value)}>
              <option key={"empty"} value="" disabled>Move to...</option>
              {this.props.shelfNameKeys.map((key, index) => {
                  return <option key={key} value={key}>{this.props.shelfDisplayNames[index]}</option>
              })}
              {/*/!* 不知道为什么要有这个none 先写上吧 *!/*/}
              {/*<option value="none">None</option>*/}
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    )
  }
}

export default Book