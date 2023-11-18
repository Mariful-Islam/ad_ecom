import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductView = () => {
    let params = useParams()

    let [cartItem, setCartItem] = useState([])


    useEffect(()=>{
      getCartItem()
    }, [])

    let getCartItem = async() => {
      let response = await fetch(`/cart-item/${username}/${params.id}/`)
      let data = await response.json()
      setCartItem(data)
    }


    let [product, setProduct] = useState([])

    useEffect(()=>{
        getProduct()
    }, [])

    let getProduct = async() =>{
        let response = await fetch(`/product/${params.id}/`)
        let data = await response.json()
        setProduct(data)
    }
    let username = localStorage.getItem('username')

    let onAdd = async(e) => {
      e.preventDefault()
      let response = await fetch(`/add-cart/${username}/${params.id}/`,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          })
      let data = await response.json()
      window.location.reload()
  }
  let deleteQuantity = async(e) =>{
    if (1<cartItem.quantity){
      e.preventDefault()
      let response = await fetch(`/item-decrease/${cartItem.id}/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      let data = await response.json()
      console.log('Delete', data)
      window.location.reload()
    }else{
      e.preventDefault()
      let response = await fetch(`/cart-delete/${cartItem.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
    let data = await response.json()
    console.log('Delete', data)
    window.location.reload()
    }
  }

  let addQuantity = async(e) => {
    e.preventDefault()
    let response = await fetch(`/item-increase/${cartItem.id}/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    let data = await response.json()
    console.log(data)
    window.location.reload()
  }
  return (
    <div className='wrapper product_view'>
        <div className='product_view_image'>
          <img src={'http://mariful1731.pythonanywhere.com/'+product.image} alt={product.image}/>
        </div>
        <div className='product_view_info'>
          <div>
            {product.name}
          </div>
          <div >
            {product.price}$
          </div>
          <div>
            {product.desc}
          </div>
          <div>
              <button className='btn red' onClick={deleteQuantity}>- </button>  
              {cartItem.quantity}  
              <button className='btn green' onClick={addQuantity}> +</button>
              <p>{cartItem.quantity ? cartItem.quantity*product.price : 0 }$</p>
          </div>
          <button className='addBtn' onClick={onAdd}>Add</button>
        </div>
        
        
    </div>
  )
}

export default ProductView