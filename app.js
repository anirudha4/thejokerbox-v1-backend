// packages required
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// route imports
const fileRoutes = require('./routes/api/files/fileRoutes')
const authRoutes = require('./routes/api/auth/authRoutes')

// CONSTANTS
const PORT = process.env.PORT || 8000;

// init app
const app = express();

// connect to mongoDB atlas
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log('Connected to mongoDB atlas'))
.catch(err => console.log('Error Connecting: ' + err.messsage));

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// index routes
app.get('/', (req, res) => {
    res.json({
        routes: [
            '/api/files/upload/',
            '/api/files/download/{id/filename}/',
            'api/auth/'
        ]
    });
});

// app routing
app.use('/api/files', fileRoutes)
app.use('/api/auth', authRoutes);

// listen to requests
app.listen(PORT, () => console.log('Server Up and Running on http://localhost:'+PORT));
