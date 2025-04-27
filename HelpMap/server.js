const app = require('./app');
const dotenv = require('dotenv');
dotenv.config( { path : './config.env'});

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000; // Change 8080 to 3000 or another available port


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);



mongoose.connect(DB).then( () => {
    console.log('DB Connection Successfully 👍')
})



app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
})


