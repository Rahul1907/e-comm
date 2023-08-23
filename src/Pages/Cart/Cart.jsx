import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove, updateCart } from '../../Redux/cartSlice';
import { products } from '../../jsonData'
import { Col, Row } from 'antd';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  
  // on remove of element from cart
  const onRemoveItem = (item) => {
    let updatedCartItems = {...cartItems}
    delete updatedCartItems[item.id]
    localStorage.setItem('cartItems',JSON.stringify(updatedCartItems))
    dispatch(updateCart(updatedCartItems))
  }

  // fetch product details from the product ids stored in redux
  let productDetails = useMemo(() => {
    let cartItemsKeys = Object.keys(cartItems);
    let res = products.filter(x => cartItemsKeys.includes(x.id))
    return res;
  }, [cartItems])

  // calcualting total of all cart products
  let cartTotal = useMemo(()=>{
    return productDetails.reduce((accumulator, product) => accumulator + (product.price * cartItems[product.id]),0)
  },[productDetails])

  return (
    <div>
      <h4>Cart</h4>
      {productDetails.map((item) => {
        return (<div className='card' key={item.id}>
          <Row>
            <Col span={12}>
              <img src={item.image} />
              <div>
                <button className='btn' onClick={() => { onRemoveItem(item) }}> Remove Item </button>
              </div>
            </Col>
            <Col span={12}>
              <h4>{item.title}</h4>
              <h5>{item.price} x {cartItems[item.id]} = {(item.price * cartItems[item.id])}</h5>
            </Col>
          </Row>
        </div>)
      })}
      <footer className='cart-footer'>
        Total: {cartTotal.toFixed(2)}
      </footer>
    </div>
  )
}

export default Cart