import { useState, createContext, useContext } from "react";

const UIStateContext = createContext();

export function useUIState() {
    return useContext(UIStateContext);
}

export default function UIStateProvider({ children }) {
    const [openFeedback, setOpenFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    return (
        <UIStateContext.Provider value={{
            openFeedback,
            setOpenFeedback,
            feedbackMessage,
            setFeedbackMessage,
        }}>
            {children}
        </UIStateContext.Provider>
    )
}