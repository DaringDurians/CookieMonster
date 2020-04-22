import React from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../store/singleUser'

let userId
export class SingleUser extends React.Component {
  componentDidMount() {
    userId = this.props.match.params.userId
    this.props.fetchUser(userId)
  }
  render() {
    const {singleUser} = this.props
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
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleUser: state.singleUser
  }
}
const mapDispatch = dispatch => ({
  fetchUser: () => dispatch(fetchUser(userId))
})

export default connect(mapState, mapDispatch)(SingleUser)
