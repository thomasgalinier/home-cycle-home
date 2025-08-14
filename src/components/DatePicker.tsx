import { PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverTrigger } from "./ui/popover";

export function DatePicker({ date, disabled=false, setDate }: { date: string | null, disabled?: boolean, setDate?: (date: string | null) => void }) {
	const [open, setOpen] = useState(false);
	const dateFormated = date ? new Date(date) : null;
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" disabled={disabled} >
                    {dateFormated ? dateFormated.toLocaleString() : "Sélectionner une date et heure"}
					<CalendarIcon />
				</Button>
			</PopoverTrigger>
            <PopoverContent>
                <Calendar
            mode="single"
            selected={dateFormated || undefined}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate?.(date ? date.toISOString() : null)
              setOpen(false)
            }}
          />
            </PopoverContent>
		</Popover>
	);
}
