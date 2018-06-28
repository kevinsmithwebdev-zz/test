import React, { Component } from 'react';
import './App.css';

import BlogItem from './BlogItem/BlogItem'
import NewsItem from './NewsItem/NewsItem'

import { blogArr, newsArr } from './data'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Simple HOC App</h1>
        </header>
        <h2>Blog Entries</h2>
        { blogArr.map((t, idx) => <BlogItem key={idx} text={t} />) }

        <h2>News Items</h2>
        { newsArr.map((t, idx) => <NewsItem key={idx} text={t} />) }

      </div>
    );
  }
}

export default App;
