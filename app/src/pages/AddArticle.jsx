import {
    Button,
    Input,
    Box,
    Alert,
    TextField,
    MenuItem,
} from "@mui/material";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUIState } from "../providers/UIStateProvider";

export default function AddArticle() {
    const navigate = useNavigate();
    const titleRef = useRef();
    const bodyRef = useRef();
    const categoryRef = useRef();
    const [ hasError, setHasError ] = useState();
    const [ errorMessage, setErrorMessage ] = useState("error");
    const [ categories, setCategories ] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    
    const { setFeedbackMessage, setOpenFeedback } = useUIState();

    useEffect(() => {
        ( async() => {            
            const api = "http://localhost:8000/api/categories";
            const res = await fetch(api);
            const data = await res.json();
            setCategories(data);      
        })();
    }, []);

    const handleCategoryChange = e => {
        setSelectedCategory(e.target.value);
    };

    return (
        <Box>
            {hasError && (
                <Alert
                    severity="warning"
                    sx={{ mb: 4 }}
                >
                    {errorMessage}
                </Alert>
                
            )}

            <form 
                onSubmit={e => {
                    e.preventDefault();
                    const title = titleRef.current.value;
                    const body = bodyRef.current.value;

                    if(!title || !body ) return false;

                   (async () => {
                        const api = "http://localhost:8000/api/articles";
                        const token = localStorage.getItem("token");
                        const res = await fetch(api, {
                            method: "POST",
                            body: JSON.stringify({ title, body, category_id: selectedCategory }),
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        if(!res.ok) {
                            setHasError(true);
                            setErrorMessage("Unable to add article");
                            return false;
                        }
                        setFeedbackMessage("A new Article added");
                        setOpenFeedback(true);
                        navigate("/");
                   })();
                }}
            >
                <Input
                    inputRef={titleRef}
                    sx={{ fontSize: "16px", py: 2}}
                    placeholder="Title"
                    fullWidth
                />
                <Input
                    inputRef={bodyRef}
                    sx={{ fontSize: "14px", py: 2, mb: 3}}
                    placeholder="Body"
                    multiline
                    fullWidth
                    minRows={4}
                />

                <TextField
                    select
                    label="Choose Category"
                    placeholder="choose category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    fullWidth
                >
                    {categories.map(category => {
                        return (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        )
                    })}
                </TextField>
                <Box
                    sx={{
                        display: "flex",
                        mt: 3,
                        justifyContent: "center"
                    }}
                >
                    <Button
                        type="small"
                        size="small"
                        variant="contained"
                        color="info"
                        sx={{ borderRadius: 5}}
                    >
                        Add Article
                    </Button>
                </Box>
            </form>
        </Box>
    )
}