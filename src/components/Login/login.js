/* eslint-disable import/named */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './login.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
      history.replace('/')
      //   return <Redirect history.replace() />
    }
    return (
      <div className="main-container">
        <div className="nesting-credentials-container">
          <div className="credentials-container">
            <div className="website-logo-name-container">
              <img
                src="https://res.cloudinary.com/degbnzg10/image/upload/v1686321624/Vector_wva3bi.png"
                alt="website logo"
                className="website-logo-image"
              />
              <h1 className="website-heading">Tasty Kitchens</h1>
            </div>
            <h1 className="login-heading">Login</h1>
            <form onSubmit={this.onSubmitForm}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label
                  className="name-title"
                  htmlFor="name-input"
                  style={{fontSize: '12px'}}
                >
                  USERNAME
                </label>
                <input
                  className="name-input-field"
                  type="text"
                  id="name-input"
                  value={username}
                  onChange={this.onChangeUserName}
                />
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label
                  htmlFor="password-input"
                  style={{fontSize: '12px'}}
                  className="name-title"
                >
                  password
                </label>
                <input
                  className="name-input-field"
                  type="password"
                  id="password-input"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              {showErrorMsg ? <p className="error-msg">{errorMsg}</p> : null}
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/degbnzg10/image/upload/v1686326346/Rectangle_1456_j56jdy.png"
          alt="website login"
          className="website-background-image"
        />
      </div>
    )
  }
}

export default Login
