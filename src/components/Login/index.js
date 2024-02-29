import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: false,
    errorText: '',
  }

  updateUser = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  submitLogin = async event => {
    try {
      this.setState({errorMsg: false})
      event.preventDefault()
      const {username, password} = this.state

      const userDetails = {
        username,
        password,
      }

      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }

      const url = 'https://apis.ccbp.in/login'

      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 20})

        const {history} = this.props
        history.replace('/')
      } else {
        this.setState({errorText: data.error_msg, errorMsg: true})
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {username, password, errorMsg, errorText} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="login-main">
          <form className="form-ele">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              className="user-input"
              value={username}
              onChange={this.updateUser}
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              className="user-input"
              value={password}
              onChange={this.updatePassword}
            />
            <button
              type="submit"
              className="submit-btn"
              onClick={this.submitLogin}
            >
              Login
            </button>
            <p className="error-msg">{errorMsg && errorText}</p>
          </form>
        </div>
      </>
    )
  }
}

export default LoginPage
