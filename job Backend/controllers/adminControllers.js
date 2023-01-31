const pool = require('../db');

exports.addjob = async (req,res)=>{
    const {name, post, tech, vacancy, description} = req.body;
    const job = await pool.query("insert into vacancy(name,post,tech,vacancy,description,Posted_on) values ($1,$2,$3,$4,$5,$6) returning *",[name,post,tech,vacancy,description,new Date().toDateString()]);
    res.json(job.rows[0]);
}

exports.getjobs = async(req,res)=>{
    const jobs = await pool.query("select * from vacancy order by posted_on desc");
    res.json(jobs.rows);
}

exports.getappliers = async(req,res)=>{
    const applier = await pool.query("select * from application where job_id = $1",[req.params.id]);
    res.json(applier.rows);
}

exports.getjob = async(req,res)=>{
    const job = await pool.query("select * from vacancy where id = $1",[req.params.id]);
    res.json(job.rows[0]);
}

exports.updjob = async (req,res)=>{
    const {name, post, tech, vacancy, description} = req.body;
    const updquestion = await pool.query("update vacancy set name = $1, post = $2, tech = $3, vacancy = $4, description = $5 where id = ($6)", [name, post, tech, vacancy, description, req.params.id]);
    res.json("Job Updated");
}

exports.deljob = async(req,res)=>{
    const job = await pool.query("delete from vacancy where id = $1",[req.params.id]);
    res.json("job deleted");
}
