const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Import and require Pool (node-postgres)
const { Pool } = require("pg");

// Connect to database
const pool = new Pool(
  {
    user: 'postgres',
    password: '',
    host: 'localhost',
    database: 'employees_db'
  },
)
pool.connect();

console.log('Connected to the employees_db database!')



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});