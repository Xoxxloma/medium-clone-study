import React from 'react';

const BackendErrorMessages = ({ backendsErrors }) => {

  const errorMessages = Object.keys(backendsErrors).map(name => {
    const message = backendsErrors[name];
    return `${name} ${message}`
  })
  console.log(errorMessages)
  return (
    <ul className="text-danger font-weight-bold">
      {errorMessages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  )
}

export default BackendErrorMessages;