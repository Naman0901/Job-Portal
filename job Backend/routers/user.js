const express = require("express");
const router = express.Router();
const userControl = require('../controllers/userControllers');
router.use(express.json());

router.post("/apply",userControl.putdetails);
module.exports = router;
