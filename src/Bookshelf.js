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
    const shelfNames = {
      "currentlyReading": "Currently Reading",
      "wantToRead": "Want To Read",
      "read": "Read"
    }

    const {booksOnShelf} = this.props

    // 然后注意了：这个shelf 不需要hold data，只是用来render
    // 抽取好对应的 book 给 该 shelf

    // for (let key in shelfNames) {
    //
    // }

    // return (
    //   <div>
    //     {
    //       Object.keys(vals).map((key, index) => (
    //         <p key={index}> this is my key {key} and this is my value {vals[key]}</p>
    //       ))
    //     }
    //   </div>
    // )
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

    console.log(booksByShelfName)

    return (
      <div>
        {
          Object.keys(shelfNames).map((key, index) => (

          (
            <div id={key} className="list-books-content">
              <div className="shelf">
                <h2 className="shelf-title">{shelfNames[key]}</h2>
              </div>
            </div>
          )
          )
          )
        }
      </div>
    );
  }

//  下面这里 重点写如何把 data render 在一个 shelf 的 range 里/


}

export default Bookshelf