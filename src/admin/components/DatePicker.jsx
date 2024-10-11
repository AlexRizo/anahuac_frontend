import { useEffect, useState } from "react"
import { addDays, format } from "date-fns"

import {
    Button,
    Calendar,
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui"

import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import localCustom from "../helpers/localCustom"

export const DatePicker = () => {
    const [date, setDate] = useState({ from: new Date(), to: addDays(new Date(), 7) })
    
    useEffect(() => {
        console.log(date)
    }, [date])
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                    "w-[320px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    { date?.from ? (
                    date.to ? (
                        <>
                        {format(date.from, "dd MMMM y", { locale: localCustom })} -{" "}
                        {format(date.to, "dd MMMM y", { locale: localCustom })}
                        </>
                    ) : (
                        format(date.from, "dd MMMM y", { locale: localCustom })
                    )
                    ) : (
                    <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={ date?.from }
                    selected={ date }
                    onSelect={ setDate }
                    numberOfMonths={ 2 }
                    locale={ localCustom }
                />
            </PopoverContent>
        </Popover>
    )
}
