import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../Redux/cartSlice'
import { ShoppingCartOutlined, PoweroffOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import { eraseCookie } from '../../utils/utils';

const Header = () => {
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // this functions is executed on logout
  const logout = () => {
    // we will remove all the user data stored in browser
    localStorage.removeItem('cartItems')
    dispatch(updateCart({}))
    eraseCookie('user-session')
    navigate('/')
  }

  return (
    <>
      <nav className='header' >
        <div>
          <span className="logo"><strong>STORE</strong></span>
          <Link className="navLink" to="/">
            Home
          </Link>
          <Link className="navLink" to="/cart">
            Cart
          </Link>
        </div>
        <div>
          <Link className="navLink" to="/cart">
            <span className="cartCount">
              <Badge count={Object.keys(cartItems).length}>
                <ShoppingCartOutlined style={{ fontSize: '27px' }} />
              </Badge>
            </span>
          </Link>
          <span className='cursor-pointer' onClick={() => { logout() }}>
            <PoweroffOutlined style={{ fontSize: '22px', marginLeft: '10px', color: 'red' }} />
          </span>
        </div>
      </nav>
    </>
  )
}

export default Header