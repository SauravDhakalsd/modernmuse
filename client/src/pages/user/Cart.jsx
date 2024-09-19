import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Alert from "../../components/Alert";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../css/Cart.scss"
import handlePayment from "../../utils/handlePayment"
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const {value,makeValue} = useAuth()
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")
  const [cartId,setCartId] = useState("")


  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart",{
          method:"get",
          headers:{
              authorization:`Bearer ${value.token}`,
              "content-type":"application/json"
          }
      });
      const data=await response.json()
      console.log(data)
      if(data.success){

          setCartItems(data.data.products);
          setCartId(data.data._id)
      }
      else{
          throw new Error(data.message)
      }
    } catch (error) {
      setError(error)
      setTimeout(()=>{setError("")},3000)
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, []);
  const handleRemove = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`http://localhost:5000/api/cart`,{
          method:"delete",
          headers:{
            authorization:`Bearer ${value.token}`,
            "content-type":"application/json"
        },
        body:JSON.stringify({product:`${id}`})
      });
      const data=await response.json()
      console.log(data)
      if(data.success){
        setCartItems(data.data.products);
      }
      fetchCartItems()
    } catch (error) {
      console.log("Error removing product from cart:", error);
    }
    fetchCartItems()
  };
  const handleOrder=async()=>{
    const products = cartItems.map(ele=>ele._id)
    console.log(cartId)
    try{
      const response = await fetch("/api/order",{
        method:"post",
        headers:{
          "content-type":"application/json",
          "authorization":`Bearer ${value.token}`
        },
        body:JSON.stringify({products:products,cartId:cartId})
      })
      const data= await response.json()
      console.log(data)
      if(data.success){
        setSuccess(data.message)
        setTimeout(()=>{setSuccess("")},3000)
      }
      else{
        throw new Error(data.message)
      }
      fetchCartItems()
    }
    catch(err){
      setError(err)
      setTimeout(()=>{setError("")},3000)
    }

  }

  if (cartItems !== undefined && cartItems.length>0) {
    return (
        <>
            <Navbar></Navbar>
            {error && <Alert error message={error}/>}
            {success && <Alert message={success}/>}

        <div className="container">
            {error && <Alert error message={error}></Alert>}
            {success && <Alert  message={success}></Alert>}

            {cartItems.map((post) => (
            <div key={post.id} className="post">
                <Link style={{ textDecoration: "none", color: "black" }}>
                <img
                    className="product-image"
                    src={`${post.imageUrl}`}
                    alt=''
                />
                <div className="description">
                    <h2>{post.productName}</h2>
                    <div className="button">
                    <button
                        className="remove"
                        
                        onClick={() =>{handleRemove(post._id)}}
                    >
                        Remove
                    </button>
                    </div>
                </div>
                </Link>
            </div>
            ))}
                    
        </div>
        <button
                        className="order"
                        onClick={handleOrder}
                    >
                        Order
                    </button>
        <Footer></Footer>
    </>
    );
  }else{
    return <><Navbar></Navbar><div className="container">Cart is empty</div><Footer></Footer></>
  }
}

export default Cart;
