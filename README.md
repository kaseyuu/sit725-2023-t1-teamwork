## sit725-2023-t1-teamwork
This is the repository for our group project- ReWearIt.

## Installation
To run this application locally, follow these steps:

- Clone the repository: git clone https://github.com/kaseyuu/sit725-2023-t1-teamwork.git
- Navigate to the project directory: cd repository
- Install dependencies: npm install
- Start the development server: npm start
- Open the application in your web browser at http://127.0.0.1:3000/

Note: Make sure you have Node.js and npm (Node Package Manager) installed on your system.


## Kasey's part
# Search box and filters function
Search box function and filters function were implemented through three steps: UI to URL, URL to UI, and URL to backend. 

The top search box conducts blur search, which is case-insensitive search The filters include normal filters and price range filter. The normal filters conduct exact search, and the price filters conduct range search. This is an advanced reading operation of CRUD.

Handlebars template engine is used to dynamically populate clothes items from MongoDB database to search result page. 
# Inline search function
Using the Autocomplete library to initialize an autocomplete feature on the search box input field. When users type in letters in input field, they can query the database through newly created endpoint called search-prompt.

The inline search box contains popular strings, which utilized CRUD. On the backend, endpoints for adding/deleting/researching popular strings are created, which enabled administrators to send HTTP requests through POSTMAN to add or delete popular strings. Users can type letters to search for popular strings such as "tshirt". 
# Banner function
If the user didn't do anything on this page for 10 seconds, the banner will show. This function is realized through Socket.
# MVC Structure
Following the MVC model,  I have separated javascript files for model, controller, route and view.


## Mansheen's part
# Dashboard Features
- Dynamic Photowall: The application creates divs for the photowall dynamically, allowing users to view various photos.
- Axios HTTP Request: Axios is used for making HTTP requests to retrieve and send data to the server or API.
- CRUD Operations: The application supports Create, Read, Update, and Delete operations for managing the photowall content.
- Refreshing Home Page and Logo: The home page and logo can be refreshed to update the content and appearance.
- On-Click Scroll for Navbar: Users can click on categories, about us, and contact us in the navbar to scroll to the respective sections on the page.
- Redirecting to Various Pages: The application allows redirection to different pages, enabling seamless navigation and exploration.
- Logout Dropdown Menu: A dropdown menu is implemented for the logout functionality, providing a convenient way for users to sign out. The dropdown is closed automatically if the user clicks outside of it.
- Social Media Handles: The application includes links to handles on Instagram, Facebook, and YouTube, redirecting users to the respective platforms.
- Scrolling from Footer: Users can scroll down from the footer section, providing a smooth browsing experience.
- Feature Video on Focus: The official video starts playing when it comes in focus, offering an interactive element to engage users.

# Technologies Used
- HTML
- CSS
- JavaScript
- Axios
- MongoDB

