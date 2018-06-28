import React from 'react'

class BlogItem extends React.Component {

  render() {

    let { text } = this.props

    // text = this.props.text.slice(0,100) + ' ...'

    return (
      <div className="text-item blog-item">{text}</div>
    )
  }
}

export default BlogItem
