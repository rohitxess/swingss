'use client'
import { useAuth } from "@/context/AuthContext"
import Button from "./Button"
import { useAuth } from '@/context/AuthContext'
import { usePathname  } from "next/navigation"
import Link from 'next/link'

export default function Logout() {
    const { logout, currentUser } = useAuth()

    if(!currentUser){
        return null 
    }

    if (pathname ==='/'){
        return (
            <Link href={'/dashboard'}>
                <Button text='Go to the dashboard'/>
            </Link>
        )
    }
    
    return (
        <div>
            <Button text='Logout' clickHandler={logout} />
        </div>
    )
}