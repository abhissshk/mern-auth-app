import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Singup from './pages/Singup'
import Home from './pages/Home'
import RefreshHandler from './pages/refreshHandler'

function App() {


  const[isAuthenticated,setAuthenticated]=useState(false);

  const PrivateRoute=({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }



  return (
   <>
   
   <div className='App'>

    {/* authrnticate pages routes */}
<RefreshHandler setAuthenticated={setAuthenticated}/>


    <Routes>
      <Route path='/' element={<Navigate to="/login"/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<Singup/>} />
<Route path='/home' 

element={<PrivateRoute element={<Home/>}/>}

/>


    </Routes>
   </div>
   
   </>
  )
}

export default App
