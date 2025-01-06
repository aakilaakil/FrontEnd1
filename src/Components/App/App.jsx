import { createContext, useState } from 'react'
import './App.css'
import Hen from '../Hooks/Hen'
import { use } from 'react';


export let specificip = createContext();

function App() {

  const[colour,setcolour]=useState(true);
  return (
      <div>
        <h1>
          <marquee>Welcome To DownShifter</marquee>
        </h1>

      <specificip.Provider >
         
      </specificip.Provider> 
      <button>
          To Colour Change
          </button>
      </div>
  )
}

export default App
