import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import ThemeBtn from '../components/ThemeBtn'
import { UserContext } from '../context/UserConstext'
import { BACKEND_URL } from '../pages/exports';


function Nav() {
  const {setUserInfo, userInfo} = useContext(UserContext)
  useEffect(()=>{
    fetch(`${BACKEND_URL}/profile`,{
      credentials: 'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
      })
    })
  },[])

  async function logout(){
    const gone = await fetch(`${BACKEND_URL}/logout`,{
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null)
  }
  const username = userInfo?.username
  return (
    <div>
    <main> 
    <header>
      <span className='social'>
      <img src="/images/facebook.png" alt="" />
      <img src="/images/instagram.png" alt="" />
      <img src="/images/youtube.png" alt="" />
      <img src="/images/tiktok.png" alt="" className='tiktok dark:bg-white'/>
      </span>
      <Link to="/" className='logo dark:text-white'>Blogger</Link>
      <nav className='dark:text-white'>
        <ThemeBtn/>
        <Link to="/">HomePage</Link>
        {username &&(
          <>
            <span>Hello, {username}</span>
            <Link to="/create" className='blog_item'>NEW-BLOG</Link>
            <Link onClick={logout}>LogOut</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">LogIn</Link>
            <Link to="/signup">SignUp</Link>
          </>
        )}
      </nav>
      </header>
    </main>
    </div>
  )
}

export default Nav
