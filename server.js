const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser'); // To parse POST request data
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true })); // Enable parsing of POST request data
app.use(bodyParser.json());
app.use(cors());

app.post('/signin', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the MongoDB collection
        const savedUser = await newUser.save();

        res.status(201).json(savedUser); // You can send a response or redirect to a different page
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Set up static files (like CSS or images)
app.use(express.static(path.join(__dirname, 'public')));

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to use
app.set('view engine', 'html');

// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/full-stack')
    .then(() => console.log("mongodb connected"))
    .catch((error) => console.log("mongodb error"));

// Create a simple User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Create a farmer schema
const farmerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    pin: { type: String, required: true },
    soil_type: { type: String, required: true },
    water_source: { type: String, required: true },
    crop: { type: String, required: true },
    crop: { type: String, required: true },
});

// Create Selling Schema
const sellerSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    // lastName: document.getElementById('lastName').value,
    email: { type: String, required: true },
    // phone: { type: String, required: true },
    city: { type: String, required: true },
    product_type: { type: String, required: true },
    product_name: { type: String, required: true },
    quantity: { type: String, required: true },
    set_price: { type: String, required: true },
    //description: document.getElementById('city').value,
    Nationality: { type: String, required: true },
    //address: document.getElementById('address').value,
    state: { type: String, required: true },
    district: { type: String, required: true },
    pins: { type: String, required: true },
})
// Define a Mongoose schema for the user data
// const BuyerSchema = new mongoose.Schema({
//     username: String,
//     phone: String,
//     address: String,
//     instructions: String
// });

// const Buyer = mongoose.model('User', BuyerSchema);

const User = mongoose.model('User', userSchema);

// Create a Mongoose model based on the schema
const Farmer = mongoose.model('Farmer', farmerSchema);

const Seller = mongoose.model('Seller', sellerSchema);

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'main.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/help', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'help.html'));
});

app.get('/articles', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'articles.html'));
});

app.get('/buyproducts', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'products.html'));
});

app.get('/buynow', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'buynow.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sign_in.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/sell', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sell.html'));
});

app.get('/cropcalender', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cropcalender.html'));
});

// Define a route to handle form submission
// app.post('/buynow', (req, res) => {
//     const userData = new User({
//         username: req.body.username,
//         phone: req.body.phone,
//         address: req.body.address,
//         instructions: req.body.instructions
//     });

//     userData.save()
//         .then(() => {
//             res.send('Data saved successfully!');
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).send('Error saving data');
//         });
// });


app.post('/signin', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the MongoDB collection
        const savedUser = await newUser.save();

        res.status(201).json(savedUser); // You can send a response or redirect to a different page
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define a route for farmer registration
app.post('/register', async (req, res) => {
    try {
        const newFarmer = new Farmer(req.body);
        const result = await newFarmer.save();
        console.log('Registration successful:', result);
        res.status(201).json({ message: 'Registration successful', insertedId: result._id });
    } catch (error) {
        console.error('Error registering farmer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define a route for Seller registration
app.post('/sell', async (req, res) => {
    try {
        const newSeller = new Seller(req.body);
        const result = await newSeller.save();
        console.log('Registration successful:', result);
        res.status(201).json({ message: 'Registration successful', insertedId: result._id });
    } catch (error) {
        console.error('Error registering farmer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
