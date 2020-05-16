import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import './index.css'

ReactDOM.render(
  // 原来 BrowserRouter要在这里 wrap around
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root'))
