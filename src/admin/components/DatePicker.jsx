import { useState } from "react"
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

export const DatePicker = ({ date, setDate }) => {
    
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
                    <span>Selecciona un rango de fechas</span>
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
