import { marked } from 'marked';
import React, { useState, useRef } from 'react'
import { Button, Avatar, Text } from 'rizzui'

function Transcript({ transcript }: any) {
  const divRef = useRef(null);

  const [isOpen, setOpen] = useState(false);
  const onToggle = () => {
    setOpen((prev) => {
      const newState = !prev;
      if (newState) {
        // Wait for the `div` to be visible before scrolling
        setTimeout(() => {
          if (divRef.current) {
            // @ts-ignore
            divRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 0);
      }
      return newState;
    });
  };
  return (
    <div className='flex flex-col'>
      <Button className="my-4" variant='flat' onClick={onToggle}>
        {isOpen ? 'Hide' : 'View'} Transcript
      </Button>
      <div
        ref={divRef}

        style={{ display: isOpen ? 'block' : 'none' }}
        className=''>
        {transcript.length === 0 ? 'No transcript found' : transcript.map((message: any, index: any) => {

          const lines = message?.content.trim().split('\n');

          const markdown = lines.map((line: string, index: any) => {
            if (line === '') {
              return '\n';
            }
            if (line.startsWith('### ')) {
              return `#### ${line.substring(3)}\n`;
            }

            return `${line}\n`;
          }).join('\n')

          const html = marked(markdown, { async: false });


          const role = message?.role ? message.role : (index % 2 === 0) ? 'assistant' : 'user';
          const isUser = role === 'user';
          return (
            <div
              id={message?.id}
              role={message?.role}
              key={`${message?.id}-${index}`}>
              <div style={{
                display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', marginBottom: '5%'
                ,
                marginLeft: '2%',
                marginRight: '2%',
              }} className='flex flex-col'>
                <Avatar
                  key={`${message?.id}-${index}`}
                  name="avatar"
                  initials={isUser ? 'U' : 'A'}
                  //@ts-ignore
                  color="none"
                  className={`${isUser ? 'ml-4 bg-gray-200 border' : 'mr-4 bg-gray-200'} `}

                // className={`${isUser ? 'ml-auto bg-gray-200 border' : 'mr-auto bg-gray-200 border'} mb-4`}
                />
                <div
                  style={{
                    marginLeft: isUser ? '30%' : '0%',
                    marginRight: isUser ? '0%' : '30%',
                    backgroundColor: isUser ? '#1abc9c' : '#246B94',
                    padding: '10px', borderRadius: '10px'
                  }}>
                  <div className="ml-1 mt-1 grid gap-2 leading-relaxed xl:ml-1 2xl:mt-1">
                    <Text id="message-bubble" className='text-white' dangerouslySetInnerHTML={{ __html: html }} style={{ color: 'white' }} >
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        )}
      </div>
    </div>
  )
}

export default Transcript