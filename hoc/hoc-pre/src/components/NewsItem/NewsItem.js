import React from 'react'

class NewsItem extends React.Component {
  render() {
    return (
      <div className="text-item news-item">{this.props.text}</div>
    )
  }
}

export default NewsItem
