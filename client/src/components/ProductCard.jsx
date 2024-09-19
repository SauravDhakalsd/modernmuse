import React from 'react'
import { useNavigate } from 'react-router'
import "../css/productCard.scss"
export default function ProductCard(props) {
    const navigate = useNavigate()
    const data= JSON.parse(props.product)
  return (
    <div className="productCard" onClick={()=>{navigate(`/product/${data._id}`)}}>
        <img src={data.imageUrl} alt="product" />
        <h3>{data.productName}</h3>
        <span>Rs{data.price}</span>
    </div>
  )
}
