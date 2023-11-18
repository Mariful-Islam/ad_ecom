import React from 'react'
import {Link, useNavigate} from 'react-router-dom'




const Login = () => {

  let navigate = useNavigate()

  let onLogin = async(e)=>{
    e.preventDefault()
    let response = await fetch('/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"username": e.target.username.value,
                          "password": e.target.password.value})
    })
    let data = await response.json()
    localStorage.setItem('username', data['username'])
    localStorage.setItem('token', data['token'])
    console.log('username', data['username'], 'token', data['token'])
    navigate('/')
    window.location.reload()
  }
  return (
    <div className='wrapper'>
      <h2 className='text-center'>Log In</h2>
      <form onSubmit={onLogin} className='input_form'>
        <input className='input_field' type='text' name='username' placeholder='username'/>
        <br/>
        <input className='input_field' type='password' name='password' placeholder='password'/>
        <br/>
        <input  className='input_field' type='submit' value='Login'/>
      </form>
      <span className='alter-link'>Not have account <Link to='/signup/'> Sign Up</Link></span>
    </div>
  )
}

export default Login