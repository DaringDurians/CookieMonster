import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import ProductsForm from './ProductsForm'
import {postProduct, deleteProduct, fetchAllBrownies} from '../store/brownies'
import {Quantity} from './Quantity'

let name
let category
let price
let description
let imgUrl
let brownieId
export class AllBrownies extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchBrownies()
  }
  handleSubmit(event) {
    event.preventDefault()
    name = event.target.name.value
    category = 'Brownie'
    price = parseInt(event.target.price.value) * 100
    description = event.target.description.value
    imgUrl = event.target.imgUrl.value
    this.props.postProduct(name, category, price, description, imgUrl)
  }
  handleDelete(id) {
    brownieId = id
    this.props.deleteProduct(brownieId)
  }
  render() {
    return (
      <div className="allView">
        {this.props.isAdmin ? (
          <ProductsForm handleSubmit={this.handleSubmit} category="Brownie" />
        ) : null}
        {this.props.brownies
          ? this.props.brownies.length
            ? this.props.brownies.map(brownie => {
                return (
                  <div className="dessertBox" key={brownie.id}>
                    <NavLink to={`/brownies/${brownie.id}`}>
                      <div>
                        <h3>{brownie.name}</h3>
                      </div>
                      <div className="allViewImg">
                        <img src={brownie.imgUrl} alt="brownie images" />
                      </div>
                      <div>Price: ${(brownie.price / 100).toFixed(2)}</div>
                    </NavLink>
                    <div>
                      {this.props.isAdmin ? (
                        <button
                          type="button"
                          onClick={() => this.handleDelete(brownie.id)}
                        >
                          X
                        </button>
                      ) : null}
                    </div>
                  </div>
                )
              })
            : 'No Brownies'
          : 'No Brownies'}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  brownies: state.brownies,
  isAdmin: !!state.user.isAdmin
})

const mapDispatchToProps = dispatch => ({
  postProduct: () =>
    dispatch(postProduct(name, category, price, description, imgUrl)),
  fetchBrownies: () => dispatch(fetchAllBrownies()),
  deleteProduct: () => dispatch(deleteProduct(brownieId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBrownies)
