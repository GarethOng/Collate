import { FaUserAlt } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'
import { AiFillProfile } from 'react-icons/ai'

const links = [
  { id: 1, text: 'home', path: '/', icon: <FaHome /> },
  { id: 2, text: 'profile', path: 'profile', icon: <FaUserAlt /> },
  { id: 3, text: 'contact', path: 'setting', icon: <AiFillProfile /> },
]

export default links
