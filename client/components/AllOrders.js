import React from 'react'
import {connect} from 'react-redux'
import {OrderHistory} from './OrderHistory'

const AllOrders = props => {
  const userOrders = props.orders.filter(order => order.active === false)
  return <OrderHistory orders={userOrders} correctUserCheck={props.isAdmin} />
}

const mapStateToProps = state => ({
  orders: state.orders,
  isAdmin: !!state.user.isAdmin
})

export default connect(mapStateToProps)(AllOrders)
