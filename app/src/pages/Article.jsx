import {
    Box,
    FormControl,
    Input,
    InputAdornment,
    IconButton,
    Typography
} from "@mui/material";

import { Add as AddIcon} from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import ArticleCard from "../components/ArticleCard";
import CommentCard from "../components/CommentCard";

import { useNavigate, useParams } from "react-router-dom";

export default function Article() {
    const { id } = useParams();

    const inputRef = useRef();
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ article, setArticle ] = useState({});
    const [ comments, setComments ] = useState([]);
    const [ hasUpdate, setHasUpdate ] = useState(false);

    const remove = _id => {
        navigate("/");
    }

    useEffect(() => {
        ( async () => {
            try {
                const token = localStorage.getItem("token");
                const articleResponse = await fetch(`http://localhost:8000/api/articles/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                if(!articleResponse.ok) throw new Error("failed to fetch Article");

                const articleData = await articleResponse.json();

                const commentsResponse = await fetch(`http://localhost:8000/api/comments/article/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                if(!commentsResponse.ok) throw new Error("failed to fetch Article");

                const commentsData = await commentsResponse.json();


                setArticle(articleData);
                setComments(commentsData);
                setIsLoading(false);
                setHasUpdate(false);
            } catch (error) {
                console.error('Error fetching error:', error);
                // setArticle(null);
            }
        })();
    }, [id, hasUpdate]);

    // useEffect(() => {
    //     (async () => {
    //         setIsLoading(true);

    //         const api = "http://localhost:8000/api/articles";
    //         const res = await fetch(`${api}/${id}`);
    //         const data = await res.json();
    //         setArticle(data);
    //         setIsLoading(false);
    //         setHasUpdate(false);
    //     })();
    // }, [hasUpdate]);

    return (
        <Box>
            {isLoading ? (
                <Box>Loading...</Box>
            ) : (
                <>
                    <ArticleCard
                        key={article.id}
                        article={article}
                        focus={true}
                        remove={remove}
                    />

                    <Box sx={{ mt: 3 }}>
                        {comments.map(comment => {
                            return (
                                <CommentCard
                                    key={comment.id}
                                    comment={comment}
                                    remove={remove}
                                />
                            );
                        })}
                    </Box>  

                    <Box
                        sx={{
                            p: 2,
                            pb: 3,
                            mt: 4,
                            bottom: 0,
                            position: "sticky",
                            bgcolor: "banner.background"
                        }}
                    >
                        <FormControl fullWidth>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    
                                    ( async () => {
                                        const content = inputRef.current.value;
                                        if(!content) return false;

                                        inputRef.current.value = "";
                                        inputRef.current.focus();
                                        
                                        const api = ("http://localhost:8000/api/comments");
                                        const token = localStorage.getItem("token");
                                        
                                        const res = await fetch(api, {
                                            method: "POST",
                                            body: JSON.stringify({content, article_id: id}),
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${token}`,
                                            },
                                        });
                                        if(!res.ok) return false;
                                        setHasUpdate(true);
                                    })();
                                }}
                            >
                                <Input
                                    inputRef={inputRef}
                                    sx={{ fontSize: "16px", py: 2}}
                                    placeholder="Your Comment"
                                    multiline
                                    fullWidth
                                    variant="standard"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton type="submit">
                                                <AddIcon color="info" />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </form>
                        </FormControl>

                    </Box>
                </>

            )}
        </Box>
    )
}