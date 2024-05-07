import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";



export default function Home() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ articles, setArticles ] = useState([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const api = "http://localhost:8000/api/articles";
            const token = localStorage.getItem("token");
            const res = await fetch(api, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (data.data && Array.isArray(data.data)) {
                setArticles(data.data);
            } else {
                console.error('Expected paginated data but got:', data);
                setArticles([]); // Ensure articles is always an array
            }
        })();
    }, []);

    return (
        <Box>
            {
                articles.map(article => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                    />
                ))
            }
           
        </Box>
    );
}