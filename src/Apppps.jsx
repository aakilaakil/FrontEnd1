import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import CreateUser from './userManagement/CreateUser'
import User from './userManagement/User'
import DeleteUser from './userManagement/DeleteUser'
import SearchUser from './userManagement/SearchUser'
import UpdateUser from './userManagement/UpdateUser'

function Apppps() {
  return (
    <div>
      <marquee><h1>Hello EveryOne !</h1> </marquee>

      
        <BrowserRouter>
          <nav>
          </nav>
          <Routes>
            <Route path= '/' element={<User/>}/> 
            <Route path= '/createuser' element={<CreateUser/>}/> 
            <Route path= '/deleteuser' element={<DeleteUser/>}/> 
            <Route path= '/searchuser' element={<SearchUser/>}/> 
            <Route path= '/updateuser' element={<UpdateUser/>}/>
          </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default Apppps
