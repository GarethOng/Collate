import Wrapper from '../assets/wrappers/Job.js'
import MessageInfo from './MessageInfo'
import { useAppContext } from '../context/appContext.js'
import moment from 'moment'

const Message = ({ body, from, name, date, link, messageId }) => {
  const onReply = () => {
    window.open(link, '_blank')
  }
  const read = () => {
    markRead(messageId)
    window.location.reload()
  }
  const { markRead } = useAppContext()
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{name.charAt(0)}</div>
        <div className='info'>
          <h4>body: {body.substring(0, 225)}</h4>
          <h4>received from: {name}</h4>
          <h4>{from}</h4>
          <h4>{moment(date).format('dddd, MMMM Do YYYY')}</h4>
          <h4>{moment(date).format('h:mm:ss a')}</h4>
        </div>
      </header>
      <footer>
        <div className='jobs'>
          <div className='actions'>
            <button className='btn' onClick={onReply}>
              reply
            </button>
          </div>
          <div className='actions'>
            <button className='btn' onClick={read}>
              Readed
            </button>
          </div>
        </div>
      </footer>
    </Wrapper>
  )
}

export default Message
