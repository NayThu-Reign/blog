import { Box, Typography, TextField, Button, Alert} from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setAuth, setAuthUser } = useAuth();
    const navigate = useNavigate();

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            setHasError(true);
            setErrorMessage("Email or password required");
            return;
        }

        try {
            const api = "http://localhost:8000/api/login";
            const res = await fetch(api, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                setHasError(true);
                setErrorMessage("Incorrect email or password");
                return;
            }

            const token = await res.text();
            localStorage.setItem("token", token);

            fetch("http://localhost:8000/api/verify", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to verify user');
                }
                return res.json();
            })
            .then(user => {
                setAuth(true);
                setAuthUser(user);
                navigate("/");
            })
            .catch(error => {
                console.error('Error verifying user:', error);
                setHasError(true);
                setErrorMessage("Failed to verify user");
            });
        //         .then(res => res.json())
        //         .then(user => {
        //             setAuth(true);
        //             setAuthUser(user);
        //             navigate("/")
        //         } )

        //     // if (userRes.ok) {
        //     //     const user = await userRes.json();
        //     //     setAuth(true);
        //     //     setAuthUser(user);
        //     //     navigate("/");
        //     // } else {
        //     //     setHasError(true);
        //     //     setErrorMessage("Failed to verify user");
        //     // }
        } catch (error) {
            console.error('Error logging in:', error);
            setHasError(true);
            setErrorMessage("An error occurred while logging in");
        }
    };

    return (
        <Box>
            <Typography variant="h4"> Login </Typography>
            <Box sx={{ mt: 4 }}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>

                    {hasError && (
                        <Alert severity="warning" sx={{ mb: 4 }}>
                            {errorMessage}
                        </Alert>
                    )}

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
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
                <Button
                    variant="text"
                    sx={{ mt: 2 }}
                    fullWidth
                    onClick={() => {
                        navigate("/register");
                    }}>
                    Register
                </Button>
            </Box>
        </Box>
    );
}
