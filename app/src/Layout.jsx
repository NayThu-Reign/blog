import { Outlet, useLocation } from "react-router-dom";
import { Container, Box, CircularProgress, Alert, Snackbar, Fab} from "@mui/material";
import { Add as AddIcon} from "@mui/icons-material";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./components/Header";
import { useUIState } from "./providers/UIStateProvider";
import { useAuth } from "./providers/AuthProvider";

export default function Layout() {
    const { openFeedback, setOpenFeedback, feedbackMessage,} = useUIState();
    const { auth } = useAuth();
    const { pathname } = useLocation();

    const navigate = useNavigate();

    return (
        <Box>
            <Header />
            <Container
                maxWidth="sm"
                sx={{ mt: 4}}
            >
                <Outlet />
            </Container>
            {!pathname === "/new" && (
                <Fab
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: 40,
                    right: 40,
                }}
                onClick={() => {
                    navigate("/new");
                }}
            >
                <AddIcon />
            </Fab>
            )}
            <Snackbar
                open={openFeedback}
                autoHideDuration={4000}
                onClose={() => {
                    setOpenFeedback(false);
                }}
                anchorOrigin={{
                    vertical:"top",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity="info"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {feedbackMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}