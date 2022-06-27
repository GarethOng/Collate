import { FaLocationArrow, FaBriefcase, FaReply } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import MessageInfo from './MessageInfo'

const Message = ({ body, email, name, date, link }) => {
  const onReply = () => {
    window.open(link, '_blank')
  }
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{name.charAt(0)}</div>
        <div className='info'>
          <h5>{body}</h5>
          <h5>
            Received from: {name} <p>{email}</p>
          </h5>
          <p>{date}</p>
          <div className='content-center'>
            <button className='btn btn-block' onClick={onReply}>
              reply
            </button>
          </div>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'></div>
        <footer>
          <div className='actions'></div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Message
