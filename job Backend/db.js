const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "naman",
    database: "job_portal",
    port: 5432
});

module.exports = pool;