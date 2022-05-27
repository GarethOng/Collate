import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import main from '../assets/images/landingphoto.svg'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Message <span>tracking</span> app
          </h1>
          <p>Your all-in-one message manager!</p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='collate' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
