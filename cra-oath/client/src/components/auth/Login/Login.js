import React from 'react'

import './Login.css'

import { SERVER_URL } from '../../../constants/constants'

const URL = "http://localhost:8080/auth/google"

class Login extends React.Component {

  handleGoogle() {
    console.log('google click')

    fetch(URL, {method: 'post'})

    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status)
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          console.log('data back')
          console.log(data)
        })
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err)
    })
  }

  render() {
    return (
      <div id="Login">
        <h1>Login Page</h1>
        <span className="google-btn" onClick={this.handleGoogle}>Google+ 1</span>
        <br/><br/><br/>
        <a className="google-btn" href={URL}>Google+ 2</a>

      </div>
    )
  }
}

export default Login
