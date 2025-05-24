// this will be the client side component 
// because we would be doing some async functions

'use client'

import React from "react";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuhtProvider({children}){
    
}

