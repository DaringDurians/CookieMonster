import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <h1 className="header">Cookie Monster</h1>

    <nav className="navbar">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Welcome</Link>
          <Link to="/">Home</Link>
          <Link to="/cookies">Cookies</Link>
          <Link to="/brownies">Brownies</Link>
          {isAdmin ? <Link to="/users">Users</Link> : null}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/">Home</Link>
          <Link to="/cookies">Cookies</Link>
          <Link to="/brownies">Brownies</Link>
        </div>
      )}
      <div className="cart">
        <Link to="/cart">
          <img
            id="cartImage"
            src="https://cdn2.mageplaza.com/media/shopify_appicons//afd007d75091993dba6f2654d912edd5.png"
            alt="failed to load cart image"
            width="50px"
            height="50px"
          />
        </Link>
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
