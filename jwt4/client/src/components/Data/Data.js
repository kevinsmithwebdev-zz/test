import React from 'react'

import { DATA_PROTECTED_URL, DATA_UNPROTECTED_URL } from '../../constants/constants'

class Data extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataProtected: {},
      dataUnprotected: {}
    }
  }

  componentDidMount() {
    fetch(DATA_UNPROTECTED_URL)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      this.setState({ dataUnprotected: json })
    })
    .catch((err) => {
      console.error('error fetching unprotected data', err)
    })


    console.log('ready to fetch protected', this.props.token)
    const token = 'JWT ' + this.props.token

    const finishedToken = '\n\n\n***' + token + "***\n\n\n"
    console.log(finishedToken)
    fetch(DATA_PROTECTED_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json)
        this.setState({ dataProtected: json })
      else
        this.setState({ dataProtected: { data: "Denied! No response from secret route!" } })
    })
    .catch((err) => {
      console.error('error fetching protected data', err)
    })
  }

  render() {
    const unprotectedData = this.state.dataUnprotected.hasOwnProperty('data') ? this.state.dataUnprotected.data : "No data retrieved?!?"
    const protectedData = this.state.dataProtected.hasOwnProperty('data') ? this.state.dataProtected.data : "No data retrieved?!?"
    return (
      <div>
        <h1>This is the data page!</h1>
        <h3>Response from unprotected route:</h3>
        <h5><i>"{unprotectedData}"</i></h5>
        <h3>Response from protected route:</h3>
        <h5><i>"{protectedData}"</i></h5>
      </div>
    )
  }
}

export default Data
