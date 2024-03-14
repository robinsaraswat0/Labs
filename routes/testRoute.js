const express = require("express");
const router = express.Router();
const { deleteTest, createTest, updateTest, findAllTest } = require("../controllers/testController")

// router.route("/createTest").post(createTest)
router.route("/deleteTest/:id").delete(deleteTest)
router.route("/updateTest/:id").put(updateTest)
router.route("/findAllTest").get(findAllTest)


module.exports = router

