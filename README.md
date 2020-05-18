# MyReads Project

This is the first project for Udacity's React Fundamentals course. 

Of course, you are free to start this project from scratch if you wish! Just be sure to use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.

## Prepare tools
To use tree to list all dir and files(on Mac OS)
```bash
brew install tree
tree -v -L 2 -I 'node_modules|cache|test_*'
```

## How to run
```bash
npm install
npm start
```
Note: I use yarn from the beginning as the lecturer told, but later I found most of the commands are using npm.
I did little research on yarn vs npm. TL;DL, yarn pushed npm to improve and it's now recommend to use npm bc it ships with nodejs.
I will use the project manager's guide in the future, if there is one. 

## What You're Getting
```bash
.
├── CONTRIBUTING.md
├── README.md
├── SEARCH_TERMS.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── Book.js
│   ├── BooksAPI.js
│   ├── Bookshelf.js
│   ├── ListBooks.js
│   ├── SearchBooks.js
│   ├── icons
│   ├── index.css
│   └── index.js
└── yarn.lock

```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed. This is really important, for example, the search query results is a separate component page from the main one. 

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


