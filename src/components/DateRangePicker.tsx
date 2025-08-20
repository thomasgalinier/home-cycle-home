import { PopoverContent } from "@radix-ui/react-popover";
import {  format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import type { Updater } from "@tanstack/react-form";
import type { DateRange } from "react-day-picker";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverTrigger } from "./ui/popover";
export type DateRangePickerProps = {
    date: DateRange | undefined;
    setDate: (updater: Updater<{ from: Date; to: Date }>) => void;
}

export function DateRangePicker({ date, setDate }: DateRangePickerProps) {
    // const [date, setDate] = useState<DateRange | undefined>({
    //     from: addDays(new Date(), -20),
    //     to: new Date(),
    // });

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant="outline"
                >
                    <CalendarIcon />
                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, "dd MMM yyyy", { locale: fr })} -{" "}
                                {format(date.to, "dd MMM yyyy", { locale: fr })}
                            </>
                        ) : (
                            format(date.from, "dd MMM yyyy", { locale: fr })
                        )
                    ) : (
                        <span>Choisir une date</span>
                    )}

                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[10000]" align="start">
                <Calendar
                    autoFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={(selectedDate) => {
                        if (selectedDate?.from && selectedDate?.to) {
                            setDate({ from: selectedDate.from, to: selectedDate.to });
                        }
                    }}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    )
}