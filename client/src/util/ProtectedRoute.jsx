import { useEffect, useState } from 'react'
import {useAuth} from '../contexts/authContext'
import {useNavigate} from 'react-router-dom'
import {BeatLoader} from 'react-spinners'
export default function ProtectedRoute({children}) {
    const navigate = useNavigate()
    const {value,makeValue}  =useAuth()
    const [isAuthorized,setIsAuthorized] = useState(false)
    useEffect(()=>{
        if(!value){
            navigate('/login')
        }
        const checkAuth =async()=>{
            try{
                const response = await fetch("http://localhost:5000/api/",{
                    method: 'post',
                    headers:{
                        "content-type":"application/json",
                        "authorization":`Bearer ${value.token}`
                    },
                    body:JSON.stringify(value)
                })
                const data = await response.json()
                if(data.success){
                    setIsAuthorized(true)
                }
                else{
                    makeValue({
                        token:"",
                        role:"",
                    })
                    navigate('/login')
                }
            }
            catch(err){
                console.log(err)
                makeValue({
                    username:"",
                    email:"",
                    token:"",
                    role:"",
                    address:"",
                    contact:""
                })
                navigate('/login')
            }
        }
        checkAuth()
    },[value,makeValue,navigate])
    
    return isAuthorized?children:<BeatLoader height="50" style={{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%"}}></BeatLoader>
}
