import React from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../store/singleUser'
import {fetchAllOrderHistory} from '../store/orders'

let userId
export class SingleUser extends React.Component {
  componentDidMount() {
    userId = this.props.match.params.userId
    this.props.fetchUser(userId)
    this.props.fetchAllOrderHistory()
  }
  render() {
    const {singleUser} = this.props
    const userOrders = this.props.orders.filter(
      order => order.userId === singleUser.id
    )
    console.log(userOrders)
    return (
      <div className="singleUserBox">
        <div className="singleUserInfo">
          <div>
            <h3>{singleUser.name}</h3>
          </div>
          <div>
            <p>Email: {singleUser.email}</p>
          </div>
        </div>
        <div>
          <div>
            <ol>
              {userOrders && userOrders.length && this.props.isLoggedIn
                ? userOrders.map(order => {
                    let totalPrice = 0
                    return (
                      <li key={order.id} className="ordersBox">
                        <div>Order Date: {order.orderDate.slice(0, 10)}</div>
                        <table>
                          <tbody>
                            <tr>
                              <th>Product ID</th>
                              <th>Product Name</th>
                              <th>Category</th>
                              <th>Qty</th>
                              <th>Price</th>
                            </tr>
                            {order.products && order.products.length ? (
                              order.products.map(product => {
                                totalPrice += product.orderProducts.totalPrice
                                return (
                                  <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.orderProducts.quantity}</td>
                                    <td>
                                      {'$' +
                                        (
                                          product.orderProducts.totalPrice / 100
                                        ).toFixed(2)}
                                    </td>
                                  </tr>
                                )
                              })
                            ) : (
                              <h3>"No Products"</h3>
                            )}
                          </tbody>
                        </table>
                        <div>
                          Total Price: {'$' + (totalPrice / 100).toFixed(2)}
                        </div>
                      </li>
                    )
                  })
                : 'No Orders'}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders,
    singleUser: state.singleUser,
    isLoggedIn: !!state.user.id
  }
}
const mapDispatch = dispatch => ({
  fetchUser: () => dispatch(fetchUser(userId)),
  fetchAllOrderHistory: () => dispatch(fetchAllOrderHistory())
})

export default connect(mapState, mapDispatch)(SingleUser)
