const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
const path = require('path')

require('dotenv').config()

const PORT = process.env.PORT || 3000

//middlewares
app.use(express.json())

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// Serves static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server();