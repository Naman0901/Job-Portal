const express = require("express");
const router = express.Router();
router.use(express.json());
const authcontrol = require('../controllers/authControllers');

router.post('/',authcontrol.user)

module.exports = router;
