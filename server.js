const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const { Pool } = require("pg");
const pool = new Pool({user: 'postgres',
    password: '',
    host: 'localhost',
    database: 'employees_db'
},

)

pool.connect();

console.log('Connected to the employees_db database!')