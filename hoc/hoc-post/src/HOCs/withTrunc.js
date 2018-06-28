import React from 'react'

const WRAP_LIMIT = 100

const withTrunc = WrappedComponent => {
  return class newComponent extends React.Component {
    handleClick() {
      alert(this.props.text)
    }

    render() {


      let { text } = this.props

      text = this.props.text.slice(0, WRAP_LIMIT) + ' ...'

      let locHyphen = text.indexOf('-')

      if (locHyphen!==-1)
        text = <div><span className="text-title">{text.slice(0, locHyphen+1)}</span>{text.slice(locHyphen+1)}</div>

      let newProps = { ...this.props, text}
      return (
        <div onClick={this.handleClick.bind(this)}>
          <WrappedComponent {...newProps } />
        </div>
      )
    }
  }
}

export default withTrunc
