const express = require("express");
const router = express.Router();
const { createPackage, findAllPackage, deletePackage, updatePackage } = require("../controllers/packageContorller")

router.route("/createPackage").post(createPackage)
router.route("/deletePackage/:id").delete(deletePackage)
router.route("/updatePackage/:id").put(updatePackage)
router.route("/findAllPackage").get(findAllPackage)


module.exports = router

