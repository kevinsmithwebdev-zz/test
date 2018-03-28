import React from 'react'

import '../common/css/auth.css'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      inputFields: {
        username: '',
        password: '',
        zipCode: ''
      },
      isPasswordHide: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      inputFields: {
        username: '',
        password: '',
        zipCode: ''
      }
    })
    this.props.handleRegister(this.state.inputFields)
  }

  updateInputValue(field, e) {
    let newFields = this.state.inputFields
    newFields[field] = e.target.value
    this.setState({
      inputFields: newFields
    })
  }

  updatePasswordHide(e) {
    this.setState({
      isPasswordHide: !this.state.isPasswordHide
    })
  }

  render() {
    return (
      <div>
        <h1>Registration Page</h1>
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
              type={this.state.isPasswordHide?"password":"text"}
              value={this.state.inputFields.password}
            />
            <input
              checked={this.state.isPasswordHide}
              id="checkBox"
              onChange={e => this.updatePasswordHide(e)}
              type="checkbox"
            />
            <label htmlFor="checkBox">hide</label>
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
      </div>
    )
  }
}

export default Register
