import React, { useState } from 'react'
import { Radio, Tag, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../Redux/cartSlice'
const Product = ({ product }) => {

    const cartItems = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();

    const [cartQtyToAdd, setCartQtyToAdd] = useState(cartItems[product.id] ? cartItems[product.id] : 0)

    const handleQtyChange = (e) => {
        // here we are handling product quantity control
        if (e.target.value === '+') {
            let validAction = true
            if(product.maxPerOrderQty && cartQtyToAdd > (product.maxPerOrderQty-1))
                validAction = false;

            if (validAction && (cartQtyToAdd <= (product.stockqty - 1))){
                setCartQtyToAdd(cartQtyToAdd + 1)
            }
            else {
                alert('Max Limit Reached')
            }
        }
        if (e.target.value === '-' && cartQtyToAdd !== 0) {
            setCartQtyToAdd(cartQtyToAdd - 1)
        }

    }

    const handleAddToCart = () => {
        // validations before adding it to cart
        if(cartQtyToAdd > 0){
            if(cartItems[product.id] && cartItems[product.id] === cartQtyToAdd){
                api.error({
                    message: `No Change in Quantity`,
                    placement: 'bottom',
                  });
            }
            else{
                let updatedCartItems = {...cartItems}
                updatedCartItems[`${product.id}`] = cartQtyToAdd
                localStorage.setItem('cartItems',JSON.stringify(updatedCartItems))
                dispatch(updateCart(updatedCartItems))
                api.success({
                    message: `Product Added`,
                    placement: 'bottom',
                  });
            }
        }
        else{
            api.error({
                message: `Please Enter Quantity`,
                placement: 'bottom',
              });
        }
    }

    return (
        <div className="card" key={product.id}>
            {contextHolder}
            <img src={product.image} alt="product-img" />
            <h4 className='product-name'>{product.title}</h4>
            <h5 className='product-price'>{product.price}</h5>

            <p>Stock Qty:- {product.stockqty}</p>
            {product.stockqty < 50 && <Tag color="error">
                Minimum Stock Left
            </Tag>}
            {product.maxPerOrderQty && <Tag color='warning' > Max {product.maxPerOrderQty} per Order </Tag>}
            <div className='qty-spinner'>
                <Radio.Group value={''} onChange={handleQtyChange}>
                    <Radio.Button value='+' >+</Radio.Button>
                    <Radio.Button disabled > {cartQtyToAdd} </Radio.Button>
                    <Radio.Button value='-' >-</Radio.Button>
                </Radio.Group>
            </div>
            <button onClick={() => { handleAddToCart() }} className="btn">
                Add to cart
            </button>
        </div>
    )
}

export default Product