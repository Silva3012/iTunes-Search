import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';


export default function SearchBar({ handleSearch }) {
    const [term, setTerm] = useState('');
    const [mediaType, setMediaType] = useState('all');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send a GET request to the backend search route
        const response = await fetch(`http://localhost:3001/search?term=${term}&mediaType=${mediaType}`);
        const data = await response.json();

        // Navigate to the Results component with the search results
        navigate('/results',
            { state: { results: data.results }});
    };

    return (
        <form onSubmit={handleSubmit}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <TextField
            label="Search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            variant="outlined"
            style={{ marginRight: '10px' }}
        />

        <FormControl style={{ minWidth: '120px', marginRight: '10px' }}>
            <InputLabel id="mediaType-label">Media Type</InputLabel>
            <Select
            labelId="mediaType-label"
            id="mediaType"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="movie">Movie</MenuItem>
            <MenuItem value="podcast">Podcast</MenuItem>
            <MenuItem value="music">Music</MenuItem>
            <MenuItem value="musicVideo">Music Video</MenuItem>
            <MenuItem value="audiobook">Audiobook</MenuItem>
            <MenuItem value="shortFilm">Short Film</MenuItem>
            <MenuItem value="tvShow">TV Show</MenuItem>
            <MenuItem value="software">Software</MenuItem>
            <MenuItem value="ebook">Ebook</MenuItem>
            </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
            Search
        </Button>
        </form>
    )
}