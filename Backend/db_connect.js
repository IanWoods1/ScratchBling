const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "password123",
//   database: "test_scratch_bling",
//   host: "localhost", 
//   port: 5432
// });

const pool = new Pool({
  user: "postgres",
  password: "6WCgVNUmPESK",
  database: "scratch_bling_rds",
  host: "database-1.ccazdsjz3qrl.us-east-2.rds.amazonaws.com", 
  port: 5432
});

module.exports = pool;