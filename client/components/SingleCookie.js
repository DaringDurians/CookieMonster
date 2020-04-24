import React from 'react'
import {Button} from 'reactstrap'
import {connect} from 'react-redux'
import {fetchCookie} from '../store/singleCookie'
import {Quantity} from './Quantity'

let cookieId
export class SingleCookie extends React.Component {
  componentDidMount() {
    cookieId = this.props.match.params.cookieId
    this.props.fetchCookie(cookieId)
  }
  render() {
    const {singleCookie} = this.props
    return (
      <div className="singleBox">
        <div id="singleCookieImage">
          <img src={singleCookie.imgUrl} alt="doubleChoco" />
        </div>
        <div className="cookieInfo">
          <h3>{singleCookie.name}</h3>
          <div>
            <p>{singleCookie.description}</p>
          </div>
          <div>
            <p>Price: {(singleCookie.price / 100).toFixed(2)}</p>
          </div>
          <div>
            <p>Quantity: </p>
          </div>
          <div>
            <Quantity />
          </div>
          <div>
            <Button color="info" type="button" id="button">
              Add To Cart
            </Button>{' '}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleCookie: state.singleCookie
  }
}
const mapDispatch = dispatch => ({
  fetchCookie: () => dispatch(fetchCookie(cookieId))
})

export default connect(mapState, mapDispatch)(SingleCookie)
