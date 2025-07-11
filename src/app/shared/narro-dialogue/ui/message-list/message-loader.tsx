import React from 'react'

interface MessageLoaderProps {
  role: 'user' | 'assistant'
}


function MessageLoader(props: MessageLoaderProps) {
  const { role } = props;

  const config = {
    ...(role === 'user' ? { marginLeft: 'auto' } : { marginRight: 'auto' }),
    ...(role === 'user' ? { backgroundColor: '#000000' } : { backgroundColor: '#5736FB' }),
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageLoader