import React, { useState, useEffect } from 'react';
import {useAuth} from "../../contexts/authContext"
import Navbar from "../../components/admin/Navbar"
import "../../css/admin/StrategizePrice.scss"
const StrategizePrice = () => {
  const [products, setProducts] = useState([]);
  const [updatedPrice, setUpdatedPrice] = useState({});
  const {value,_} = useAuth()
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/product',{
        method:"get",
        headers:{
          "Content-Type": "application/json",
          authorization:`Bearer ${value.token}`
        }
      });
      const data = await response.json();
      console.log(data)
      if(data.success){
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePriceChange = (productId, newPrice) => {
    setUpdatedPrice((prev) => ({
      ...prev,
      [productId]: newPrice,
    }));
  };

  const updatePrice = async (productId) => {
    const newPrice = updatedPrice[productId];

    if (!newPrice) {
      alert('Please enter a price');
      return;
    }

    try {
      const response = await fetch(`/api/product/${productId}/update-price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${value.token}`
        },
        body: JSON.stringify({ newPrice: newPrice }),
      });
      const data=await response.json()
      if(data.success){

        fetchProducts(); // Refresh the product list
      }
      else{
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className='strategizePrice'>
        <h1>Strategize Price</h1>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <span>{product.productName} - Current Price: Rs{product.price}</span>
              <input
                type="number"
                placeholder="Enter new price"
                value={updatedPrice[product._id] || ''}
                onChange={(e) => handlePriceChange(product._id, e.target.value)}
              />
              <button onClick={() => updatePrice(product._id)}>Update Price</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StrategizePrice;
