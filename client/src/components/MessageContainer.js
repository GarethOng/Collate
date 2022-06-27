import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Message from './Message'
import Wrapper from '../assets/wrappers/SearchContainer'

function MessageContainer() {
  const { getMessages, messages, totalMessages, isLoading, keyword } =
    useAppContext()
  useEffect(() => {
    getMessages()
  }, [keyword])
  if (isLoading) {
    return <Loading center />
  }
  if (totalMessages === 0) {
    return (
      <Wrapper>
        <h2>No messages to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalMessages} Message{totalMessages > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {messages.map((message) => {
          return (
            <Message
              key={messages.indexOf(message)}
              body={message.body}
              email={message.email}
              name={message.name}
              date={message.date}
              link={message.link}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

export default MessageContainer
