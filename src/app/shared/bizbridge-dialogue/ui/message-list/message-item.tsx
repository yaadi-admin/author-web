import React, { useState, useRef, useEffect } from 'react';
import { Text, Avatar, Button } from 'rizzui';
import { assistantImg, BASE_URL } from '@/config/bots';

import { MessageBodyProps, ThreadEvents, ThreadMessage } from './types';
import BubbleLoader from './message-loader';
import Tooltip from '@/components/ui/tooltip';

import './message-body.css';
import { currentSession } from '@/config/session';

import { marked } from 'marked';
import { useModal } from '@/app/shared/modal-views/use-modal';
import axios from 'axios';

const URL = `${BASE_URL}/api/bizbridge/serv/authenticate`;


function MessageItem({
  message,
  index,
  user,
  userSpeaking,
  botThinking,
  size,
  latestMessageRef,
  currentUser,
  assistantId
}: {
  message: ThreadMessage,
  index: number,
  size: number,
  userSpeaking: boolean,
  botThinking: string | boolean,
  latestMessageRef: React.RefObject<HTMLDivElement>,
  currentUser: any,
  assistantId: string,
  user?: { firstName: string }
}) {
  const { openModal, closeModal } = useModal();
  const [reason, setReason] = useState('');
  const lines = message?.content[0]?.type === "text"
    ? message?.content[0]?.text?.value.trim().split('\n')
    : []

  const markdown = lines.map((line: string, index: number) => {
    if (line === '') {
      return '\n';
    }
    if (line.startsWith('### ')) {
      return `#### ${line.substring(3)}\n`;
    }

    return `${line}\n`;
  }).join('\n')

  // Create a custom renderer
  const renderer = new marked.Renderer();

  // Override the link method
  renderer.link = function ({ href, title, text }) {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" title="${title || ''}" style="text-decoration: underline; color: blue;">${text}</a>`;
  };


  const html = marked(markdown, { renderer: renderer, async: false });
  const role = message?.role ? message.role : (index % 2 === 0) ? 'assistant' : 'user';
  const isUser = role === 'user';

  const [responseRate, setResponseRate] = useState('');
  const [hidden, setHidden] = useState(true);
  const onLike = () => {
    setResponseRate('good')
    axios.post(
      URL,
      {
        function: "storeFeedback",
        threadId: message?.thread_id,
        message: message?.content[0]?.text?.value,
        status: 'good', //status of the thump selected
        userID: currentUser?.id,
        userData: currentUser,
      },
      {
        headers: {
          Authorization: 'skl-bhdbjcbcbcbdjb'
        },
      }
    );
  };

  const onDislike = () => {
    setResponseRate('bad');
    axios.post(
      URL,
      {
        function: "storeFeedback",
        threadId: message?.thread_id,
        message: message?.content[0]?.text?.value,
        status: 'bad', //status of the thump selected
        userID: currentUser?.id,
        userData: currentUser,
      },
      {
        headers: {
          Authorization: 'skl-bhdbjcbcbcbdjb'
        },
      }
    );
    setHidden(false);
  };

  const onChangeReason = (r: string) => {
    setReason(r);

  }



  const onSubmitFeedback = (details: string) => {
    axios.post(
      URL,
      {
        function: "storeFeedback",
        threadId: message?.thread_id,
        message: message?.content[0]?.text?.value,
        status: 'bad', //status of the thump selected
        userID: currentUser?.id,
        userData: currentUser,
        reason: reason,
        feedback: details,
      },
      {
        headers: {
          Authorization: 'skl-bhdbjcbcbcbdjb'
        },
      }
    );
    setHidden(false);
    closeModal();
  };


  const handleOpenModal = () => {
    openModal({
      customSize: '600px',
      view: <FeedbackModal
        reason={reason}
        closeModal={closeModal}
        onChangeReason={onChangeReason}
        onSubmitFeedback={onSubmitFeedback}
      />,
    })
  };


  return (
    <div
      id={message?.id}
      ref={index === size - 2 ? userSpeaking || botThinking ? null : latestMessageRef : null}
      role={message?.role}
      key={`${message?.id}-${index}`}
      style={{
        display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', marginBottom: '5%'
        ,
        marginLeft: '5%',
        marginRight: '5%',
        position: 'relative',
      }}
    >


      <Avatar
        key={`${message?.id}-${index}`}
        src={!isUser ? assistantImg[assistantId] :
          currentUser?.profilePictureURL
          // 'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/user.png?alt=media&token=335fd44b-a788-4ee4-b764-068fac1365b5'

        }
        name="avatar"
        initials={`${user ? user?.firstName?.[0] : currentUser?.firstName?.[0]}${currentUser?.lastName?.[0] || ''}`}
        //@ts-ignore
        color="none"
        className={` ${isUser ? 'ml-4 bg-secondary text-white' : 'mr-4 bg-white'} object-contain`}
      >

      </Avatar>
      <div className='flex flex-col  
    ' style={{
        }}>
        <div
          style={{
            alignSelf: isUser ? 'flex-end' : 'flex-start',
          }}
        >
          <div className="ml-1 mt-1 grid gap-2 leading-relaxed xl:ml-1 2xl:mt-1">
            <Text id="message-bubble" className='text-black font-regular font-secondary' dangerouslySetInnerHTML={{ __html: html }} style={{
            }} >
            </Text>
            {!isUser &&
              <span className='flex'>

                {responseRate === 'bad' ? null :
                  <Tooltip key={`like-${index}`} title="" body="Good Response" width={100}>
                    <button
                      className='rounded-lg  hover:bg-gray-200'
                      type='button'
                      onClick={onLike}
                      disabled={responseRate === 'good'}
                    >
                      <span className="flex h-[30px] w-[30px] items-center justify-center">
                        {responseRate === 'good' ?
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md-heavy"><path d="M12.592 2.50386C12.8047 2.13014 13.2317 1.935 13.652 2.01942C15.5627 2.40314 16.7246 4.36079 16.1516 6.23085L15.303 9L17.0142 9C19.6409 9 21.5485 11.5079 20.8574 14.0525L19.4994 19.0525C19.0267 20.7927 17.4526 22 15.6562 22H9.96721C8.869 21.9979 7.97939 21.1033 7.97939 20V9H8.31734C8.67472 9 9.0047 8.80771 9.18201 8.49613L12.592 2.50386Z" fill="currentColor"></path><path d="M5.98763 9C4.33761 9 3 10.3431 3 12V19C3 20.6569 4.33761 22 5.98763 22H6.52055C6.18162 21.4116 5.98763 20.7286 5.98763 20V9Z" fill="currentColor"></path></svg>
                          :
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md-heavy"><path fillRule="evenodd" clipRule="evenodd" d="M12.1318 2.50389C12.3321 2.15338 12.7235 1.95768 13.124 2.00775L13.5778 2.06447C16.0449 2.37286 17.636 4.83353 16.9048 7.20993L16.354 8.99999H17.0722C19.7097 8.99999 21.6253 11.5079 20.9313 14.0525L19.5677 19.0525C19.0931 20.7927 17.5124 22 15.7086 22H6C4.34315 22 3 20.6568 3 19V12C3 10.3431 4.34315 8.99999 6 8.99999H8C8.25952 8.99999 8.49914 8.86094 8.6279 8.63561L12.1318 2.50389ZM10 20H15.7086C16.6105 20 17.4008 19.3964 17.6381 18.5262L19.0018 13.5262C19.3488 12.2539 18.391 11 17.0722 11H15C14.6827 11 14.3841 10.8494 14.1956 10.5941C14.0071 10.3388 13.9509 10.0092 14.0442 9.70591L14.9932 6.62175C15.3384 5.49984 14.6484 4.34036 13.5319 4.08468L10.3644 9.62789C10.0522 10.1742 9.56691 10.5859 9 10.8098V19C9 19.5523 9.44772 20 10 20ZM7 11V19C7 19.3506 7.06015 19.6872 7.17071 20H6C5.44772 20 5 19.5523 5 19V12C5 11.4477 5.44772 11 6 11H7Z" fill="currentColor"></path></svg>
                        }
                      </span>
                    </button>
                  </Tooltip>
                }
                <div className='flex flex-col'>

                  {responseRate === 'good' ? null :
                    <div>

                      <Tooltip key={`dislike-${index}`} title="" body="Bad Response" width={100}>
                        <button type="button" disabled={responseRate === 'bad'} className='rounded-lg  hover:bg-gray-200' onClick={onDislike}>
                          <span className="flex h-[30px] w-[30px] items-center justify-center">
                            {responseRate === 'bad' ?

                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md-heavy"><path d="M11.4079 21.4961C11.1953 21.8698 10.7683 22.0649 10.348 21.9805C8.4373 21.5968 7.27541 19.6391 7.84844 17.7691L8.69697 14.9999L6.98577 14.9999C4.35915 14.9999 2.45151 12.492 3.14262 9.94747L4.50063 4.94747C4.97329 3.20722 6.54741 1.99994 8.34378 1.99994H14.0328C15.131 2.00207 16.0206 2.89668 16.0206 3.99994V14.9999H15.6827C15.3253 14.9999 14.9953 15.1922 14.818 15.5038L11.4079 21.4961Z" fill="currentColor"></path><path d="M18.0124 14.9999C19.6624 14.9999 21 13.6568 21 11.9999V4.99994C21 3.34308 19.6624 1.99994 18.0124 1.99994H17.4794C17.8184 2.58829 18.0124 3.27136 18.0124 3.99994V14.9999Z" fill="currentColor"></path></svg>

                              :
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md-heavy"><path fillRule="evenodd" clipRule="evenodd" d="M11.8727 21.4961C11.6725 21.8466 11.2811 22.0423 10.8805 21.9922L10.4267 21.9355C7.95958 21.6271 6.36855 19.1665 7.09975 16.7901L7.65054 15H6.93226C4.29476 15 2.37923 12.4921 3.0732 9.94753L4.43684 4.94753C4.91145 3.20728 6.49209 2 8.29589 2H18.0045C19.6614 2 21.0045 3.34315 21.0045 5V12C21.0045 13.6569 19.6614 15 18.0045 15H16.0045C15.745 15 15.5054 15.1391 15.3766 15.3644L11.8727 21.4961ZM14.0045 4H8.29589C7.39399 4 6.60367 4.60364 6.36637 5.47376L5.00273 10.4738C4.65574 11.746 5.61351 13 6.93226 13H9.00451C9.32185 13 9.62036 13.1506 9.8089 13.4059C9.99743 13.6612 10.0536 13.9908 9.96028 14.2941L9.01131 17.3782C8.6661 18.5002 9.35608 19.6596 10.4726 19.9153L13.6401 14.3721C13.9523 13.8258 14.4376 13.4141 15.0045 13.1902V5C15.0045 4.44772 14.5568 4 14.0045 4ZM17.0045 13V5C17.0045 4.64937 16.9444 4.31278 16.8338 4H18.0045C18.5568 4 19.0045 4.44772 19.0045 5V12C19.0045 12.5523 18.5568 13 18.0045 13H17.0045Z" fill="currentColor"></path></svg>
                            }
                          </span>
                        </button>

                      </Tooltip>
                    </div>
                  }
                  {responseRate === 'bad' && !hidden ?

                    <div className="min-h-[96px] w-full" >
                      <div className="relative mt-2 flex w-full flex-col gap-3 rounded-lg border border-token-border-light p-4"><button onClick={() => setHidden(true)} type="button" className="absolute right-4 top-4 text-sm font-bold"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md text-token-text-secondary hover:text-token-text-primary"><path fillRule="evenodd" clipRule="evenodd" d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z" fill="currentColor"></path></svg></button><div className="text-sm text-token-text-secondary">Tell us more:</div><div className="flex flex-wrap gap-3">
                        {[
                          "Shouldn't have used Memory",
                          "Don't like the style",
                          "Not factually correct",
                          "Didn't fully follow instructions",
                          "Refused when it shouldn't have",
                          "Being lazy",
                          "Unsafe or problematic",
                          "Other",
                        ].map((label) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => {
                              onChangeReason(label)
                              axios.post(
                                URL,
                                {
                                  function: "storeFeedback",
                                  threadId: message?.thread_id,
                                  message: message?.content[0]?.text?.value,
                                  status: 'bad', //status of the thump selected
                                  userID: currentUser?.id,
                                  userData: currentUser,
                                  reason: label,
                                },
                                {
                                  headers: {
                                    Authorization: 'skl-bhdbjcbcbcbdjb'
                                  },
                                }
                              );
                            }}
                            className={`rounded-lg border border-token-border-light px-3 py-1 text-sm text-token-text-secondary hover:text-token-text-primary hover:bg-token-main-surface-secondary ${reason === label && 'text-white bg-black'}`}
                          >
                            {label}
                          </button>
                        ))}
                        <button type="button" className="rounded-lg border border-token-border-light px-3 py-1 text-sm text-token-text-secondary hover:text-token-text-primary hover:bg-token-main-surface-secondary" onClick={handleOpenModal}>More...</button>
                      </div>
                      </div></div>
                    : null}
                </div>

              </span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem


