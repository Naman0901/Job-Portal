const express = require("express");
const router = express.Router();
const adminControl = require('../controllers/adminControllers');
router.use(express.json());

router.post("/newjob",adminControl.addjob);
router.get("/jobs",adminControl.getjobs);
router.get("/applier/:id",adminControl.getappliers);
router.put("/job/:id",adminControl.updjob);
router.get("/job/:id",adminControl.getjob);
router.delete("/job/:id",adminControl.deljob);

module.exports = router;
