const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const users = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('js'));

app.get("/salut", (req, res) => {
    res.send("SALUT");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/landing.html");
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/signup', (req, res) => {
    users.push(req.body);
    console.log(users);
    res.redirect('/signin');
});

app.get('/signin', (req, res) => {
    res.sendFile(__dirname + "/signin.html");
});

app.post('/signin', (req, res) => {
    console.log(users);
    const searchedUser = req.body;
    console.log(searchedUser);
    if(users[0].username == searchedUser.username) {
        console.log("USERNAME GASIT:" + searchedUser.username);
        if(users[0].password == searchedUser.password) {
            console.log("PAROLA CORECTA:" + searchedUser.password);
        }
    }
    res.send(`Hello, ${searchedUser.username}`)
});


app.listen(3000, () => {
    console.log("Server running on port 3000.")
});