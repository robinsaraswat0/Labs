const express = require("express");
const router = express.Router();
const { createSample, deleteSample, updateSample, findAllSample } = require("../controllers/sampleController")

router.route("/createSample").post(createSample)
router.route("/deleteSample/:id").delete(deleteSample)
router.route("/updateSample/:id").put(updateSample)
router.route("/findAllSample").get(findAllSample)


module.exports = router

