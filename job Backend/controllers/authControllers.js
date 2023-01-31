const pool = require('../db');

exports.user = async (req,res)=>{
    const {username, password} = req.body;
    var user = await pool.query("select * from users where username = $1 and password = $2", [username,password]);
    res.json(user.rows);
};