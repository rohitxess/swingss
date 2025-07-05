"use client";
import { Fugaz_One } from "next/font/google";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";
import Navigation from "./NavBar";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Dashboard() {
    const { currentUser, userDataObj, setUserDataObj, loading } = useAuth()
    const [ data, setData ] = useState({})
    const now = new Date()

    function countValues(){
        let total_number_of_days = 0 
        let sum_moods = 0
        for (let year in data){
            for (let month in data[year]){
                for (let day in data[year][month]){
                    let days_mood = data[year][month][day]
                    total_number_of_days++
                    sum_moods +=days_mood
                }
            }
        }
        return {num_days: total_number_of_days, average_mood: sum_moods /total_number_of_days}
    }

   async function handleSetMood(mood){
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

        
    try{
        const newData = { ...userDataObj}
        if (!newData?.[year]){
            newData[year] = {}
        }
        if (!newData?.[year]?.[month]){
            newData[year][month] = {}
        }


        newData[year][month][day] = mood;
        //update the current state 
        setData(newData)
        //update the global state 
        setUserDataObj(newData)
        //update the firebase

        const docRef =  doc(db, 'users', currentUser.uid)
        console.log('docref',docRef)
        const res = await setDoc(docRef, {
            [year]: {
                [month]: {
                    [day]: mood
                }
            }
        }, {merge: true})

        } catch(err){
            console.log('Failed to set data', err.message)
        } 
    }

    const statuses = {
        //spread operator  
        ...countValues(),
        time_remaining: `${24 - now.getHours()}H ${60 - now.getMinutes()}M`
    }

    const moods = {
        'Sad':'😓',
        'Good':'😁',
        'Excited':'🤩',
        'Happy':'😀',
        'Loved':'😍',
    }

    useEffect(() => {
        if (!currentUser || !userDataObj){
            return 
        }          
        setData(userDataObj)
    },[currentUser, userDataObj])

    if (loading){
        return <Loading />
    }
    if(!currentUser){
        return <Login/>
    }

    return (
        <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16 md:overflow-hidden">
            {/* <div className="w-full flex-none md:w-64">
                <Navigation />    
            </div> */}
            <div className="grid sm:grid-cols-3 bg-neutral-800 text-white rounded-lg p-4">
                {Object.keys(statuses).map((status, statusIndex) => {
                        return (
                            <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2'>
                                <p className='font-medium capitalize text-xs sm:text-sm truncate'>{status.replaceAll('_', ' ')}</p>
                                <p className={'text-base sm:text-lg truncate ' + fugaz.className}>{statuses[status]}{status === 'num_days' ? ' 🔥' : ''}</p>
                            </div>
                        )})
                    }
            </div>
            <h4 className={"text-5xl sm:text-6xl md:text-6xl text-center " + fugaz.className}>
                How do you<span className="textGradient">feel</span>today?
            </h4>
            <div className="flex items-strech flex-wrap sm:grid-cols-5 gap-4">
                {Object.keys(moods).map((mood, moodIndex) => {
                    return (
                        <button onClick={() => {
                            const currentMoodValue = moodIndex + 1 
                            handleSetMood(currentMoodValue)
                        }} className={"p-4 px-5 rounded-2xl purpleShadow duration-200 bg-rose-50 hover:bg-grey-200 flex flex-col items-center gap-2 flex-1 " + (moodIndex === 4 ? 'col-span-2 sm:col-span-1 ' :  ' ')} key={moodIndex}>
                            <p className="text-4xl sm:text-5xl md:text-6xl">{moods[mood]}</p>
                            <p className={"text-gray-500 text-xs sm:text-sm md:text-base " + fugaz.className}>{mood}</p>
                        </button>
                    )
                })}
            </div>
            <Calendar completeData={data} handleSetMood={handleSetMood} />
        </div>
    )
}