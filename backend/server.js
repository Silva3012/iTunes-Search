const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;


const app = express();

app.use(cors())

// Use JSON middleware to parse incoming request
app.use(express.json());

//Set up middleware to handle JSON data
// app.use(bodyParser.json());

// Favourites list to hold items
let favourites = [];

// Check if favourites.json exists, and if so, read its contents and set favorites
if (fs.existsSync('favourites.json')) {
    favourites = JSON.parse(fs.readFileSync('favourites.json'));
} else {
    // Create favourites.json with an empty array if it doesn't exist
    fs.writeFile('favourites.json', '[]', (err) => {
        if (err) throw err;
        console.log('favourites.json created');
    });
}


app.get('/search', async (req, res) => {
    try {
        // Extract query parameters from request
        const { term, mediaType } = req.query;
        //Dynamically import the node-fetch library
        const fetch = await import('node-fetch');
        // Fetch data from iTunes Search API using query parameters
        const response = await fetch.default(`https://itunes.apple.com/search?term=${term}&media=${mediaType}`);
        // Parse response as JSON
        const json = await response.json();
        // Send response back to client as JSON
        res.json(json);
    } catch (error) {
        //Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
    
});

// Add item to favourites list
app.post('/favourites/add', (req, res) => {
    const item = req.body;

    // Check if item already exists in favourites list
    if (favourites.some(fav => fav.trackId === item.trackId)) {
        return res.status(400).json({ message: 'Item already exists in favorites list'});
    }
    
    // Add item to the favourites list
    favourites.push(item);
    
    // Write favourites to file
    fs.writeFile('favourites.json', JSON.stringify(favourites), (err) => {
        if (err) throw err;
        console.log('Favourites written to file');
    });

    // Send response back to client
    res.json({message: 'Item added to favourites list'});
});

// Remove item from favourites list
app.delete('/favourites/:trackId', (req, res) => {
    const { trackId } = req.params;

    // Find index of the item in favourites list
    const index = favourites.findIndex(fav => fav.trackId === parseInt(trackId));

    // console.log(`trackId: ${trackId}`);
    // console.log(`index: ${index}`);
    // console.log(`favourites: ${JSON.stringify(favourites)}`);

    // console.log('trackId:', trackId);
    // console.log('favourites:', favourites);

    // Check if the item exists in favourites list
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found in favourites list'});
    }
    // Remove item from the favourites list
    favourites.splice(index, 1);

     // Write favorites to file
    fs.writeFile('favourites.json', JSON.stringify(favourites), (err) => {
        if (err) throw err;
        console.log('Favourites written to file');
    });

    // Send response back to client
    res.json({ message: 'Item removed from favourites list'});
});

// Get favourites list
app.get('/favourites', (req, res) => {
    // Send favourites list back to client as JSON
    res.json(favourites);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
}) 