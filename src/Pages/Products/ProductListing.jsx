import React, { useMemo } from 'react'
import { products } from '../../jsonData'
import Product from '../../Components/Product'
import { getCookie } from '../../utils/utils'
const ProductListing = () => {

  // we will fetch products which are realted to this user
  let productsList = useMemo(()=>{
    return products.filter((x)=>x.userIds.includes(getCookie('user-session')))
  },[])

  return (
    <div>
      <h3>Products List</h3>
      <div className='productsWrapper'>
        {productsList.map((productInfo) => {
          return (
            <Product product={productInfo} />
          )
        })}
      </div>
    </div>
  )
}

export default ProductListing