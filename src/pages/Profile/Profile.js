import React from 'react'
import { useParams } from 'react-router-dom'
import user from '../../icon/user.webp'


const Profile = () => {
  const params = useParams()
  let username = localStorage.getItem('username')
  return (
    <div className='wrapper'>
      <span className='username'>{username}</span>
      <div className='user_info'>
        <img src={user} alt={params.username} />
        <h3>{params.username}</h3>
      </div>
      <div className='ordered_items'>
        ordered_items
      </div>
    </div>
  )
}

export default Profile