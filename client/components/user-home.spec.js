/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const orders = [
  {
    id: 2,
    userId: 7,
    orderDate: '2020-04-27T23:52:35.117Z',
    active: false,
    total: null,
    createdAt: '2020-04-27T23:52:35.242Z',
    updatedAt: '2020-04-27T23:52:35.242Z',
    products: []
  }
]

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome orders={orders} name="Cody" />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Time to nom nom nom, Cody!')
  })
})
