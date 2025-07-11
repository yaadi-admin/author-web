import React from 'react'
import { Button } from 'rizzui'

function ErrorPage() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Something went wrong... Please contact the support</p>
      <Button>Contact</Button>
    </div>
  )
}

export default ErrorPage