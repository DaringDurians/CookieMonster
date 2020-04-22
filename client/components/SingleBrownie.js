import React from 'react'
import {Button} from 'reactstrap'
import {connect} from 'react-redux'
import {fetchBrownie} from '../store/singleBrownie'

let brownieId
class SingleBrownie extends React.Component {
  componentDidMount() {
    brownieId = this.props.match.params.brownieId
    this.props.fetchBrownie(brownieId)
  }
  render() {
    const {singleBrownie} = this.props
    return (
      <div className="singleBox">
        <div>
          <img src={singleBrownie.imgUrl} alt="doubleChoco" />
        </div>
        <div className="brownieInfo">
          <h3>{singleBrownie.name}</h3>
          <div>
            <p>{singleBrownie.description}</p>
          </div>
          <div>
            <p>Price: {(singleBrownie.price / 100).toFixed(2)}</p>
          </div>
          <div>
            <p>Quantity: </p>
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
    singleBrownie: state.singleBrownie
  }
}
const mapDispatch = dispatch => ({
  fetchBrownie: () => dispatch(fetchBrownie(brownieId))
})

export default connect(mapState, mapDispatch)(SingleBrownie)
