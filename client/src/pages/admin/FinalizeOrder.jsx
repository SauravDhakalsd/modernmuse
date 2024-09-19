import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import Navbar from "../../components/admin/Navbar"
import "../../css/admin/finalizeOrder.scss"
const FinalizeOrder = () => {
  const [orders, setOrders] = useState([]);
  const {value,_}=useAuth()

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/order/pending',{
        method:"get",
        headers:{
            "Content-Type": "application/json",
            "authorization": `Bearer ${value.token}`
        }
      });
      const data = await response.json()
      console.log(data)
      setOrders(data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const finalizeOrder = async (orderId) => {
    try {
      await fetch(`/api/order/${orderId}`,{
        method:"put",
        headers:{
            "Content-Type": "application/json",
            "authorization": `Bearer ${value.token}`
        }
      });
      fetchOrders();  // Refresh the order list after finalizing
    } catch (error) {
      console.error('Error finalizing order:', error);
    }
  };

  return (

    <>
    <Navbar></Navbar>
    <div className="finalizeOrder">

      <h1>Finalize Orders</h1>
        {orders.map((ele,ind)=>{
          return(
            <div className='orders'>
              <h2>Order ID: {ele._id}</h2>
              <h2>Order Status: {ele.isPending?"pending":"placed"}</h2>
              <ul>
                {ele.products.map((product,i)=>{
                  return(
                    <li key={i}>{product.productName}-Rs{product.price}</li>
                  )
                })}
              </ul>
              <h3>Total Amount: Rs{ele.orderAmount}</h3>
              <button onClick={()=>{finalizeOrder(ele._id)}}>Finalise order</button>
            </div>
          )
        })}
    </div>
    </>
  );
};

export default FinalizeOrder;
