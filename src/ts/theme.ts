import { createContext, useContext } from "react";

export let ThemeCtx = createContext<ThemeContext | undefined>(undefined);

export type Theme = "Default" | "Dark" | "Light";

export type ThemeContext = {
    themeContextSetter: ThemeContextSetter;
}

export function useThemeContext() {
    const ctx = useContext(ThemeCtx);

    if (!ctx) {
        throw new Error(
            "usethemeCtx must be used within themeProvider"
        );
    }

    return ctx;
}

export class ThemeContextSetter {
    currentTheme: Theme;
    private setCurrentTheme: React.Dispatch<React.SetStateAction<Theme>>;

    constructor(currentTheme: Theme, setCurrentTheme: React.Dispatch<React.SetStateAction<Theme>>) {
        this.currentTheme = currentTheme;
        this.setCurrentTheme = setCurrentTheme;

        switch (currentTheme) {
            case "Default":
            case "Dark":
                this.setDarkMode();
                break;
            case "Light":
                this.setLightMode();
                break;
        }
    }

    public setTheme(to: Theme) {
        switch (to) {
            case "Default":
            case "Dark":
                this.setDarkMode();
                break;
            case "Light":
                this.setLightMode();
                break;
        }

        this.setCurrentTheme(to);
        localStorage.setItem("theme", to);
    }

    private setDarkMode() {
        const root = document.documentElement;

        root.style.setProperty('--background-color-dark', '#121212');
        root.style.setProperty('--card-background-dark', '#1E1E1E');

        root.style.setProperty('--text-dark', '#F5F5F5');
        root.style.setProperty('--text-secondary-dark', '#A0A0A0');

        root.style.setProperty('--border-dark', '#2E2E2E');
        root.style.setProperty('--border-hover-dark', '#555555');

        root.style.setProperty('--accent-dark', '#D4D4D4');

        root.style.setProperty('--button', '#3A3A3A');
        root.style.setProperty('--button-hover', '#555555');

        root.style.setProperty('--navbar-background-dark', '#181818');
        root.style.setProperty('--navbar-border-dark', '#2A2A2A');
        root.style.setProperty('--link-hover-dark', '#D0D0D0');
    }

    private setLightMode() {
        const root = document.documentElement;

        root.style.setProperty('--background-color-dark', '#F8F9FA');
        root.style.setProperty('--card-background-dark', '#FFFFFF');

        root.style.setProperty('--text-dark', '#343A40');
        root.style.setProperty('--text-secondary-dark', '#6C757D');

        root.style.setProperty('--border-dark', '#DEE2E6');
        root.style.setProperty('--border-hover-dark', '#ADB5BD');

        root.style.setProperty('--accent-dark', '#343A40');

        root.style.setProperty('--button', '#343A40');
        root.style.setProperty('--button-hover', '#495057');

        root.style.setProperty('--navbar-background-dark', '#FFFFFF');
        root.style.setProperty('--navbar-border-dark', '#E9ECEF');
        root.style.setProperty('--link-hover-dark', '#495057');
    }
}