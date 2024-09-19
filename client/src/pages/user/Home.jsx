import React, { useEffect, useState } from "react";
import "../../css/Home.scss";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/authContext";
import ProductCard from "../../components/ProductCard";
function Home() {
    const {value,_} = useAuth()
    const [products,setProducts] = useState()
    const [forYou,setForYou] = useState()

    const fetchData = async()=>{
        const response = await fetch("/api/product",{
            method:'get',
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${value.token}`
            }
        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            setProducts(data.data)
        }
    }
    const fetchForYou = async()=>{
        const response = await fetch("/api/product/for-you",{
            method:'get',
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${value.token}`
            }
        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            setForYou(data.data)
        }
    }
    useEffect(()=>{
        fetchData()
        fetchForYou()
    },[])
  return (
    <>
        <Navbar></Navbar>
        <h1>Welcome to Modern Muse..</h1>
        {forYou && (forYou.hip.length>0 || forYou.shoulder.length>0) && <div className="for-you">
            <h1>For you .. </h1>
                {forYou.shoulder.length>0 &&<><h2>Accoring to your shoulder</h2> <div className="container">
                    
                    {forYou.shoulder.map(ele=><ProductCard product={JSON.stringify(ele)}></ProductCard>)}
                    </div></>}
                    {forYou.hip.length>0 && <><h2>Accoring to your hip</h2><div className="container">
                    
                    {forYou.hip.map(ele=><ProductCard product={JSON.stringify(ele)}></ProductCard>)}
                    </div></>}
            </div>}
        <h1>All products</h1>
        <div className="container">
            {products?products.map(ele=><ProductCard product={JSON.stringify(ele)}></ProductCard>):<div>No products avalable</div>}
        </div>
        <Footer></Footer>
    </>
  );
}

export default Home;
