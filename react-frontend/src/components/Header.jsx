import { 
    AppBar, 
    Toolbar, 
    Box, 
    Typography, 
    IconButton, 
    Button, 
    Menu, 
    MenuItem,
    List,
    ListItem,
    ListItemButton

} from "@mui/material";

import {
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useAppTheme } from "../providers/AppThemeProvider";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";

export default function Header() {
    const { mode, setMode } = useAppTheme();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { auth, setAuth, authUser, setAuthUser } = useAuth();
    const [ showMenu, setShowMenu ] = useState(false);
    const [ menuPosition, setMenuPosition ] = useState(null);

    return (
        <AppBar position="sticky">
            <Toolbar
                sx={{ 
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box>
                    <Button
                        color="inherit"
                        sx={{fontSize: "20px"}}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Reign
                    </Button>
                </Box>
                
                <Box sx={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    {auth && (
                       <List>
                            <>
                               <ListItem>
                                    <ListItemButton
                                         onClick={e => {
                                            setShowMenu(true);
                                            setMenuPosition(e.currentTarget)
                                        }}
                                    >
                               
                                        {authUser.name}
                                    </ListItemButton>

                                    <Menu
                                        anchorEl={menuPosition}
                                        open={showMenu}
                                        onClose={() => {
                                            setShowMenu(false);
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setAuth(false);
                                                localStorage.removeItem("token");
                                                navigate("/login");
                                            }}
                                        >
                                            <Button>
                                                Logout
                                            </Button>
                                        </MenuItem>
                                    </Menu>
                                </ListItem> 
                            </>
                       </List>
                    )}
                    {!auth && (
                        <Box>
                            <Button 
                                color="inherit" 
                                sx={{ fontSize: 14}} 
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Login
                                
                            </Button>
                            <Button 
                                color="inherit" 
                                sx={{ fontSize: 14}}
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                Register
                            </Button>
                        </Box>
                    )}
                    {mode === "dark" ? (
                        <IconButton
                            color="inherit"
                            onClick={() => setMode("light")}
                        >
                            <LightModeIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            color="inherit"
                            onClick={() => setMode("dark")}
                        >
                            <DarkModeIcon />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}