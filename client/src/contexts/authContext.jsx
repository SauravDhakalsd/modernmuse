import {createContext, useContext, useState} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [value,setValue]=useState(localStorage.getItem("auth")?JSON.parse(localStorage.getItem("auth")):{
        role:"",
        token:""
    })
    const makeValue = (value)=>{
        setValue(value)
        localStorage.setItem("auth",JSON.stringify(value))
    }
    return(
        <AuthContext.Provider value={{value,makeValue}}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = ()=>useContext(AuthContext)

export {AuthProvider,useAuth};