function FeedbackModal({ closeModal, onSubmitFeedback }: any) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  return (
    <div
      role="dialog"
      id="radix-ric"
      aria-describedby="radix-rie"
      aria-labelledby="radix-rid"
      data-state="open"
      className="popover relative start-1/2 col-auto col-start-2 row-auto row-start-2 h-full w-full bg-token-main-surface-primary text-start ltr:-translate-x-1/2 rtl:translate-x-1/2 rounded-2xl shadow-xl flex flex-col overflow-hidden focus:outline-none max-w-xl"
      style={{ pointerEvents: "auto" }}
    >
      <div className="px-4 pb-4 pt-5 sm:p-6 flex items-center justify-between border-b border-black/10 dark:border-white/10">
        <div className="flex">
          <div className="flex items-center">
            <div className="flex grow flex-col gap-1">
              <h2 id="radix-rid" className="text-lg font-semibold leading-6 text-token-text-primary">
                Provide additional feedback
              </h2>
            </div>
          </div>
        </div>
        <button
          data-testid="close-button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent hover:bg-token-main-surface-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-token-text-quaternary focus-visible:ring-offset-1 focus-visible:ring-offset-transparent dark:hover:bg-token-main-surface-tertiary sm:mt-0"
          aria-label="Close"
          onClick={closeModal}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-md"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4 sm:p-6">
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap gap-3">
              {[
                "Shouldn't have used Memory",
                "Don't like the style",
                "Not factually correct",
                "Didn't fully follow instructions",
                "Refused when it shouldn't have",
                "Being lazy",
                "Unsafe or problematic",
                "Other",
              ].map((label) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => {
                    setReason(label)
                  }}
                  className={`rounded-lg border border-token-border-light px-3 py-1 text-sm text-token-text-secondary hover:text-token-text-primary hover:bg-token-main-surface-secondary ${reason === label && 'text-white bg-black'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-md border shadow-none border-token-border-medium px-3 py-2 focus-within:border-token-border-xheavy focus-within:ring-1 focus-within:ring-token-text-secondary mt-6">
          <label htmlFor="feedback" className="block text-xs font-semibold text-token-text-primary"></label>
          <div className="relative">
            <input
              id="feedback"
              className="block w-full border-0 p-0 placeholder-gray-500 shadow-none outline-none focus-within:shadow-none focus-within:outline-none focus-within:ring-0 focus:border-none focus:ring-0 sm:text-sm bg-token-main-surface-primary text-token-text-primary"
              placeholder="(Optional) Feel free to add specific details"
              type="text"
              name="feedback"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row-reverse mt-5 sm:mt-4">
          <Button
            className=""
            disabled={details.length === 0 ? true : false}
            type="button"
            onClick={() => onSubmitFeedback(details)}
          >
            <div className="flex items-center justify-center">Submit</div>
          </Button>
        </div>
      </div>
    </div>
  )
}