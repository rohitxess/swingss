import { useAuth } from "@/context/AuthContext";
import Button from "./Button";

export default function Notes(){
    // const  { currentUser } = useAuth()
    // enter the input box 
    // button to submit 
    // when the user enters notes will be displayed on the div

    function handleNotes(){
        // onclick 
        // the notes are added to the user/notes route 
        // put request of the notes to the database
    }
    return (
        <div>
            <input type="text" placeholder="Enter Notes here" className=" border-2 border-rounded border-sky-400 w-full max-w-[1000px] mx-auto text-sm sm:text-base h-80 mb-8" />
            <Button classname='w-full max-w-[100px]' text="Submit" full></Button>
        </div>
    )
}