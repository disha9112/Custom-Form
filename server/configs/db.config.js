const { Client } = require("pg");

const db = new Client({ connectionString: process.env.DB_URL, ssl: true });

module.exports = db;
