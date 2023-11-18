import React, { useEffect, useState } from 'react'
import CartComponent from '../../components/Cart/CartComponent'


const Cart = () => {


  let username = localStorage.getItem('username')
  console.log(username)
  
  let [carts, setCarts] = useState([])


  useEffect(()=>{
    getCarts()
  },[])

  

  let getCarts = async() => {
    if (username) {
      let response = await fetch(`/cart/${username}/`)
      let data = await response.json()
      setCarts(data)
    }else{
      
    }
    
  }

  let totalProductQuantity = 0
  
  carts.map((cart, key)=>(
    totalProductQuantity += cart.quantity
    ))
  
  localStorage.setItem('totalProductQuantity', totalProductQuantity)
    
  let totalPrice = 0
  carts.map((cart, key)=>(
    totalPrice += cart.product_price * cart.quantity
    ))
    
  localStorage.setItem('totalPrice', totalPrice)

  return (
    <div className='wrapper'>
      <h3 className='text-center'>Cart</h3>
        <div className='cart'>
          
          <div className='cart_header'>
            <h4>Image</h4>
            <h4>Products</h4>
            <h4>Price</h4>
            <h4>Quantity</h4>
            <h4>Net Price</h4>
          </div>
          <div className='cart_data'>
            {carts.map((cart, key)=>(
              <CartComponent key={key} cart={cart}/>
            ))}
          </div>
          <div className='summary_cart'>
            <p><strong>Total Quantity : </strong> {carts ? totalProductQuantity : 0}</p>
            <p><strong>Total Price : </strong> {carts ? totalPrice : 0}$</p>
          </div>
        </div>
    </div>
  )
}

export default Cart