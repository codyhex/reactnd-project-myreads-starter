import React, {Component} from 'react'
import Book from './Book'
import Shelf from "./Shelf";
import PropTypes from 'prop-types'

class Bookshelf extends Component {
  static propTypes = {
    // 所有书的data从上面传进来
    shelfName: PropTypes.string.isRequired,
    booksOnShelf: PropTypes.array.isRequired

  }

  render() {
    // 没办法我想从data里把这个信息抽取出来，但是那样就变得特别不可控了。
    // 所以不如把这个弄城市fixed 约定好的类别，要改只能从这里改。
    const shelfNames = ["currentlyReading", "wantToRead", "read"]
    const shelfDisplayNames = ["Currently Reading", "Want To Read", "Read"]

    const {booksOnShelf} = this.props
    // 然后注意了：这个shelf 不需要hold data，只是用来render
    // 抽取好对应的 book 给 该 shelf

    // Accepts the array and key
    const groupBy = (array, key) => {
      // Return the end result
      return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {}); // empty object is the initial value for result object
    };

    const booksByShelfName = groupBy(booksOnShelf, 'shelf');

    // console.log(booksByShelfName)
    // console.log(booksByShelfName['wantToRead'])

    return (
      <div>
        {/* 这里直接安装 book 属性里面的 shelf name 创建相对应 shelf render view */}
        {shelfNames.map((key, index) => {
            // 上面的那个花括号在 React里面解释为：小括号的话会自动 return里面 wrap的东西。
            // 花括号你就得自己写 return， 而且记住 return 后面不能空，那样就会 return undefined object
            return (
              <div id={key} className="bookshelf">
                <h2 className="bookshelf-title">{shelfDisplayNames[index]}</h2>
                {console.log('out book', booksByShelfName[key])}
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {booksByShelfName[key] && booksByShelfName[key].map(book => (
                        <li key={book.id} className="list-books-content">
                          <Book book={book}/>
                        </li>
                      )
                    )}
                    {/* 下面这个地方调了好久都调不出来，总是 item undefined。最后凭借经验，我才就是初始化和异步的问题
                          结果猜对了。 用condition先验证一下就行！ https://www.debuggr.io/react-map-of-undefined/ */}
                  </ol>
                </div>
              </div>)
          }
          // 前面这个 小括号是 map 的，总是报错太难找了。
        )}
      </div>
    );
  }

//  下面这里 重点写如何把 data render 在一个 shelf 的 range 里/


}

export default Bookshelf