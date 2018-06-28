import React from 'react'
import withTrunc from '../../HOCs/withTrunc'

class BlogItem extends React.Component {

  render() {
    let { text } = this.props

    // text = this.props.text.slice(0,100) + ' ...'

    return (
      <div className="text-item blog-item">{text}</div>
    )
  }
}

export default withTrunc(BlogItem)
