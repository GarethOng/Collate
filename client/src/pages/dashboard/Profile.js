import React from 'react'
import { useState, useEffect } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'

const clientID =
  '780119812951-b6ar68tc7tn51rvgmh4dvc6umj60vasf.apps.googleusercontent.com'
const API_KEY = 'AIzaSyCCc3qbYils2k4-J4xT_Zsd-yyiccDx5wo'
const GMAIL_SCOPE = 'https://mail.google.com'
const Profile = () => {
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    isLoading,
    syncGmail,
    telegramtoken,
    syncTelegram,
  } = useAppContext()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [telegramToken, setTelegramToken] = useState(telegramtoken)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName) {
      // test and remove temporary
      displayAlert()
      return
    }
    updateUser({ name, email, lastName })
  }

  const handleTelegramSubmit = (e) => {
    e.preventDefault()
    if (!telegramToken) {
      displayAlert()
      return
    }
    syncTelegram(telegramToken)
  }

  const onSuccessGoogle = (res) => {
    syncGmail({
      gmail: res.profileObj.email,
      access_token: gapi.auth.getToken().access_token,
    })
  }
  const onFailureGoogle = (res) => {
    syncGmail(undefined)
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: clientID,
        scope: GMAIL_SCOPE,
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  return (
    <React.Fragment>
      <Wrapper>
        <form className='form' onSubmit={handleSubmit}>
          <h3>Profile </h3>
          {showAlert && <Alert />}

          {/* name */}
          <div className='form-center'>
            <FormRow
              type='text'
              name='name'
              value={name}
              handleChange={(e) => setName(e.target.value)}
            />
            <FormRow
              labelText='last name'
              type='text'
              name='lastName'
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
            />
            <FormRow
              type='email'
              name='email'
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <button
              className='btn btn-block'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Please Wait...' : 'save changes'}
            </button>
          </div>
        </form>
      </Wrapper>
      <Wrapper>
        <form className='form'>
          <h3>Sync Account</h3>
          <div className='form-center'>
            <GoogleLogin
              clientId={clientID}
              buttonText='Sync Gmail'
              cookiePolicy='single_host_origin'
              onSuccess={onSuccessGoogle}
              onFailure={onFailureGoogle}
              isSignedIn={true}
            ></GoogleLogin>
          </div>
        </form>
      </Wrapper>
      <Wrapper>
        <form className='form' onSubmit={handleTelegramSubmit}>
          <div className='form-center'>
            <FormRow
              type='password'
              name='Telegram API Key'
              value={telegramToken}
              handleChange={(e) => setTelegramToken(e.target.value)}
            />
            <button
              className='btn btn-block'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Please Wait...' : 'sync Telegram'}
            </button>
          </div>
        </form>
      </Wrapper>
    </React.Fragment>
  )
}

export default Profile
