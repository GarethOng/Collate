import { FaUserAlt } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'

const links = [
  { id: 1, text: 'home', path: '/', icon: <FaHome /> },
  { id: 2, text: 'profile', path: 'profile', icon: <FaUserAlt /> },
  { id: 3, text: 'setting', path: 'setting', icon: <AiFillSetting /> },
]

export default links
