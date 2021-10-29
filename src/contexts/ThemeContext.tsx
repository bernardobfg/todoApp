import { createContext, ReactNode, useState} from "react"


type ThemeContextType = {
    themeName: string,
    changeTheme: (theme: string) => void;
}

type ThemeProviderProps = {
    children: ReactNode
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProvider(props: ThemeProviderProps) {
    const [themeName, setThemeName] = useState(localStorage.getItem('@todoApp-theme') ?? 'light')
    function changeTheme(theme: string) {
        setThemeName(theme)
        localStorage.setItem('@todoApp-theme', theme)
    }

    return (
        <ThemeContext.Provider value={{themeName, changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}