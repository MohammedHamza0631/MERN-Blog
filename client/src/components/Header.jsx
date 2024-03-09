import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

function Header () {
  const { setuserInfo, userInfo } = useContext(UserContext)
  useEffect(() => {
    fetch('/profile', {
      credentials: 'include'
    }).then(res => {
      res.json().then(userInfo => {
        setuserInfo(userInfo)
      })
    })
  }, [])

  function logout () {
    fetch('/logout', {
      credentials: 'include',
      method: 'POST'
    }).then(() => {
      setuserInfo(null)
      window.location.replace('/')
    })
  }

  const username = userInfo?.username

  return (
    <header>
      <Link to='/' className='logo'>
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to='/create'>Create a new post</Link>
            <Link onClick={logout}>Logout</Link>
          </>
        )}
        {!username && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
