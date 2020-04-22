import React from 'react'
import {connect} from 'react-redux'

export const AllUsers = props => {
  return (
    <div>
      <div>
        {props.users
          ? props.users.length
            ? props.users.map(user => {
                return (
                  <div key={user.id}>
                    <div>Name: {user.name}</div>
                  </div>
                )
              })
            : 'No Users'
          : 'No Users'}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps, null)(AllUsers)
