import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import logo from '../images/itunes_logo.png'


export default function SearchBar() {
    const [term, setTerm] = useState('');
    const [mediaType, setMediaType] = useState('all');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Set loading state to true
        // Send a GET request to the backend search route
        const response = await fetch(`http://localhost:3001/search?term=${term}&mediaType=${mediaType}`);
        const data = await response.json();

        setLoading(false); // Set loading state to false

        // Navigate to the Results component with the search results
        navigate('/results',
            { state: { results: data.results }});
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <img src={logo} alt="iTunes Logo" style={{ width: '150px' }}/>

            <form onSubmit={handleSubmit}>
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

                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px', marginRight: '30px' }}>
                    Search
                </Button>

                {loading && <CircularProgress />} {/* Conditional rendering of CircularProgress */}
            </form>
        </div>
    )
}