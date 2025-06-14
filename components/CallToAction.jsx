'use client'
import React from 'react';
import Button from "./Button";
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext"

export default function CallToAction(){
    const { currentUser } = useAuth()

    if (currentUser){
        return (
            <div className='flex flex-col items-center max-w-[600px] mx-auto w-full'>
                <Link href={'/dashboard'}> 
                    <Button text="Go to Dashboard" dark/>
                </Link>
            </div>
        )
    }
    return (
            <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
            <Link href={'/dashboard'}>
                <Button text="Sign Up"/>
            </Link>               
            <Link href={'/dashboard'}>
                <Button text="Login" dark/>
            </Link>
    </div>        
    )
}

//max-w-[600px] mx-auto w-full
