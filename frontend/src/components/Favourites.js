import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const StyledCard = styled(Card)({
  maxWidth: 345,
  margin: '10px',
});

const StyledCardMedia = styled(CardMedia)({
  height: 140,
  width: '100%',
});

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  justifyContent: 'space-between',
});


export default function Favourites() {
    // State to store the list of favourites
    const [favourites, setFavourites] = useState([]);

    // Function to fetch the favourites list from the server
    const fetchFavourites = async () => {
        try {
            const response = await fetch('http://localhost:3001/favourites');
            const data = await response.json();
            console.log(data); // add this line
            setFavourites(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Load the favourites list from the server when the component mounts
    useEffect(() => {
        fetchFavourites();
    }, []);

    // Function to remove an item from the favourites list
    const handleRemoveFromFavourites = async (item) => {
        try {
            // Send a DELETE request to the server to remove the item from the favourites list
            const response = await fetch(`http://localhost:3001/favourites/${item.trackId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', 
                },
            });
            const data = await response.json();
            console.log(data.message);

            // Update the favourites list in the state
            const updatedFavourites = favourites.filter(
                (fav) => fav.trackId !== item.trackId
            );
            setFavourites(updatedFavourites);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {favourites.length > 0 ? (
            favourites.map((fav) => (
            <StyledCard key={fav.trackId}>
            <StyledCardMedia
              image={fav.artworkUrl100}
              title={fav.trackName}
            />
            <StyledCardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {fav.trackName}
              </Typography>
              <Button onClick={() => handleRemoveFromFavourites(fav)} variant="contained">
                Remove
              </Button>
            </StyledCardContent>
            <Typography variant="body2" color="text.secondary">
              {fav.artistName}
            </Typography>
            </StyledCard>
        ))
        ) : (
            <Typography variant="body2" color="text.secondary">
                No Favourites yet.
            </Typography>
        )}
        </div>
    );
}

