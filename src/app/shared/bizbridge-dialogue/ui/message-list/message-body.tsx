'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Text, Avatar } from 'rizzui';
import { assistantImg } from '@/config/bots';

import { MessageBodyProps, ThreadEvents } from './types';
import BubbleLoader from './message-loader';
import Tooltip from '@/components/ui/tooltip';

import './message-body.css';
import { currentSession } from '@/config/session';
import MessageItem from './message-item';


function MessageBody(props: MessageBodyProps) {
  const { messages = [], promptStatus, initialPromptStatus, user, isUserSpeaking, step, assistantId, isRequestingStream } = props;
  const latestMessageRef = useRef<HTMLDivElement | null>(null);

  const userSpeaking = isUserSpeaking === 'yes' ? true : false
  const botThinking = promptStatus && (promptStatus !== ThreadEvents.THREAD_MESSAGE_COMPLETED);
  const size = messages.length;

  const currentUser = currentSession() as any;

  // console.log(messages);

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
      <div style={{
        marginLeft: '5%',
        marginRight: '5%',
      }} className='flex flex-col'>

        <BubbleLoader role='assistant' />
      </div>
    )
  }


  if (size > 0) {
    return (
      <div>
        {messages.filter((val, index) => {
          // @ts-ignore
          if (val?.content?.[0]?.text?.value) {
            // @ts-ignore
            return !val.content[0].text.value.includes('You must synthesize all of the information');
          }
          return true;
        })
          .map((message, index) => {
            return (
              <MessageItem
                key={index}
                user={user}
                message={message}
                index={index}
                size={size}
                latestMessageRef={latestMessageRef}
                userSpeaking={userSpeaking}
                botThinking={botThinking}
                currentUser={currentUser}
                assistantId={assistantId}
              />
            )
          })
        }

        <div
          ref={userSpeaking ? latestMessageRef : null}
          role={'user'}
          style={userSpeaking ? { display: 'block' } : { display: 'none' }}
        >
          <div style={{
            marginTop: '5%',
            marginBottom: '5%',
            marginLeft: '5%',
            marginRight: '5%',
          }} className='flex flex-col'>
            <BubbleLoader role={'user'} />
          </div>
        </div>

        <div
          ref={botThinking ? latestMessageRef : null}
          role={'assistant'}
          style={isRequestingStream ? { display: 'block' } : { display: 'none' }}
        >
          <div style={{
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: '5%',
            marginBottom: '5%',
          }} className='flex flex-col'>
            <BubbleLoader role={'assistant'} />
          </div>
        </div>
      </div>

    );
  }
}



export default React.memo(MessageBody, (prevProps, nextProps) => {
  return (
    prevProps.messages.length === nextProps.messages.length &&
    prevProps.promptStatus === nextProps.promptStatus &&
    prevProps.initialPromptStatus === nextProps.initialPromptStatus &&
    prevProps.isUserSpeaking === nextProps.isUserSpeaking
  );
})