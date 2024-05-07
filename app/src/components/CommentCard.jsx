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




export default function ArticleCard({comment,
focus}) {
    const navigate = useNavigate();
    const [ showMenu, setShowMenu ] = useState(false);
    const [ menuPosition, setMenuPosition ] = useState(null);
    // const [ category, setCategory ] = useState([]);
    const [ user, setUser ] = useState([]);

    const {pathname} = useLocation();



    
// const token = "2|JYTBHnzySEPkwZKAPIf9GeuM5Dei0JgVhfQEdZ9O667657b1";

    useEffect(() => {
        // const fetchCategory = async () => {
        //     try {
        //         const api = "http://localhost:8000/api/categories";
        //         const res = await fetch(`${api}/${article.category_id}`);
        //         if(!res.ok) throw new Error("failed to fetch Category");

        //         const data = await res.json();
        //         setCategory(data.name);
        //     } catch (error) {
        //         console.error('Error fetching category:', error);
        //         setCategory(null);
        //     }
        // };

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

        // fetchCategory();
        fetchUser();

    }, [comment.user_id]);
    // const formatDate = (dateString) => {
    //     try {
    //         const date = new Date(dateString);
    //         if (isNaN(date.getTime())) {
    //             return "Invalid Date";
    //         }
    //         return format(date, "MMM d, y");
    //     } catch (error) {
    //         console.error("Error formatting date:", error);
    //         return "Invalid Date";
    //     }
    // };
 
    


    return (
        <Card
            variant="outlined"
            sx={{ mb: 2, bgcolor: focus ?"article.background" : "transparent"}}
        >
            <CardContent>
                {/* <Box>
                    <Typography variant="h5">
                        {article.title}
                    </Typography>
                </Box> */}
                
               <CardActionArea>
                        <Typography
                            sx={{
                                py: 2,
                                px: 1,
                                fontSize: 13,
                            }}
                        >
                            {comment.content}
                        </Typography>
               </CardActionArea>
               <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {/* <Typography
                        sx={{
                            fontSize: 12
                        }}
                    >
                        • {format(article.created)}
                    </Typography> */}
                    {/* <Typography
                        sx={{
                            fontSize: 12
                        }}
                    >
                        Category: {category},
                    </Typography> */}
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