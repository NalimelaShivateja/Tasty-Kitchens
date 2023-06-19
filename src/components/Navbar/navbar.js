/* eslint-disable react/no-unused-state */
import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import {AiOutlineMenu, AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './navbar.css'

class Navbar extends Component {
  state = {showMenu: false}

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    console.log(this.props)
    history.replace('/login')
  }

  showOrHideNavMenu = () => {
    const {showMenu} = this.state
    if (showMenu) {
      this.setState({showMenu: false})
    } else {
      this.setState({showMenu: true})
    }
  }

  closeMenu = () => {
    this.setState({showMenu: false})
  }

  render() {
    const {showHomeActive, showCartActive} = this.props
    const {showMenu} = this.state
    const homeClassName = showHomeActive
      ? 'non-active-link activated'
      : 'non-active-link'
    const cartClassName = showCartActive
      ? 'non-active-link activated'
      : 'non-active-link'

    const menuClassName = showMenu
      ? 'logo-and-c-name padding-style'
      : 'logo-and-c-name hide-menu padding-style'
    return (
      <nav>
        <div className="logo-and-c-name">
          <div className="wrapping-img-heading">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/degbnzg10/image/upload/v1686321624/Vector_wva3bi.png"
                alt="website logo"
                className="c-image"
              />
            </Link>

            <Link to="/" className="c-name">
              <h1>Tasty Kitchens</h1>
            </Link>
          </div>
          <button
            type="button"
            onClick={this.showOrHideNavMenu}
            className="menu-button"
          >
            <AiOutlineMenu />
          </button>
        </div>
        {/* menu container goes down */}
        <div className={menuClassName}>
          <ul>
            <Link to="/" className={homeClassName}>
              <li>Home</li>
            </Link>
            <Link to="/cart" className={cartClassName}>
              <li>Cart</li>
            </Link>
            <li>
              <button
                className="logout-button"
                type="button"
                onClick={this.onLogout}
              >
                Logout
              </button>
            </li>
            <li>
              <button
                className="logout-button"
                type="button"
                onClick={this.onLogout}
              >
                Logout
              </button>
            </li>
          </ul>
          <button
            type="button"
            onClick={this.closeMenu}
            className="menu-button"
          >
            <AiFillCloseCircle />
          </button>
        </div>
      </nav>
    )
  }
}

// const Navbar = props => {
//   const i = 0

//   const logout = () => {
//     Cookies.remove('jwt_token')
//     const {history} = props
//     history.replace('/login')
//   }

//   return (
//     <div>
//       <Link to="/">
//         <div>
//           <img alt="website logo" />
//           <h1>TASTY KITCHENS</h1>
//         </div>
//       </Link>
//       <ul>
//         <Link to="/">
//           <li>Home</li>
//         </Link>
//         <Link to="/">
//           <li>Home</li>
//         </Link>
//         <li>
//           <button type="button" onClick={logout}>
//             Logout
//           </button>
//         </li>
//       </ul>
//     </div>
//   )
// }

export default withRouter(Navbar)
