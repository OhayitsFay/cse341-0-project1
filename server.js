const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
//app.use((req, res) => {res.setHeader('Access-Control-Allow-Origin', '*');});
app.use('/', require('./routes'));
//app.use(express.json()); // Middleware to parse JSON
//app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running on port ${port}`);
        }); // Server is running on port 3000
    }
});