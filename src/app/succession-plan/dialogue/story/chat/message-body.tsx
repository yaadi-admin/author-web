'use client';

import React, { useRef, useEffect } from 'react';


import { Text } from 'rizzui';

import { ThreadEvents } from './types';
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages";

interface MessageBodyProps {
  messages: ThreadMessage[],
  promptStatus: ThreadEvents | '',
  initialPromptStatus: ThreadEvents | '',
  isUserSpeaking: 'no' | 'yes' | 'done',
  step: number,
}

import { marked } from 'marked';
import './message.css';


export default React.memo(function MessageBody(props: MessageBodyProps) {
  const { messages = [], promptStatus, initialPromptStatus, isUserSpeaking, step } = props;

  const latestMessageRef = useRef<HTMLDivElement | null>(null);



  const userSpeaking = isUserSpeaking === 'yes' ? true : false
  const botThinking = promptStatus && (promptStatus !== ThreadEvents.THREAD_MESSAGE_COMPLETED);

  const size = messages.length;


  useEffect(() => {

    if (botThinking || userSpeaking) {
      if (latestMessageRef && latestMessageRef.current) {
        latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (messages) {
      const lMessage = messages[messages.length - 1]?.id;
      const element = document.getElementById(lMessage);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

  }, [messages, latestMessageRef, botThinking, userSpeaking, step]);



  if (initialPromptStatus !== ThreadEvents.THREAD_MESSAGE_COMPLETED) {
    return (
      <LoadingDots role='assistant' />
    )
  }


  // console.log('user', userSpeaking, 'bot', botThinking)




  if (size > 0) {
    return (
      <div>
        {messages.filter((val, index) => {

          // if (index === 0) {
          //   return false;
          // }
          // @ts-ignore
          if (val?.content?.[0]?.text?.value) {
            // @ts-ignore
            return !val.content[0].text.value.includes('You must synthesize all of the information')
          }
          return true;
        })
          .map((message, index) => {
            const lines = message?.content[0]?.type === "text"
              ? message?.content[0]?.text?.value.split('\n')
              : []

            const markdown = lines.map((line, index) => {
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
            return (
              <div
                id={message?.id}
                ref={index === size - 2 ? userSpeaking || botThinking ? null : latestMessageRef : null}
                role={message?.role}
                key={`${message?.id}-${index}`}>
                <div style={{
                  marginTop: '5%',
                  marginBottom: '5%',
                }} className='flex flex-col'>
                  <div
                    style={{
                      marginLeft: role === "user" ? '30%' : '0%',
                      marginRight: role === "user" ? '0%' : '30%',
                      backgroundColor: role === "user" ? '#1abc9c' : '#246B94',
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
          )
        }

        <div
          ref={userSpeaking ? latestMessageRef : null}
          role={'user'}
          style={userSpeaking ? { display: 'block' } : { display: 'none' }}
        >
          <div style={{
            marginTop: '5%',
            marginBottom: '5%',
          }} className='flex flex-col'>
            <LoadingDots role={'user'} />
          </div>
        </div>

        <div
          ref={botThinking ? latestMessageRef : null}
          role={'assistant'}
          style={botThinking ? { display: 'block' } : { display: 'none' }}
        >
          <div style={{
            marginTop: '5%',
            marginBottom: '5%',
          }} className='flex flex-col'>
            <LoadingDots role={'assistant'} />
          </div>
        </div>

      </div>
    );
  }
}, (prevProps, nextProps) => {
  return (
    prevProps.messages.length === nextProps.messages.length &&
    prevProps.promptStatus === nextProps.promptStatus &&
    prevProps.initialPromptStatus === nextProps.initialPromptStatus &&
    prevProps.isUserSpeaking === nextProps.isUserSpeaking
  );
})






function LoadingDots(props: { role: string }) {
  const { role } = props;

  const config = {
    ...(role === 'user' ? { marginLeft: 'auto' } : { marginRight: 'auto' }),
    ...(role === 'user' ? { backgroundColor: '#1abc9c' } : { backgroundColor: '#246B94' }),
  };

  return (
    <div>
      <div style={{ marginTop: '5%', marginBottom: '5%' }}>
        <div style={{
          ...config,
          padding: '10px',
          width: '80px',
          borderRadius: '20px'
        }}>
          <div className="pt-2">
            <div className="flex justify-center items-center space-x-2">
              <div className="bubble w-3 h-3 bg-white rounded-full"></div>
              <div className="bubble w-3 h-3 bg-white rounded-full"></div>
              <div className="bubble w-3 h-3 bg-white rounded-full"></div>
            </div>
            {/* <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-800"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-1600"></div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}