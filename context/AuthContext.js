// this will be the client side component 
// because we would be doing some async functions

'use client'

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { use, useEffect, useState } from "react";
import { auth } from '../firebase'
import { useContext } from "react";

const AuthContext = React.createContext();

export function useAuth(){
    console.log(useContext(AuthContext))
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [ currenUser, setCurrentUser] = useState(null)
    const [ userDataObj, setUserDataObj ] = useState({})    
    const [ loading, setLoading ] = useState(true) 

    //Auth Handlers

    async function signup(email, password){

        return createUserWithEmailAndPassword(auth,email, password)
    }

    async function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    function logout(){
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }
    // if we have a user we want to fetch their data 
    // get the data and update the state variables
    // once it is done, use the state varialbles

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try{
                //set the user to our local context state 
                setLoading(true)
                setCurrentUser(user)
                if(!user){
                    console.log("No user found")
                    return
                }

                // if the user exsist, fetch the data from firesstore db
                console.log('Fetching user data')
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef) // this will get all our data 
                let firebaseData = {}    
                if (docSnap.exists()){
                    console.log('Found the data')
                    firebaseData = docSnap.data();
                    console.log(firebaseData)
                }
                setUserDataObj = firebaseData
            }catch(err){
                console.log(err.message)
            }finally{
                setLoading(false)
            }
        }) 
        return unsubscribe
    },[])

    // creating an object to collect all the authentication and db data for easy of convinience to access

    const value = {
        currenUser, 
        userDataObj,
        signup,
        logout,
        login,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
