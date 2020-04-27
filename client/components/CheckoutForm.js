import React from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'

let name, email
export const CheckoutForm = props => {
  return (
    <div>
      <div />
      <h3>Don't be a stranger!</h3>
      <p>Sign up to check out</p>
      <br />
      <NavLink to="/signup">Sign Up</NavLink>
      <br />
      <h3>Or if you want to stay as guest...</h3>
      <form onSubmit={props.handleFormSubmit}>
        <div>
          <label htmlFor="fullname">
            <small>Name</small>
          </label>
          <input name="fullname" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <button type="submit">Checkout as Guest</button>
        </div>
      </form>
    </div>
  )
}

//logged in user
//check order exists or //creat db order
//get order info (dbInfo)
//get session info (sessionInfo)
//merge session and db Info

//   //   if(dbOrder !== null || dbOrder !== undefined){
//   //     dbOrder.map(product => {
//   //       if (product.prod === prod.prodId) {
//   //         product.quantity = prod.quantity
//   //         product.price = prod.price
//   //         return product
//   //       } else {
//   //         return product
//   //       }
//   //     })

//   //     const found = sessionInfo.find(product => product.prodId === prod.prodId)
//   //     if (found) {
//   //       const updateProduct = temp
//   //         .map(product => {
//   //           if (product.prodId === prod.prodId) {
//   //             product.quantity = prod.quantity
//   //             product.price = prod.price
//   //             return product
//   //           } else {
//   //             return product
//   //           }
//   //         })
//   //         .filter(product => product.quantity !== 0)
//   //       allProducts = updateProduct
//   //     } else if (prod.quantity !== 0) {
//   //       allProducts = [...temp, prod]
//   //     } else {
//   //       allProducts = [...temp]
//   //     }
//   //   } else if (prod.quantity !== 0) {
//   //     allProducts = [prod]
//   //   }
//   //   window.sessionStorage.setItem(
//   //     this.props.userId,
//   //     JSON.stringify(allProducts)
//   //   )
//   // } create order
// }
