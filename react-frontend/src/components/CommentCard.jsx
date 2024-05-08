import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    CardActionArea,
    IconButton,
    Button,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Avatar,
} from "@mui/material";

import {
    MoreVert as MenuIcon,
    Comment as CommentIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

import { blue, grey, green } from "@mui/material/colors";

import { format } from "date-fns";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useParams } from "react-router-dom";




export default function CommentCard({comment,
focus, remove, article }) {

    const navigate = useNavigate();
    const { authUser } = useAuth();
    const [ category, setCategory ] = useState([]);
    const [ showMenu, setShowMenu ] = useState(false);
    const [ menuPosition, setMenuPosition ] = useState(null);
    const [ user, setUser ] = useState([]);

    const {pathname} = useLocation();




    useEffect(() => {
        
        const fetchUser = async () => {
            try {
                const api = "http://localhost:8000/api/users";
                const res = await fetch(`${api}/${comment.user_id}`);
                if(!res.ok) throw new Error("failed to fetch User");

                const data = await res.json();
                setUser(data.name);
            } catch (error) {
                console.error('Error fetching User:', error);
                setUser(null);
            }
        };


        fetchUser();

    }, [comment.user_id]);
    
 
    


    return (
        <Card
            variant="outlined"
            sx={{ mb: 2, bgcolor: focus ?"article.background" : "transparent"}}
        >
            <CardContent>
                
               <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
               >
                            <Typography
                                sx={{
                                    py: 2,
                                    px: 1,
                                    fontSize: 13,
                                }}
                            >
                                {comment.content}
                            </Typography>
                                {authUser && authUser.id === comment.user_id && (
                                    <Box>
                                        <IconButton
                                            onClick={e => {
                                                setShowMenu(true);
                                                setMenuPosition(e.currentTarget)
                                            }}>
                                            <MenuIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={menuPosition}
                                            open={showMenu}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            onClose={() => {
                                                setShowMenu(false);
                                        }}>
                                            <MenuItem
                                                onClick={() => {
                                                    const api = `http://localhost:8000/api/comments/delete/${comment.id}`;
                                                    const token = localStorage.getItem("token");

                                                    fetch(api, {
                                                        method: "DELETE",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            Authorization: `Bearer ${token}`,
                                                        },
                                                    });

                                                        remove(comment.id);
                                                }}>
                                                <ListItemIcon>
                                                    <DeleteIcon  color="error"/>
                                                </ListItemIcon>
                                                <ListItemText primary="Delete" />
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                )}

               </Box>
               <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                   
                    <Typography
                        sx={{
                            fontSize: 10
                        }}
                    >
                        • {format(comment.created_at, "MMM d, y")}
                    </Typography>
                    <Typography
                        sx={{
                            color: blue[500],
                            fontSize: 10,
                        }}
                    >
                        By {user}
                    </Typography>
                    
                </Box>
            </CardContent>
        </Card>
    );
}