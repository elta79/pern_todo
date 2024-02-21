//TODO: use env variable to stor db credentials
//TODO: config ssl
require('dotenv').config();


//configure how to connect to database
//pg is library
const Pool = require("pg").Pool


//instance of pool
const pool = new Pool({
    user: process.env.VITE_USER,
    password: process.env.VITE_PASSWORD,
    host: process.env.VITE_HOST,
    port: process.env.VITE_PORT,
    database: process.env.VITE_DATABASE,    
    // ssl: {
    //     rejectUnauthorized: false,  //to deploy in production, config ssl for secure connection
    // },
    
})



module.exports = pool