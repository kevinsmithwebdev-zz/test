import React from 'react'

import { DATA_PROTECTED_URL, DATA_UNPROTECTED_URL } from '../../constants/routes'

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
        return response.json()
      }
      return null
    })
    .then((json) => {
      if (!json.data)
        json.data = "Can't reach server."
      this.setState({ dataUnprotected: json })
    })
    .catch((err) => {
      console.error('error fetching unprotected data', err)
    })

    // fetch(DATA_PROTECTED_URL, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // mode: 'cors',
    //     mode: 'cors',
    //     'credentials': 'include'
    //   }
    // })
    // .then((response) => {
    //   if (response.status === 200) {
    //     return response.json()
    //   }
    //   return null
    // })
    // .then((json) => {
    //   console.log('protected',json)
    //   if (json)
    //     this.setState({ dataProtected: json })
    //   else
    //     this.setState({ dataProtected: { data: "Denied! No response from secret route!" } })
    // })
    // .catch((err) => {
    //   console.error('error fetching protected data', err)
    // })
    var httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function (data) {
      console.log('data', data)
      console.log('cookie', document.cookie)
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      if (httpRequest.readyState === DONE) {
        if (httpRequest.status === OK)
        console.log(httpRequest.responseText); // 'This is the returned text.'
      } else {
        console.log('Error: ' + httpRequest.status); // An error occurred during the request.
      }
    }
    httpRequest.withCredentials = true;
    httpRequest['Access-Control-Allow-Credentials'] = true;
    httpRequest.open('GET', DATA_PROTECTED_URL)
    httpRequest.send()
  }

  render() {
    const unprotectedData = this.state.dataUnprotected.hasOwnProperty('data') ? this.state.dataUnprotected.data : "No data retrieved?!?"
    const protectedData = this.state.dataProtected.hasOwnProperty('data') ? this.state.dataProtected.data : "No data retrieved?!?"
    const curZipCode = this.props.user.zipCode ? this.props.user.zipCode : "Not available."
    return (
      <div>
        <h1>This is the data page!</h1>
        <h3>Response from unprotected route:</h3>
        <h5><i>"{unprotectedData}"</i></h5>
        <h3>Response from protected route:</h3>
        <h5><i>"{protectedData}"</i></h5>
        <h3>Zip code of current user:</h3>
        <h5><i>{curZipCode}</i></h5>
      </div>
    )
  }
}

export default Data
