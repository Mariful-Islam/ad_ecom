import React from 'react'

const CartComponent = ({cart}) => {
  // const username = 'saad'

    let deleteQuantity = async(e) =>{
        if (1<cart.quantity){
          e.preventDefault()
          let response = await fetch(`/item-decrease/${cart.id}/`,{
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
          let response = await fetch(`/cart-delete/${cart.id}/`, {
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
        let response = await fetch(`/item-increase/${cart.id}/`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        let data = await response.json()
        console.log(data)
        window.location.reload()
      }
    
      let onDelete = async(e) => {
        e.preventDefault()
        let response = await fetch(`/cart-delete/${cart.id}/`, {
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
  return (
    <div>
        <div className='data_row'>
          {cart ? 
          <>
              <img src={cart.product_image} alt={cart.product_image}/>
              <p>{cart.product_name}</p>
              <p>{cart.product_price}$</p>
              
              <p>
                <button className='btn red' onClick={deleteQuantity}>- </button>  
                {cart.quantity}  
                <button className='btn green' onClick={addQuantity}> +</button>
              </p>

              <p>{cart.product_price * cart.quantity}$</p>
              <p onClick={onDelete} className='deleteBtn'>Delete</p>
          </>:
          <>
            
          </>
          }
            </div>
    </div>
  )
}
export default CartComponent