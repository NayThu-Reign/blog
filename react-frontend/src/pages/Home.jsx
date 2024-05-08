import { Box, Pagination, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";



export default function Home() {
   

    const [ isLoading, setIsLoading ] = useState(false);
    const [ articles, setArticles ] = useState([]);
    // const [ pagination, setPagination ] = useState(null);

    const remove = id => {
        setArticles(articles.filter(article => article.id !== id));
    }
    // const fetchPage = async (pageUrl) => {
    //     try {
    //         setIsLoading(true);
    //         const token = localStorage.getItem("token");
    //         const res = await fetch(pageUrl, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         const data = await res.json();

    //         if (data.data && Array.isArray(data.data)) {
    //             setArticles(data.data);
    //             setPagination(data);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching page:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // function debounce(func, delay) {
    //     let timerId;
    //     return function (...args) {
    //         if (timerId) {
    //             clearTimeout(timerId);
    //         }
    //         timerId = setTimeout(() => {
    //             func(...args);
    //             timerId = null;
    //         }, delay);
    //     };
    // }
    
    // const fetchPageThrottled = debounce(fetchPage, 1000); // Throttle to 1 request per second
    
    // const handlePageClick = (pageUrl) => {
    //     fetchPageThrottled(pageUrl);
    // };

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
                // setPagination(data);

            } else {
                console.error('Expected paginated data but got:', data);
                setArticles([]);
            }
        })();
        // fetchArticles();
        // fetchPage();
        
    }, []);

    
    return (
        <Box>

                    {
                        articles.map(article => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                remove={remove}
                            />
                        ))              
                    }
                    {/* {pagination && (
                        <Box sx={{mt: 2}}>
                            {pagination.links.map((link) => (
                                <Button
                                    key={link.label}
                                    onClick={() => handlePageClick(link.url)}
                                    disabled={!link.url}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Box>
                    )} */}
           
        </Box>
    );
}