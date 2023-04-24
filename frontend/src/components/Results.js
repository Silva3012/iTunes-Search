import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';



export default function Results(props) {
    // Get the results array from the location state
    const { state } = useLocation();
    const results = state?.results;

    // Create a state to keep track of whether an item has been to favourites
    // const [addedToFavourites, setAddedToFavourites] = useState({});

    // Load the addedToFavourites state from local storage, if it exists
    const [addedToFavourites, setAddedToFavourites] = useState(() => {
        const savedState = localStorage.getItem('addedToFavourites');
        return savedState ? JSON.parse(savedState) : {};
    });

    // Function to add an item to the favourites list
    const handleAddToFavourites = async (item) => {
        try {
            // Check if the item is already in the favourites list
            if (props.favourites && props.favourites.some((fav) => fav.trackId === item.trackId)) {
                setAddedToFavourites({ ...addedToFavourites, [item.trackId]: 'alreadyExists' });
                return;
            }

            // Send a POST request to the server to add the item to the favourites list
            const response = await fetch('http://localhost:3001/favourites/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const data = await response.json();
            console.log(data.message);

            // Set the addedToFavourites state to true
            setAddedToFavourites({ ...addedToFavourites, [item.trackId]: true });
            localStorage.setItem('addedToFavourites', JSON.stringify({ ...addedToFavourites, [item.trackId]: true }));
        } catch (error) {
            console.error(error);
        }

        // Disable the favourite button if the item has already been added to favourites
        const isAlreadyAddedToFavourites = (item) => addedToFavourites[item.trackId] === true;

    };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {state?.results?.map((result) => (
        <Card key={result.trackId} style={{ maxWidth: 345, margin: '10px' }}>
          <CardMedia
            component="img"
            height="140"
            image={result.artworkUrl100}
            alt={result.trackName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {result.trackName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {result.artistName}
            </Typography>
            <IconButton 
                onClick={() => handleAddToFavourites(result)}
                color={
                    addedToFavourites[result.trackId] === true
                        ? 'secondary'
                        : addedToFavourites[result.trackId] === 'alreadyExists'
                        ? 'error'
                        : 'default'
                    
                }
                aria-label='add to favourites'
                disabled={result.addedToFavourites}
            >
                <FavoriteIcon />
            </IconButton>
            {addedToFavourites[result.trackId] === true && (
                <Typography color="secondary">Added to Favourites!</Typography>
            )}
            {addedToFavourites[result.trackId] === 'alreadyExists' && (
                <Typography color="error">Item already exists in Favourites!</Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}