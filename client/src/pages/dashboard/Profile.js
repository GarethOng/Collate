import React from 'react'
import { useState, useEffect } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'

const clientID = ''
const API_KEY = ''
const GMAIL_SCOPE = 'https://mail.google.com'
const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, syncGmail } =
    useAppContext()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [location, setLocation] = useState(user?.location)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !location) {
      // test and remove temporary
      displayAlert()
      return
    }
    updateUser({ name, email, lastName, location })
  }

  const onSuccessGoogle = (res) => {
    syncGmail(gapi.auth.getToken().access_token)
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
  })

  return (
    <React.Fragment>
      <Wrapper>
        <form className='form' onSubmit={handleSubmit}>
          <h3>profile </h3>
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

            <FormRow
              type='text'
              name='location'
              value={location}
              handleChange={(e) => setLocation(e.target.value)}
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
          <h3>sync account</h3>
          <div className='form-center'>
            <GoogleLogin
              clientId={clientID}
              buttonText='Sync Gmail'
              cookiePolicy='single_host_origin'
              onSuccess={onSuccessGoogle}
              onFailure={onFailureGoogle}
              isSignedIn={true}
            ></GoogleLogin>
            <button className='btn'>telegram</button>
            <button className='btn'>instagram</button>
          </div>
        </form>
      </Wrapper>
      <Wrapper>
        <form className='form'>
          <h3>synced account</h3>
        </form>
      </Wrapper>
    </React.Fragment>
  )
}

export default Profile
