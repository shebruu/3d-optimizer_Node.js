const express = require("express");
const router = express.Router();
const anomalyController = require("../controller/anomaly.controller");

router.post("/", anomalyController.detect);

module.exports = router;
