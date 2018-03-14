import React from 'react'

import '../auth.css'


class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      inputFields: {
        username: '',
        password: '',
        zipCode: ''
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleRegister(this.state.inputFields)
  }

  updateInputValue(field, e) {
    let newFields = this.state.inputFields
    newFields[field] = e.target.value
    this.setState({
      inputFields: newFields
    });
  }

  render() {
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
        <div className="auth-form-item">
          <label htmlFor="zipCode">Zip Code:</label><br/>
          <input
            name="zipCode"
            onChange={e => this.updateInputValue('zipCode', e)}
            type="text"
            value={this.state.inputFields.zipCode}
          />
        </div>
        <button>Register</button>
        <br/><br/>
      </form>
    )
  }
}

export default Register
