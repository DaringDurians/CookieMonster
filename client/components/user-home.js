import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const name = props.user.name
  const id = props.user.id

  return (
    <div>
      <h3>Time to nom nom nom, {name}!</h3>
      <NavLink to={`/users/${id}`}>Your Order History</NavLink>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
