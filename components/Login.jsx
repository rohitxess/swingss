'use client'
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "@/firebase";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });


export default function Login () {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isRegister, setIsRegister ] = useState(false)
    const [ authenticating, setAuthenticating ] = useState(false)

    const { signup, login } = useAuth()
    
    // logic for rendering on incorrect credentials 

    async function credlogic(){
        // if the email doesn't match with the registered email 
        // if the password doesn't match with the registered email 


    }

    async function googleAuth(){
            const auth = getAuth();
    signInWithPopup(auth, googleProvider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
    }
    async function handleSubmit(){
        // check if the email and password condition satisfies 
        // Register - check if the email is take, check if the password meets the requirement 
        // Login - check if the credentials are correct 

        if (!email || !password || password.length < 6){
            alert('Please enter the correct credentials')
            return 
        }
        setAuthenticating(true)
        
        
        try{
            if(isRegister){  
                console.log('Signing up a new user')
                await signup(email, password)
            }else{
                console.log('Logging in an existing user')
                await login(email, password)
            }
        }catch(err){
            // return (
            //     <div>
            //         <p className="w-full max-w-[400px] mx-auto text-red-400">{err.message}</p>
            //     </div>
            // )
            console.log(err.message)
        }finally{
            setAuthenticating(false)
        }

    }

    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-4">
           <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugaz.className }>{isRegister ? 'Register' : 'Log In'}</h3>
           <p>You&#39;re one step away</p>
           <input value={email} onChange={(e) => {
            setEmail(e.target.value)
            console.log(e.target.value)
           } } className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border boder-solid border-sky-400 rounded-full outline-none focus:boder-sky-400 hover:border-sky-600" placeholder="Email"></input>
           {/* <p className="w-full max-w-[400px] mx-auto text-red-400">error message</p> */}
           <input value={password} className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border boder-solid border-sky-400 rounded-full outline-none focus:boder-sky-400 hover:border-sky-600" type="password" placeholder="Password" 
           onChange={(e) =>{
            setPassword(e.target.value)
            console.log(e.target.value)
       }}></input>
       {/* <p className="w-full max-w-[400px] mx-auto text-red-400">error message</p> */}
           <div className="max-w-[400px] w-full mx-auto ">
                <Button clickHandler={handleSubmit} text={ authenticating? ' Submitting' : ' Submit '} full />
                <div className="max-w-[400px] grid grid-cols-2 mt-4 mx-auto">
                    <Button clickHandler={googleAuth} text={'Google'}full />
                    <Button text={ 'Github '} full />
                    <Button className=''text={ 'Facebook' } full />
                </div>
           </div>
           <p className="text-center">{isRegister ? 'Already have an account' : 'Don\'t have an account?'} <span className="text-sky-600"> <button onClick={() => setIsRegister(!isRegister)}>{isRegister? 'Login' : 'Register'}</button></span></p>
        </div>
    )
}



