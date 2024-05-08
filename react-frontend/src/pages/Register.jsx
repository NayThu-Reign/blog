import { Box, Typography, TextField, Button, Alert} from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useUIState } from "../providers/UIStateProvider";

export default function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const navigate = useNavigate();

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { setFeedbackMessage, setOpenFeedback } = useUIState();

    const handleRegister = async () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const password_confirmation = passwordRef.current.value;

        if (!name || !email || !password || !password_confirmation) {
            setHasError(true);
            setErrorMessage("Email or password or name required");
            return;
        }

        try {
            const api = "http://localhost:8000/api/users";
            const res = await fetch(api, {
                method: "POST",
                body: JSON.stringify({ name, email, password, password_confirmation}),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                setHasError(true);
                setErrorMessage("Incorrect email or password");
                return;
            }

            setFeedbackMessage("Account created");
            setOpenFeedback(true);
            navigate("/login");

            
        } catch (error) {
            console.error('Error logging in:', error);
            setHasError(true);
            setErrorMessage("An error occurred while logging in");
        }
    };

    return (
        <Box>
            <Typography variant="h4"> Register </Typography>
            <Box sx={{ mt: 4 }}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
                }}>

                    {hasError && (
                        <Alert severity="warning" sx={{ mb: 4 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    <TextField
                        label="Name"
                        fullWidth
                        sx={{ mb: 2 }}
                        inputRef={nameRef}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        sx={{ mb: 2 }}
                        inputRef={emailRef}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        type="password"
                        sx={{ mb: 2 }}
                        inputRef={passwordRef}
                    />
                    <TextField
                        label="Password_Confirmation"
                        fullWidth
                        type="password"
                        sx={{ mb: 2 }}
                        inputRef={passwordConfirmationRef}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        
                    >
                        Register
                    </Button>
                </form>
                <Button
                    variant="text"
                    sx={{ mt: 2 }}
                    fullWidth
                    onClick={() => {
                        navigate("/login");
                    }}>
                    Login
                </Button>
            </Box>
        </Box>
    );
}
