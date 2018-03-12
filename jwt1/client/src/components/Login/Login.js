import React from 'react';

// import { bindActionCreators } from 'redux'
// import { userUpdate } from '../../../redux/actions/actions'
// import { connect } from 'react-redux'

import '../auth.css'


class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      inputFields: {
        username: '',
        password: ''
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit', this)
    this.props.handleLogin(this.state.inputFields)
  }

  updateInputValue(field, e) {
    let newFields = this.state.inputFields
    newFields[field] = e.target.value
    this.setState({
      inputFields: newFields
    });
  }

  render() {
    // console.log('*** Login.render', this.props)
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="auth-form-item">
          <label htmlFor="email">Username:</label><br/>
          <input
            name="username"
            onChange={e => this.updateInputValue('username', e)}
            type="text"
            value={this.state.inputFields.username}
          />
        </div>
        <div className="auth-form-item">
          <label htmlFor="password">Password:</label><br/>
          <input
            name="password"
            onChange={e => this.updateInputValue('password', e)}
            type="text"
            value={this.state.inputFields.password}
          />
        </div>
        <button>Login</button>
        <br/><br/>
      </form>
    )
  }
}

export default Login
