import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
function SharedLayout() {
  return (
    <Wrapper>
      <nav>
        <Link to='home'>home </Link>
        <Link to='profile'>profile </Link>
        <Link to='setting'>setting </Link>
      </nav>
      <Outlet />
    </Wrapper>
  )
}

export default SharedLayout
