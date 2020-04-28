import React from 'react'
import {connect} from 'react-redux'
import {fetchAllOrderHistory} from '../store/orders'

export class AllOrders extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchAllOrderHistory()
  }

  render() {
    return (
      <div>
        <ol>
          {this.props.orders && this.props.orders.length && this.props.isAdmin
            ? this.props.orders.map(order => {
                let totalPrice = 0
                return (
                  <div>
                    <li key={order.id} className="ordersBox">
                      <div>Order ID: {order.id}</div>
                      <div>User ID: {order.userId}</div>
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
                    <br />
                  </div>
                )
              })
            : 'No Orders'}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders,
  isAdmin: !!state.user.isAdmin
})

const mapDispatchToProps = dispatch => ({
  fetchAllOrderHistory: () => dispatch(fetchAllOrderHistory())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
