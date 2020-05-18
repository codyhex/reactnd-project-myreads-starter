import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

/*
  This class renders several "section"s that stays on a single shelf",
  but due to the homework api. I did not change the props' name,
  where the props.shelf should be called "section"
 */
class Bookshelf extends Component {
  static propTypes = {
    // 所有书的data从上面传进来
    shelfName: PropTypes.string.isRequired,
    booksOnShelf: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired

  }

  render() {
    // 没办法我想从data里把这个信息抽取出来，但是那样就变得特别不可控了。
    // 所以不如把这个弄城市fixed 约定好的类别，要改只能从这里改。
    // render 里面的方法可以看见 下面的变量，但是不可以直接条用 props 里面的，需要加写 this.props.var
    const shelfNameKeys = ["currentlyReading", "wantToRead", "read", "none"]
    const shelfDisplayNames = ["Currently Reading", "Want To Read", "Read", "None"]

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
    /*
      You can divide the logic further down, make a class called section to let the render
      creates several sections. However, because we have the Book as another class, develop a section class
      may break the deepest three layer rule.
      Currently we have App.Bookshelf.Book to reach the bottom, which looks simple and not complicated.
    */
    return (
      <div>
        {/* 这里直接安装 book 属性里面的 shelf name 创建相对应 shelf render view */}
        {shelfNameKeys.map((key, index) => {
            // 上面的那个花括号在 React里面解释为：小括号的话会自动 return里面 wrap的东西。
            // 花括号你就得自己写 return， 而且记住 return 后面不能空，那样就会 return undefined object
            let data_each_grid = booksByShelfName[key]; // 这里开一个 ref var 简化代码长度
            return (
              <div key={key+"-shelf"} className="bookshelf">
                <h2 className="bookshelf-title">{shelfDisplayNames[index]}</h2>
                {/*{console.log('out book', booksByShelfName[key])}*/}
                <div className="bookshelf-books">
                  <ol key={key+"-grid"} className="books-grid">
                    {/* 下面这个地方调了好久都调不出来，总是 item undefined。最后凭借经验，我才就是初始化和异步的问题
                          结果猜对了。 用condition先验证一下就行！ https://www.debuggr.io/react-map-of-undefined/ */}
                    {data_each_grid && data_each_grid.sort(sortBy('title')).map(book => (
                      <li key={book.id} className="list-books-content">
                        <Book
                          book={book}
                          shelfNameKeys={shelfNameKeys}
                          shelfDisplayNames={shelfDisplayNames}
                          onMoveBook={this.props.onMoveBook}/>
                      </li>)
                    )}
                  </ol>
                </div>
              </div>)
          }
          // 前面这个 小括号是 map 的，总是报错太难找了。
        )}
      </div>
    );
  }

}

export default Bookshelf