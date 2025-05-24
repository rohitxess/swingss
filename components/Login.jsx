import { Fugaz_One } from "next/font/google";
import Button from "./Button";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });


export default function Login () {
    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-4">
           <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugaz.className }>Log In/ Register</h3>
           <p>You&#39;re one step away</p>
           <input className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border boder-solid border-sky-400 rounded-full outline-none focus:boder-sky-400 hover:border-sky-600" placeholder="Email"></input>
           <input className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border boder-solid border-sky-400 rounded-full  outline-none focus:boder-sky-400 hover:border-sky-600" placeholder="Password"></input>
           <div className="max-w-[400px] w-full mx-auto">
                <Button text='Submit' full />
           </div>
           <p className="text-center">Don&#39;t have an account? <span className="text-sky-600">Sign up</span></p>
        </div>
    )
}

