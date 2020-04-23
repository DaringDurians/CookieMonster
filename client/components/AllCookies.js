import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import ProductsForm from './ProductsForm'
import {postProduct} from '../store/cookies'

let name
let category
let price
let description
let imgUrl
export class AllCookies extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    name = event.target.name.value
    category = 'Cookie'
    price = parseInt(event.target.price.value) * 100
    description = event.target.description.value
    imgUrl = event.target.imgUrl.value
    this.props.postProduct(name, category, price, description, imgUrl)
  }
  render() {
    return (
      <div className="allView">
        {this.props.isAdmin ? (
          <ProductsForm handleSubmit={this.handleSubmit} category="Brownie" />
        ) : null}
        {this.props.cookies
          ? this.props.cookies.length
            ? this.props.cookies.map(cookie => {
                return (
                  <div className="dessertBox" key={cookie.id}>
                    <NavLink to={`/cookies/${cookie.id}`}>
                      <div>
                        <h3>{cookie.name}</h3>
                      </div>
                      <div className="allViewImg">
                        <img src={cookie.imgUrl} alt="cookie images" />
                      </div>
                      <div>Price: ${(cookie.price / 100).toFixed(2)}</div>
                    </NavLink>
                    <div>
                      <button type="button">Add To Cart</button>
                    </div>
                  </div>
                )
              })
            : 'No Cookies'
          : 'No Cookies'}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cookies: state.cookies,
  isAdmin: !!state.user.isAdmin
})

const mapDispatchToProps = dispatch => ({
  postProduct: () =>
    dispatch(postProduct(name, category, price, description, imgUrl))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllCookies)
