import React, { useEffect, useState } from "react";
import "../../css/Orders.scss";
import handlePayment from "../../utils/handlePayment";
import { useAuth } from "../../contexts/authContext";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer";

function Orders() {
  const [orderItems, setOrderItems] = useState([]);
  const { value,_ } = useAuth();
  const [error,setError]=useState("")
  const [success,setSuccess]=useState("")
  const [total,setTotal]=useState(0)


  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${value.token}`,
        },
      });
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setOrderItems(data.data);
        setTotal(data.orderAmount)

      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      setError(error)
      setTimeout(()=>{setError("")},2000)
    }
  };
  useEffect(() => {
    
    
    fetchOrders();
  }, []);
  const handleRemove = async (id) => {
    try {
      const response = await fetch(`/api/order/${id}`, {
        method: "DELETE", // Updated to DELETE method
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${value.token}`,
        },
      });
      const data = await response.json()
      console.log(data)
      if(data.success){
        setSuccess(data.message)
        setTimeout(()=>{setSuccess("")},2000)
      }
      else{
        throw new Error(data.message)
      }

    } catch (error) {
      console.log("Error removing order:", error);
      setError(error)
      setTimeout(()=>{setError("")},2000)
    }
    fetchOrders()
  };

  return (
    <>
    <Navbar></Navbar>
    <h1>Your orders</h1>
    {orderItems.length<1 && <div>No orders yet</div>}
    <div className="orders">
      {orderItems.map((order) => (
        <div key={order._id} className="order">
          <h2>Order ID: {order._id}</h2>
          <p>Status: {order.isPending?"Pending":"Placed"}</p>
          {order.products.map((product) => (
            <div key={product._id} className="product">
              <img
                className="product-image"
                src={`${product.imageUrl}`}
                alt="product"
              />
              <div className="description">
                <h3>{product.productName}</h3>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          ))}
          <div>Total Amount: Rs{total}</div>
          <div className="actions">
            {order.isPending ? (
              <button
                className="remove"
                onClick={() => handleRemove(order._id)}
              >
                Cancel Order
              </button>
            ) : (
              <button
                className="buy-now"
                onClick={() => handlePayment(order._id, order.orderAmount)}
              >
                CheckOut
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
    <Footer></Footer>
    </>
  );
}

export default Orders;
