import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utlis';
import { ToastContainer } from 'react-toastify';

function Home() {

  const [loggedInUser,setLoggedInUser]=useState('');
   const [products,setProducts]=useState([]);
  const navigate=useNavigate()

  useEffect(()=>{
  // getting local storage data

  setLoggedInUser(  localStorage.getItem("loggedInUser"))


  },[])

  const handleLogout=(e)=>{
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout")
    setTimeout(() => {
      navigate("/login")
    }, 1000);


  }

  const fetchProducts=async()=>{
    try{

const url = "https://your-backend.onrender.com/products";

      const headers={
        "Authorization" : localStorage.getItem('token')

      }

      const response=await fetch(url,{headers})
      const result=await response.json();
      console.log(result)
      setProducts(result)

    }catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{

    fetchProducts()

  },[])

  return (
    <div style={{display:'flex',flexDirection:"column", alignItems:"center"}}>
      <h1>Welcome  {loggedInUser} to our website</h1>
      <button onClick={handleLogout}>Logout</button>
{/* 

// authenticate products
      <div>
  {products && products.map((item, index) => (
    <ul key={index}>
      <span>{item.name} : {item.price}</span>
    </ul>
  ))}
</div> */}


      <ToastContainer/>
    </div>
  )
}

export default Home
