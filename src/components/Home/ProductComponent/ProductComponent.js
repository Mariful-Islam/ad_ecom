import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductComponent = ({product}) => {

    const navigate = useNavigate()

    let username = localStorage.getItem('username')

    let onView = async() =>{
        navigate(`/product/${product.id}/`)
    }

    let onAdd = async(e) => {
        e.preventDefault()
        let response = await fetch(`/add-cart/${username}/${product.id}/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            })
        let data = await response.json()
        window.location.reload()
    }

    console.log(product.image)


  return (

        <div>
            <div className='product_item'>
                <div className='product_image'>
                    
                    <img src={'http://mariful1731.pythonanywhere.com/'+product.image} alt={product.image.url}/>
                    
                </div>
                <div className='product_info'>
                    <p className='product_name'>{product.name}</p> 
                    <p>{product.price}$</p>
                </div>         
                <div className='cart_price'>
                    <button className='addBtn' onClick={onView}>View</button>
                    <button className='addBtn' onClick={onAdd}>Add</button>
                </div>
            </div>
      </div>
  )
}

export default ProductComponent