// we need the pre built data 

'use client'
// import {Calendar} from "@heroui/calendar"; renders but not what we want 
import {parseDate} from "@internationalized/date";
import { gradients, baseRating, demoData } from "@/utils";
import { Fugaz_One } from "next/font/google";
import { useState, useEffect } from "react";


const months = {
    'January': 'Jan',
    'Febuary': 'Feb',
    'March': 'Mar',
    'April': 'Apr',
    'May': 'May',
    'June': 'Jun',
    'July': 'Jul',
    'August': 'Aug',
    'September': 'Sep',
    'October': 'Oct',
    'November': 'Nov',
    'December': 'Dec',
}

const monthsArr = Object.keys(months)
const now = new Date();
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
// lets  write the code to render our own calendar

export default function Calendar(props) {
    const { demo, completeData, handleSetMood } = props;
    const now = new Date();
    const currMonth = now.getMonth();
    const [ selectedMonth, setSelectedMonth ] = useState(Object.keys(months)[currMonth])
    const [ selectedYear, setSelectedYear ] = useState(now.getFullYear())
    const data = completeData?.[selectedYear]?.[numericMonth] || {}

    const monthNow = new Date(selectedYear,Object.keys(months).indexOf(selectedMonth),1)
    const firstDayOfMonth = monthNow.getDate()
    const dayInMonths = new Date(selectedYear,Object.keys(months).indexOf(selectedMonth) + 1, 0).getDate()

    const daysToDisplay = firstDayOfMonth + dayInMonths
    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)
     
    return (
        <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
            {[...Array(numRows).keys()].map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="grid grid-cols-7 gap-1">
                        {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                            let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)
                            let dayDisplay = dayIndex > dayInMonths ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true 
                            let isToday = dayIndex === now.getDate()

                            if(!dayDisplay){
                                return (
                                    <div className="bg-white" key={dayOfWeekIndex}/>
                                )
                            }

                            let color = demo ?
                            gradients.blue[baseRating[dayIndex]] : dayIndex in data ? 
                            gradients.blue[data[dayIndex]] : 'white'

                            return (
                                <div style={{ background: color }} className={"text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " + (isToday ? 'border-blue-400' : 'border-blue-100' ) + (color === 'white' ? 'text-blue-400' : 'text-white' )} key={dayOfWeekIndex}>
                                    <p>{dayIndex}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

