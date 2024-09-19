import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import Navbar from '../../components/admin/Navbar';
import "../../css/admin/ManageProducts.scss"

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const {value,_} = useAuth()

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/product',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization:`Bearer ${value.token}`
        }
      });
      const data = await res.json()
      console.log(data)
      if(data.success){

          setProducts(data.data);
      }
      else{
        throw new Error(data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
        const res = await fetch(`/api/product/${id}`,{
          method:"delete",
          headers:{
            'Content-Type': 'application/json',
            authorization:`Bearer ${value.token}`
          }
        })
        const data = await res.json()
        if(!data.success){
            throw new Error(data.message)    
        }
      fetchProducts();  // Refresh the product list
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  },[]);

  return (
    <>
      <Navbar></Navbar>
      <div className='manageProducts'>
        <h2>Manage Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <img src={`${product.imageUrl}`} style={{height:"100px"}} alt="" />
              {product.productName} - {product.price}
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ManageProducts;
