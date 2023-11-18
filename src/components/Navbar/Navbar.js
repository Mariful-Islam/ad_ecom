import React, {useState, useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import cart from '../../icon/cart.png'



const Navbar = () => {
  const navigate = useNavigate()

  let username = localStorage.getItem('username')

    const onLogout = async() => {
      localStorage.removeItem('totalProductQuantity')
      localStorage.removeItem('totalPrice')
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      
      let response = await fetch('/logout/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      })

      let data = response.json()
      console.log(data)
      navigate('/')
      window.location.reload()
    }

    let [carts, setCarts] = useState([])
  
    useEffect(()=>{
      getCarts()
    }, [])
  
  
    let getCarts = async() => {
      if (username) {
        let response = await fetch(`/cart/${username}/`)
        let data = await response.json()
        setCarts(data)
      }else{
        
      }
      
    }

    let totalProductQuantity = 0
    if (carts){
      carts.map((cart, key)=>(
      totalProductQuantity += cart.quantity
      ))
    }else{
      totalProductQuantity = 0
    }
    

  return (
  <div className='wrapper navbar'>
    { username ?  
    <>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/service/'>Service</NavLink>
      <NavLink to='/product/'>Product</NavLink>
      <NavLink to={`/profile/${username}/`}>{username}</NavLink>
      <button className='logoutBtn' onClick={onLogout}>Logout</button>
      <NavLink to='/cart/'><span className='items_num'>{carts ? totalProductQuantity : 0}</span>
        <img className='cart-icon' src={cart} alt='cart' /></NavLink>  
    </> :
    <>
      <NavLink to=''>Home</NavLink>
      <NavLink to='service'>Service</NavLink>
      <NavLink to='product'>Product</NavLink>
      <NavLink to='login'>Login</NavLink>
      <NavLink to='/signup/'>Sign Up</NavLink>
      <NavLink to='cart'><span className='items_num'>{carts ? totalProductQuantity : 0}</span>
        <img className='cart-icon' src={cart} alt='cart' /></NavLink>  
    </> 
    }
    </div>

  )
}

export default Navbar