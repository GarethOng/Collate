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
  SYNC_TELEGRAM_BEGIN,
  SYNC_TELEGRAM_ERROR,
  SYNC_TELEGRAM_SUCCESS,
  GET_MESSAGES_BEGIN,
  GET_MESSAGES_SUCCESS,
  HANDLE_CHANGE,
  GET_CONTACTS_BEGIN,
  GET_CONTACTS_SUCCESS,
  SET_EDIT_CONTACTS,
  EDIT_CONTACT_BEGIN,
  EDIT_CONTACT_SUCCESS,
  EDIT_CONTACT_ERROR,
} from './action'
import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting...',
    }
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...',
    }
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    }
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === SYNC_GOOGLE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === SYNC_GOOGLE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      googletoken: action.payload.access_token,
      showAlert: true,
      alertType: 'success',
      alertText: 'Gmail Account Synced Successfully!',
    }
  }
  if (action.type === SYNC_GOOGLE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Gmail Account unable to sync!',
    }
  }
  if (action.type === SYNC_TELEGRAM_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === SYNC_TELEGRAM_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      telegramtoken: action.payload.access_token,
      showAlert: true,
      alertType: 'success',
      alertText: 'Telegram Account Synced Successfully!',
    }
  }
  if (action.type === SYNC_TELEGRAM_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Telegram Account unable to sync!',
    }
  }
  if (action.type === GET_MESSAGES_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }
  if (action.type === GET_MESSAGES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      messages: action.payload.messages,
      totalMessages: action.payload.totalMessages,
    }
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    }
  }
  if (action.type === GET_CONTACTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }
  if (action.type === GET_CONTACTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      contacts: action.payload.contacts,
      totalContacts: action.payload.totalContacts,
    }
  }

  if (action.type === SET_EDIT_CONTACTS) {
    const contact = state.contacts.find(
      (contact) => contact._id === action.payload.id
    )
    const { _id, name, gmail, relationship, telegram } = contact
    return {
      ...state,
      isEditing: true,
      editContactId: _id,
      editContactName: name,
      editContactGmail: gmail,
      editContactRelationship: relationship,
      editTelegram: telegram,
    }
  }
  if (action.type === EDIT_CONTACT_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === EDIT_CONTACT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Contact Updated!',
    }
  }
  if (action.type === EDIT_CONTACT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  throw new Error(`no such action: ${action.type}`)
}

export default reducer
