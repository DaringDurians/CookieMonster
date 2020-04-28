import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {OrderHistory} from './OrderHistory'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const name = props.user.name
  const userId = props.user.id
  const userOrders = props.orders.filter(
    order => order.active === false && userId === order.userId
  )

  return (
    <div id="header">
      <h3>Time to nom nom nom, {name}!</h3>
      <h5>Order History</h5>
      <OrderHistory
        orders={userOrders}
        correctUserCheck={props.isLoggedIn}
        hideUserId={true}
      />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    orders: state.orders,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
