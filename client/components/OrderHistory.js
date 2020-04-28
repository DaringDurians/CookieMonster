import React from 'react'

export const OrderHistory = props => {
  return (
    <div className="ordersBox">
      <ol>
        {props.orders && props.orders.length && props.correctUserCheck ? (
          props.orders.map(order => {
            let totalPrice = 0
            return (
              <div key={order.id}>
                <li>
                  <div id="orderSummary">
                    <div>
                      <p>Order ID: {order.id}</p>
                    </div>
                    {props.hideUserId ? (
                      <div />
                    ) : (
                      <div>
                        <p>User ID: {order.userId}</p>
                      </div>
                    )}
                    <div>
                      <p>Order Date: {order.orderDate.slice(0, 10)}</p>
                    </div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
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
                    <p>Total Price: {'$' + (totalPrice / 100).toFixed(2)}</p>
                  </div>
                </li>
              </div>
            )
          })
        ) : (
          <div />
        )}
      </ol>
    </div>
  )
}
