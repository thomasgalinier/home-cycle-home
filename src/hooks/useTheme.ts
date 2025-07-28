import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
	const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");

	useEffect(() => {
		const root = window.document.documentElement;

		// Supprimer les classes de thème existantes
		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";
			root.classList.add(systemTheme);
		} else {
			root.classList.add(theme);
		}
	}, [theme]);

	return {
		theme,
		setTheme,
	};
}
