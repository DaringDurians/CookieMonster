import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

export const AllUsers = props => {
  console.log(props)
  return (
    <div>
      <div>
        {props.users
          ? props.users.length
            ? props.users.map(user => {
                return (
                  <div className="usersBox" key={user.id}>
                    <NavLink to={`/users/${user.id}`}>
                      <div>{user.name}</div>
                    </NavLink>
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
