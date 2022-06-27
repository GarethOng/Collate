import React from 'react'
import Wrapper from '../../assets/wrappers/RegisterPage'
import { useState } from 'react'
import { FormRow } from '../../components'
import { useAppContext } from '../../context/appContext.js'
import { MessageContainer, SearchContainer } from '../../components'

function Home() {
  return (
    <>
      <SearchContainer />
      <MessageContainer />
    </>
  )
}

export default Home
