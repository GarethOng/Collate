import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Message from './Message'
import Wrapper from '../assets/wrappers/JobsContainer'

function MessageContainer() {
  const {
    getMessages,
    messages,
    totalMessages,
    isLoading,
    keyword,
    contactSearch,
    sort,
    filter,
    showRead,
  } = useAppContext()
  useEffect(() => {
    getMessages()
  }, [keyword, contactSearch, sort, filter])
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
      <div className='jobs'>
        {messages.map((message) => {
          if (showRead === 'all' && message.body) {
            return (
              <Message
                key={messages.indexOf(message)}
                body={message.body}
                email={message.email}
                name={message.name}
                date={message.date}
                link={message.link}
                messageId={message.messageId}
                messageSource={message.messageSource}
                from={
                  message.messageSource === 'gmail'
                    ? message.email
                    : message.handle
                }
              />
            )
          }
          if (showRead === 'only unread' && !message.read && message.body) {
            return (
              <Message
                key={messages.indexOf(message)}
                body={message.body}
                email={message.email}
                name={message.name}
                date={message.date}
                link={message.link}
                messageId={message.messageId}
                messageSource={message.messageSource}
                from={
                  message.messageSource === 'gmail'
                    ? message.email
                    : message.handle
                }
              />
            )
          }
        })}
      </div>
    </Wrapper>
  )
}

export default MessageContainer
