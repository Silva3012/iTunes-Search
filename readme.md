Itunes Search

# Overview

This is a simple search app that allows users to search for content within the iTunes Store and save their favourite content to a list. This app is built using Node.js, Express, and React.

# How to Use

- Simply enter a search term and select a media type from the dropdown menu.

- Once the search results are displayed, you can add an item to your favourites list by clicking the heart shaped icon next to the item.

- To view your favourites list, click on the "heart shaped" icon in the navbar.

- To remove an item from your favourites list, simply click the trash icon next to the item.

# Installation and Running the App

To install and run the app on your local machine, follow these steps:

1. Clone this repository to your local machine by running the following
   command in your terminal: git clone https://github.com/Silva3012/iTunes-Search.git

2. Install the required dependencies by running npm install in the root directory of the project.

3. Start the development server by running npm start in the root directory of the project.

4. Navigate to http://localhost:3000 in your web browser to use the app.

# Security Measures

- The iTunes Search API does not require an API key. Requests to the API are made by constructing the URL with the appropriate query parameters. For example, to search for music tracks containing the term "Future", you could use the following URL:
  https://itunes.apple.com/search?term=future&media=music
  This would return a JSON object containing information about the search results.

- Helmet middleware: The helmet middleware is used to add some security-related HTTP headers to the response, such as X-Content-Type-Options, X-Frame-Options, and X-XSS-Protection. These headers help to protect the application against common web vulnerabilities.

- Body-parser middleware: The body-parser middleware is used to parse the incoming request body. It helps to prevent attacks such as denial-of-service (DoS) attacks, by limiting the size of the request body.

- CORS middleware: The cors middleware is used to enable Cross-Origin Resource Sharing (CORS) for the API. CORS is a security feature implemented by web browsers that prevents web pages from making requests to a different domain than the one that served the web page. The cors middleware helps to enable cross-domain requests from the client-side application.

- Input validation: The server-side code checks the input parameters of the search API and favorites list management API. For example, when adding a favorite item, the code checks if the item already exists in the favorites list to avoid duplicates.

- Error handling: The code has implemented error handling by wrapping the API logic in a try-catch block. It catches any unexpected errors that may occur during API execution and returns a 500 Internal Server Error response to the client.

- Port configuration: The code uses the process.env.PORT environment variable to listen on a dynamically allocated port, instead of a fixed port number. This is a good security practice because it helps to prevent port scanning attacks.

# Link to the App
http://itunes.producedbysilva.co.za/

Backend hosted on Render: https://itunes-search.onrender.com

Frontend on Vercel: https://i-tunes-search-woad.vercel.app/