import React from 'react'
import { TriggerButton } from './ButtonMain'
import { useContext } from 'react'

const Branch3 = () => {
    const val= useContext(TriggerButton);
  return (
    <div>
      <h1 style={{
        backgroundColor:val?"red":"black"
      }}>
        Welcome to Downshifters 
      </h1>
    </div>
  )
}

export default Branch3
