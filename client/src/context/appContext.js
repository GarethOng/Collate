import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SYNC_GOOGLE_BEGIN,
  SYNC_GOOGLE_SUCCESS,
  SYNC_GOOGLE_ERROR,
  GET_MESSAGES_BEGIN,
  GET_MESSAGES_SUCCESS,
  HANDLE_CHANGE,
  GET_CONTACTS_BEGIN,
  GET_CONTACTS_SUCCESS,
  SET_EDIT_CONTACTS,
  EDIT_CONTACT_BEGIN,
  EDIT_CONTACT_SUCCESS,
  EDIT_CONTACT_ERROR,
  SYNC_TELEGRAM_BEGIN,
  SYNC_TELEGRAM_ERROR,
  SYNC_TELEGRAM_SUCCESS,
} from './action'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const googletoken = localStorage.getItem('googletoken')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  googletoken: googletoken,
  telegramtoken: '',
  keyword: '',
  contactSearch: '',
  messages: [],
  totalMessages: 0,
  gmail: '',
  sort: 'latest',
  contactKeyword: '',
  sortOptions: ['latest', 'negative-positive'],
  contactSort: 'default',
  contactOptions: ['unclassified', 'customer', 'business partner', 'others'],
  filter: 'unclassified',
  contactType: 'unclassified',
  contacts: [],
  totalContacts: 0,
  isEditing: false,
  editContactId: '',
  editContactName: '',
  editContactGmail: '',
  editContactRelationship: '',
  editTelegram: '',
  showRead: 'only unread',
  showReadOption: ['all', 'only unread'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: '/api/v1',
  })

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('googletoken')
    localStorage.removeItem('telegramtoke ')
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser)
      const { user, token } = response.data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser)
      const { user, token } = data

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      })

      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      const { user, token } = data
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  const syncGmail = async (res) => {
    dispatch({ type: SYNC_GOOGLE_BEGIN })
    if (res.access_token !== undefined) {
      localStorage.setItem('googletoken', res.access_token)
      localStorage.setItem('gmail', res.gmail)
      await getGmail()
      dispatch({
        type: SYNC_GOOGLE_SUCCESS,
        payload: { gmail: res.gmail, access_token: res.access_token },
      })
    } else {
      dispatch({ type: SYNC_GOOGLE_ERROR })
    }
    clearAlert()
  }

  const syncTelegram = async (token) => {
    try {
      dispatch({ type: SYNC_TELEGRAM_BEGIN })
      localStorage.setItem('telegramtoken', token)
      await getTelegram()
      dispatch({
        type: SYNC_TELEGRAM_SUCCESS,
        payload: {
          access_token: token,
        },
      })
    } catch (error) {
      dispatch({ type: SYNC_TELEGRAM_ERROR })
    }
  }

  const getGmail = async () => {
    const gmail = localStorage.getItem('gmail')
    const googletoken = localStorage.getItem('googletoken')
    try {
      const payload = {
        gmail,
        googletoken,
      }
      await authFetch.post('/gmail/fetch', payload)
    } catch (error) {
      console.log(error)
    }
  }

  const getTelegram = async () => {
    try {
      const payload = {
        token: localStorage.getItem('telegramtoken'),
      }
      await authFetch.post('/telegram/fetch', payload)
    } catch (error) {
      console.log(error)
    }
  }
  const getMessages = async () => {
    const { keyword, contactSearch, sort, filter } = state
    dispatch({ type: GET_MESSAGES_BEGIN })
    try {
      const payload = {
        keyword,
        contactSearch,
        sortOption: sort,
        relationship: filter,
      }
      const { data } = await authFetch.post('/message/getMessage', payload)

      const { result } = data
      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: {
          messages: result,
          totalMessages: result.length,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const getContacts = async () => {
    const { contactKeyword, contactType } = state
    let url = `/contact/getAllContact?keyword=${contactKeyword}&relationship=${contactType}`
    dispatch({ type: GET_CONTACTS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { contacts, totalContacts } = data
      dispatch({
        type: GET_CONTACTS_SUCCESS,
        payload: {
          contacts: contacts,
          totalContacts: totalContacts,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const setEditContact = (id) => {
    dispatch({ type: SET_EDIT_CONTACTS, payload: { id } })
  }

  const editContact = async () => {
    dispatch({ type: EDIT_CONTACT_BEGIN })
    try {
      const {
        editContactName,
        editContactGmail,
        editContactRelationship,
        editTelegram,
      } = state
      await authFetch.patch(`/contact/${state.editContactId}`, {
        name: editContactName,
        email: editContactGmail,
        relationship: editContactRelationship,
        telegram: editTelegram,
      })
      dispatch({ type: EDIT_CONTACT_SUCCESS })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_CONTACT_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const markRead = async (messageId) => {
    await authFetch.post('/message/markRead', { messageId })
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        syncGmail,
        syncTelegram,
        getMessages,
        handleChange,
        getContacts,
        setEditContact,
        editContact,
        markRead,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
