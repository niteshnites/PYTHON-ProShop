import React from 'react'
import { Alert } from 'react-bootstrap'

export function Message({ variant, children }) {  // Destructure props
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  )
}

export default Message
