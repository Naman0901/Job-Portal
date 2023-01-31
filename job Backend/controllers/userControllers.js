const pool = require('../db');

exports.putdetails = async (req, res) => {
    const { name, college, edu, email, mobile, date_of_birth, experience, job_id, user_id } = req.body;
    const apply = await pool.query("insert into application(name,college ,education, email, mobile, date_of_birth, experience, job_id, user_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [name, college, edu, email, mobile, date_of_birth, experience, job_id, user_id]);
    res.json("Application Sended");
}
