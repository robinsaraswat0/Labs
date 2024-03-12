const express = require("express");
const router = express.Router();
const { createSample, deleteSample, updateSample, findAllSample, findUserSample } = require("../controllers/sampleController")

router.route("/createSample").post(createSample)
router.route("/deleteSample/:id").delete(deleteSample)
router.route("/updateSample/:id").put(updateSample)
router.route("/findAllSample").get(findAllSample)
router.route("/findUserSample").get(findUserSample)


module.exports = router

