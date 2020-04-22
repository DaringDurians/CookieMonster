import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

export const AllBrownies = props => {
  return (
    <div>
      <div>
        {props.brownies
          ? props.brownies.length
            ? props.brownies.map(brownie => {
                return (
                  <div key={brownie.id}>
                    <div>
                      <NavLink to={`/brownies/${brownie.id}`}>
                        Name: {brownie.name}
                      </NavLink>
                    </div>
                    <div>
                      Price: {`$${Number((brownie.price / 100).toFixed(2))}`}
                    </div>
                    <div>Description: {brownie.description}</div>
                    <div>
                      <img src={brownie.imgUrl} alt="brownie images" />
                    </div>
                    <div>
                      <button type="button">Add To Cart</button>
                    </div>
                  </div>
                )
              })
            : 'No Brownies'
          : 'No Brownies'}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  brownies: state.brownies
})

export default connect(mapStateToProps, null)(AllBrownies)
