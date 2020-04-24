import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Quantity} from './Quantity'

export const AllBrownies = props => {
  return (
    <div className="allView">
      {props.brownies
        ? props.brownies.length
          ? props.brownies.map(brownie => {
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
                    add quantity component here!
                    {/*<Quantity /> */}
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
  )
}

const mapStateToProps = state => ({
  brownies: state.brownies
})

export default connect(mapStateToProps, null)(AllBrownies)
