const express = require("express");
const router = express.Router();

const { getHeaders } = require("../controllers/auth");

router.get("/headers", getHeaders);

module.exports = router;
