// we need the pre built data 

import {Calendar} from "@heroui/calendar";
import {parseDate} from "@internationalized/date";
import { gradients, baseRating, demoData } from "@/utils";

const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', '     Friday', 'Saturday']

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

const date = new Date();

// lets  write the code to render our own calendar

export default function CalendarComp(props) {
    const { demo } = props
    const year = 2024
    const month = 'July'
     
    return (
        <div className="flex flex-col overflow-hidden gap-x-4">
            <Calendar />
        </div>
    )
}

