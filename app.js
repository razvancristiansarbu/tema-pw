const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.static('images'));

app.get("/salut", (req, res) => {
    res.send("SALUT");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/landing.html");
});

app.get('/signin', (req, res) => {
    res.sendFile(__dirname + "/signin.html");
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, () => {
    console.log("Server running on port 3000.")
});