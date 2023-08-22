// Importing Built-In Modules
const http = require("http");
const fs = require("fs");

// Setting the Hostname and port of the server
const hostname = "127.0.0.1";
const port = 3200;

// Synchronously reading through the html files
const homePage = fs.readFileSync("main.html");
const aboutPage = fs.readFileSync("about.html");
const menuPage = fs.readFileSync("menu.html");
const contactPage = fs.readFileSync("contact.html");

// Starting the Server
const server = http.createServer((req, res) => {
    // Creates the page if main is requested
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(homePage);
    
    // Creates the page if about is requested
    } else if (req.url === "/about.html") {
        res.statusCode = 200; // Gives the OK status code
        res.setHeader("Content-Type", "text/html"); // Informs that it's html
        res.write(aboutPage); // Adds the about page to the response

    // Creates the page if menu is requested
    } else if (req.url === "/menu.html") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(menuPage); // Adds the menu page to the response

    // Creates the page if the contact page is requested
    } else if (req.url === "/contact.html") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(contactPage); // Adds the contact page to the response

    // Send an image if the URL ends with .jpg
    } else if (req.url.match("\.jpg$")) {
        try {
            res.statusCode = 200; // Sends the OK status code
            res.setHeader("Content-Type", "image/jpg"); // Informs that it's a jpg
            imgLoc = req.url.replace("/", "./"); // modifies the path
            console.log(imgLoc); // logs the modified file path
            image = fs.readFileSync(imgLoc); // Reads the jpg file
            res.end(image); // The image data is sent to the client
        } catch {
            res.statusCode = 404; // Returns not found if the image doesn't exist
            res.write("404"); // Tells the client it wasn't found
            console.log(req.url); // logs the requested url
        }
        
    // If anything else happens, send a not found status code
    } else {
        res.statusCode = 404;
        res.write("404");
        console.log(req.url);
    }
    res.end(); // Ends the response from the server
});

// Starts the server and logs a message that declares it
server.listen(port, hostname, () => {
    console.log("Server is now running");
});
