import React, { createContext, useState } from 'react'
import BrachMain from './BrachMain';
import './ButtonMain.css'

export const TriggerButton = createContext();

const ButtonMain = () => {

    const [color , setColor] = useState(true);

  return (
    <div>
          <TriggerButton.Provider value={color} >
            <BrachMain/>
      </TriggerButton.Provider>
      <center>
             <button onClick={()=> {setColor(!color)}}>Click For Adreline</button>
      </center>
    
    </div>
  )
}

export default ButtonMain
