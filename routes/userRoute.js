const express = require("express");
const router = express.Router();
const { registerUser,login,getUserDetails,deleteUser,updateProfile, logout, getAllUsers, getSingleUser } = require("../controllers/userController")

router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/userDetails").get(getUserDetails)
router.route("/admin/updateProfile").put(updateProfile)
router.route("/admin/getAllUsers").get(getAllUsers)
router.route("/admin/getSingleUser").get(getSingleUser)
router.route("/admin/deleteUser").delete(deleteUser)

module.exports = router
