const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('js'));

app.get("/salut", (req, res) => {
    res.send("SALUT");
});

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/signin', (req, res) => {
    res.render('signin');
});

mongoose.connect(('mongodb://localhost:27017/pwhomeworkDB'), {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("Connected successfully");

    const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: [true, "User must have a first name."]
        },
        lastName: {
            type: String,
            required: [true, "User must have a last name."]
        },
        username: {
            type: String,
            required: [true, "User must have an username."]
        },
        email: {
            type: String,
            required: [true, "User must have an email."]
        },
        password: {
            type: String,
            required: [true, "User must have a password."]
        }
    });

    const productSchema = new mongoose.Schema({
        name: {
            type: String,
            require: [true, "Product must have a name"]
        },
        price: {
            type: Number,
            required: [true, "Product must have a price."]
        },
        imageSrc: {
            type: String,
            required: [true, "Product must have an image"]
        },
        category: {
            type: String,
            required: [true, "Product must have a category"]
        }
    });

    const User = mongoose.model('User', userSchema);
    const Product = mongoose.model('Product', productSchema);

    app.post('/signup', (req, res) => {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        newUser.save((err, user) => {
            if(err) {
                console.err(err);
            } else {
                console.log(`${newUser.username} successfully added to the users collection.`);
            }
        });
        
        res.redirect('/signin');
    });


    app.post('/signin', (req, res) => {
        const searchedUser = req.body;
        console.log(searchedUser);
        User.findOne({
            username: searchedUser.username
        }, (err, foundUser) => {
            if(err) {
                console.log("Error! Can't find the user.");
            } else {
                if(foundUser !== null) {
                    if(foundUser.password === searchedUser.password) {
                        console.log(`Logged in: ${foundUser.username}.`);
                    } else {
                        console.log("User gasit, parola gresita.");
                    }
                } else {
                    console.log('User not found');
                }
            }
        });
        
    });

    app.get('/products', (req, res) => {
        const newProduct = new Product({
            name: 'Grand Theft Auto V',
            price: 60,
            imageSrc: 'imagineGTA',
            category: 'action'
        });

        newProduct.save();
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000.")
});