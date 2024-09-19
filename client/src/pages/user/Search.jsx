import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAuth } from '../../contexts/authContext'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
export default function Search() {
    const {productName} = useParams()
    const [products, setProducts] = useState([])
    const {value,_} = useAuth()
    useEffect(()=>{
        const fetchData = async()=>{
            try{

                const response = await fetch(`http://localhost:5000/api/product/search/${productName}`,{
                    method:"get",
                    headers:{
                        "Content-Type":"application/json",
                        "authorization":`Bearer ${value.token}`
    
                    }
                })
                const data = await response.json()
                console.log(data)
                if(data.success){
                    setProducts(data.data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[value.token,productName])
  return (
    <>
        <Navbar></Navbar>
            <h1>Search results</h1>
        <div className="container">
            {products.map((ele)=><ProductCard product={JSON.stringify(ele)}/>
            )}
        </div>
        <Footer></Footer>
    </>
  )
}
