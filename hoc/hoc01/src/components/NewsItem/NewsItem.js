import React from 'react'

import withTrunc from '../../HOCs/withTrunc'

class NewsItem extends React.Component {
  render() {
    return (
      <div className="text-item news-item">{this.props.text}</div>
    )
  }
}

export default withTrunc(NewsItem)
