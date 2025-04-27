// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const userRouter = require('./Routes/UserRoutes')

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const limiter = rateLimit({
    WindowMs : 15 * 60 * 1000,
    limit : 10,
    message : 'To many Request from this IP , Please try again in an hour'
})

app.use('/api', limiter);

app.use('/api/v1/user', userRouter)


// Sample route
app.get('/', (req, res) => {
    res.send('Hello from the server side 👋, hey Developer');
});


// Export the app
module.exports = app;
