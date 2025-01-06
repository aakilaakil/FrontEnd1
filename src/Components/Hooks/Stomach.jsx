import React, { useContext } from 'react'
import { specificip } from '../App/App'

function Stomach() {
    
let content = useContext(specificip)
  return (
    <div>
  <h1>Egg Reached Stomach But Needed {content}</h1>
    </div>
  )
}

export default Stomach
