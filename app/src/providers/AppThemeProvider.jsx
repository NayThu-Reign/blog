import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { blue, grey, purple } from "@mui/material/colors";

const AppThemeContext = createContext();

export function useAppTheme() {
    return useContext(AppThemeContext);
}

export default function AppThemeProvider({ children }) {
    const [ mode, setMode ] = useState("light");

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode,
                ...(mode === "light"
                ? {
                    header: { background: purple[400]},
                    banner: { background: "#e1e1e1"},
                    article: { background: blue[50]},
                }
                : {
                    header: { background: purple[900]},
                    banner: { background: "#222"},
                    article: { background: grey[900]},
                })
            },
        });
    }, [mode]);

    return (
        <AppThemeContext.Provider value={{mode, setMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    )
}