import { useSearchAdresse } from "@/hooks/adresse/useSearchAdresse";
import { useGetZone } from "@/hooks/carte/useGetZone";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { cn } from "@/lib/utils";
import { isInZoneGeographique } from "@/services/tools";
import type { AdresseSuggestion } from "@/services/type/adresse";
import type { ZoneType } from "@/services/type/carte";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";

type AdresseCompleteProps = {
	defaultValue?: string;
	onSelect: (suggestion: AdresseSuggestion) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	limit?: number;
	postcode?: string;
	city?: string;
	value: string;
	setValue: (value: string) => void;
	onZoneCheck?: (zone: ZoneType | null) => void;
};

export function AdresseComplete({
	onSelect,
	placeholder = "12 rue de la...",
	disabled,
	className,
	limit = 5,
	postcode,
	city,
	value, 
	setValue,
    onZoneCheck,
}: AdresseCompleteProps) {
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { data: zones = [] } = useGetZone();
	const [lastZone, setLastZone] = useState<ZoneType | null | undefined>(undefined);
	const debounced = useDebouncedValue(value, 300);
	const { data: suggestions = [], isFetching } = useSearchAdresse(debounced, {
		limit,
		postcode,
		city,
	});

	useEffect(() => {
		const shouldOpen = value.trim().length >= 3;
		setOpen(shouldOpen);
		setActiveIndex(0);
	}, [value]);
	useEffect(() => {
		function onDocClick(e: MouseEvent) {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", onDocClick);
		return () => document.removeEventListener("mousedown", onDocClick);
	}, []);

	const hasResults = suggestions.length > 0;

	function handleSelect(s: AdresseSuggestion) {
		setValue(s.label);
		setOpen(false);
		// Vérifie si l'adresse sélectionnée est incluse dans une des zones
		const zone = isInZoneGeographique([s.longitude, s.latitude], zones as ZoneType[]);
		setLastZone(zone);
		onZoneCheck?.(zone);
		onSelect?.(s);
	}

	function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (!open) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((i) => (i + 1) % Math.max(1, suggestions.length));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((i) => (i - 1 + Math.max(1, suggestions.length)) % Math.max(1, suggestions.length));
		} else if (e.key === "Enter") {
			if (suggestions[activeIndex]) {
				e.preventDefault();
				handleSelect(suggestions[activeIndex]);
			}
		} else if (e.key === "Escape") {
			setOpen(false);
		}
	}
	
	return (
		<div className={cn("relative", className)} ref={containerRef}>
			<Input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onFocus={() => value.trim().length >= 3 && setOpen(true)}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				disabled={disabled}
				aria-autocomplete="list"
				aria-expanded={open}
				aria-controls="adresse-complete-listbox"
			/>

			{/* Résultat de la vérification de zone après sélection */}
			{lastZone !== undefined && (
				<div className={cn("mt-1 text-sm", lastZone ? "text-foreground" : "text-destructive")}> 
					{lastZone ? (
						<span className="inline-flex items-center gap-2">
							<span
								aria-hidden
								className="inline-block h-3 w-3 rounded-full"
								style={{ backgroundColor: lastZone.color }}
							/>
							Zone: {lastZone.nom}
						</span>
					) : (
						<span>Adresse hors des zones de service</span>
					)}
				</div>
			)}

					{open && (
						<div
							id="adresse-complete-listbox"
							className={cn(
								"absolute left-0 right-0 z-50 mt-1 max-h-72 overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
								"animate-in fade-in-0 zoom-in-95"
							)}
						>
					{isFetching && (
						<div className="px-2 py-1.5 text-sm text-muted-foreground">Recherche…</div>
					)}
					{!isFetching && !hasResults && value.trim().length >= 3 && (
						<div className="px-2 py-1.5 text-sm text-muted-foreground">Aucune adresse</div>
					)}
								{!isFetching && hasResults && (
									<div className="m-0 p-0">
										{suggestions.map((s, idx) => (
											<button
												key={s.id}
												type="button"
												className={cn(
													"w-full cursor-pointer select-none rounded-sm px-2 py-1.5 text-left text-sm",
													idx === activeIndex ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
												)}
												onMouseEnter={() => setActiveIndex(idx)}
												onMouseDown={(e) => e.preventDefault()}
												onClick={() => handleSelect(s)}
											>
												<div className="truncate font-medium">{s.label}</div>
												<div className="truncate text-xs text-muted-foreground">
													{s.postcode ? `${s.postcode} ` : ""}
													{s.city ?? ""}
												</div>
											</button>
										))}
									</div>
								)}
				</div>
			)}
		</div>
	);
}

