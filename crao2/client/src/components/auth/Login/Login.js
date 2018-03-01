import React from 'react';

import { bindActionCreators } from 'redux'
import { userUpdate } from '../../../redux/actions/actions'
import { connect } from 'react-redux'

import { AUTH_LOGIN_URL } from '../../../constants/constants'

import '../auth.css'


const handleDash = () => {
  fetch('http://localhost:8080/api/auth/dashboard', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin'
  })
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    console.log('back from dash check')
    console.log(response)
  })
}


class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      fields: {
        email: 'asdf@asdf.com',
        password: 'asdf'
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();


    console.log('in handle')
    // console.log(event.target)
    var formData = JSON.stringify(this.state.fields)








    fetch(AUTH_LOGIN_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('back !!!!!!', response)
      this.props.userUpdate(response)
    })



  }
















  updateInputValue(field, e) {
    let newFields = this.state.fields
    newFields[field] = e.target.value
    this.setState({
      fields: newFields
    });
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="auth-form-item">
          <label htmlFor="email">Email:</label><br/>
          <input
            name="email"
            onChange={e => this.updateInputValue('email', e)}
            type="text"
            value={this.state.email}
          />
        </div>
        <div className="auth-form-item">
          <label htmlFor="password">Password:</label><br/>
          <input
            name="password"
            onChange={e => this.updateInputValue('password', e)}
            type="text"
            value={this.state.password}
          />
        </div>
        <button>Send data!</button>
        <br/><br/>
        <div onClick={handleDash}>Check Dash!</div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userUpdate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
