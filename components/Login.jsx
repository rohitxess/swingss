'use client'
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from '@/firebase'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });


export default function Login () {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isRegistered, setIsRegisted ] = useState(false)
    const [ authenticating, setAuthenticating ] = useState(false)

    const { signup, login } = useAuth()

    async function handleSubmit(){
        // check if the email and password condition satisfies 
        // Register - check if the email is take, check if the password meets the requirement 
        // Login - check if the credentials are correct 

        if (!email || !password || password.length < 6){
            alert('Please enter the correct credentials')
            return 
        }
        setAuthenticating(true);
        
        try{
            if(isRegistered){
                console.log('Signing up a new user')
                await signup(email, password)
            }else{
                console.log('Logging in an existing user')
                await login(email, password)
            }
        }catch(err){
            console.log(err.message)
        }finally{
            setAuthenticating(false)
        }

    }

    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-4">
           <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugaz.className }>{isRegistered ? 'Register' : 'Log In'}</h3>
           <p>You&#39;re one step away</p>
           <input value={email} onChange={(e) => {
            setEmail(e.target.value)
            console.log(e.target.value)
           } } className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border boder-solid border-sky-400 rounded-full outline-none focus:boder-sky-400 hover:border-sky-600" placeholder="Email"></input>
           <input className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border boder-solid border-sky-400 rounded-full  outline-none focus:boder-sky-400 hover:border-sky-600" type="password" placeholder="Password" 
           onChange={(e) =>{
            setPassword(e.target.value)
            console.log(e.target.value)
       }}value={password}></input>
           <div className="max-w-[400px] w-full mx-auto">
                <Button clickHandler={handleSubmit} text={ authenticating? ' Submitting' : ' Submit '} full />
           </div>
           <p className="text-center">{isRegistered ? 'Already have an account' : 'Don\'t have an account?'} <span className="text-sky-600"> <button onClick={() => setIsRegisted(!isRegistered)}>{isRegistered? 'Login' : 'Register'}</button></span></p>
        </div>
    )
}

