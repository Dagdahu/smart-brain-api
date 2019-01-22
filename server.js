/// ----
/// Libs
/// ----

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

/// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

/// --------
/// Database
/// --------

/// Connect to database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'hugo',
      password : 'Ubuntugou1',
      database : 'smart-brain'
    }
});

/// ------------
/// App creation
/// ------------

// Create express App
const app = express();
// Makes sure transfered json data are correctly parsed
app.use(bodyParser.json());
app.use(cors());

/// --------------------------
/// Declarations and functions
/// --------------------------

const checkLoggin = (email, password) => {
    for(let i = 0; i < database.users.length; i++) {
        if (database.users[i].email === email &&
            database.users[i].password === password) {
                return database.users[i];
        }
    }
    return false;
};

const getUserById = (id) => {
    for(let i = 0; i < database.users.length; i++) {
        if (database.users[i].id === id) {
            return database.users[i];
        }
    }
    return false;
};

/// ------------
/// API Requests
/// ------------

app.get('/', (req, res) => {
    res.send(database.users);
})
// Sign-in POST request
app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt)
});
/// Register POST request
app.post('/register', 
    // Alternate call, equivalent to : 
    // register.handleRegister(db, bcrypt)(req, res)
    register.handleRegister(db, bcrypt)
);
/// Profile GET request
app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db)
})
/// Imageurl POST request
app.post('/imageurl', (req, res) => {
    image.handleImageUrl(req, res)
})
/// Image PUT request
app.put('/image/:id', (req, res) => {
    image.handleImage(req, res, db)
})

/// -------------------------------------
/// Makes the App listen to the port 3000
/// -------------------------------------

app.listen(3000, () => {
    console.log('App is running on port 3000');
});