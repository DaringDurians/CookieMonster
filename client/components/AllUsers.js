import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

export const AllUsers = props => {
  console.log(props)
  return (
    <div>
      <div className="usersBox">
        <h4>Current Users</h4>
        {props.users && props.users.length
          ? props.users.map(user => {
              return (
                <div key={user.id}>
                  <NavLink to={`/users/${user.id}`}>{user.name}</NavLink>
                </div>
              )
            })
          : 'No Users'}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps, null)(AllUsers)
