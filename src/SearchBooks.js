import React, { Component } from 'react'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import * as BookAPI from './BooksAPI'

class SearchBooks extends React.Component {
    // 如何传进来数据
    // 应该传什么数据
    // 怎么缓存搜索结果

    render() {
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}

export default SearchBooks