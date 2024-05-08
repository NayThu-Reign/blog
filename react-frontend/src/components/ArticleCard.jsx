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
} from "@mui/material";

import {
    MoreVert as MenuIcon,
    // Comment as CommentIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

import { blue, grey, green } from "@mui/material/colors";

import { format } from "date-fns";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";



export default function ArticleCard({article, 
focus, remove}) {
    const navigate = useNavigate();
    const { authUser } = useAuth();
    const [ showMenu, setShowMenu ] = useState(false);
    const [ menuPosition, setMenuPosition ] = useState(null);
    const [ category, setCategory ] = useState(null);
    const [ user, setUser ] = useState(null);
    // const [ pagination, setPagination ] = useState(null);


    const {pathname} = useLocation();


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const api = "http://localhost:8000/api/categories";
                const res = await fetch(`${api}/${article.category_id}`);
                if(!res.ok) throw new Error("failed to fetch Category");

                const data = await res.json();
                setCategory(data.name);

            } catch (error) {
                console.error('Error fetching category:', error);
                setCategory(null);
            }
        };

        const fetchUser = async () => {
            try {
                const api = "http://localhost:8000/api/users";
                const res = await fetch(`${api}/${article.user_id}`);
                if(!res.ok) throw new Error("failed to fetch User");

                const data = await res.json();
                setUser(data.name);

            } catch (error) {
                console.error('Error fetching User:', error);
                setUser(null);
            }
        };

        fetchCategory();
        fetchUser();

    }, [article.category_id, article.user_id]);
    

    return (
        <Card
            variant="outlined"
            sx={{ mb: 2, bgcolor: focus ?"article.background" : "transparent"}}
        >
            <CardContent>
                <Box 
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h5">
                        {article.title}
                    </Typography>
                    {authUser && authUser.id === article.user_id && (
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
                                        const api = "http://localhost:8000/api/articles";
                                        const token = localStorage.getItem("token");

                                        fetch(`${api}/${article.id}`, {
                                            method: "DELETE",
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${token}`,
                                            },
                                        });

                                        remove(article.id);
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
                        alignItems: "flex-start",
                        gap: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 10
                        }}
                    >
                            • {format(article.created_at, "MMM d, y")}

                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 10
                        }}
                    >
                        Category: {category},
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
                
               <CardActionArea
                onClick={() => {
                    navigate(`/articles/${article.id}`);
                }}
               >
                        <Typography
                            sx={{
                                py: 2,
                                px: 1,
                                fontSize: 13,
                            }}
                        >
                            {article.body}
                        </Typography>
               </CardActionArea>
            </CardContent>
            {pathname === "/" && (
                 <CardActions
                    onClick={() => {
                        navigate(`/articles/${article.id}`);
                    }}
                 >
                    <Button size="small">
                        View Detail
                    </Button>
                </CardActions>
            )}
        </Card>
    );
}