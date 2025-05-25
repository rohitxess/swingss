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
const date = new Date();
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', '     Friday', 'Saturday']
// lets  write the code to render our own calendar

export default function Calendar(props) {
    const { demo } = props
    const now = new date()
    const currMonth = now.getMonth()

    const monthNow = new Date(selectedYear, Objects.keys(months) )
     
    return (
        <div className="flex flex-col overflow-hidden gap-x-4">
            
        </div>
    )
}

