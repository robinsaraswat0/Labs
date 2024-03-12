const express = require("express");
const router = express.Router();
const { registerUser,login,getUserDetails,deleteUser,addUser,updateProfile, logout, getAllUsers, getSingleUser } = require("../controllers/userController")

router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/userDetails").post(getUserDetails)
router.route("/admin/addUser").post(addUser)
router.route("/admin/updateProfile").put(updateProfile)
router.route("/admin/getAllUsers").get(getAllUsers)
router.route("/admin/getSingleUser").get(getSingleUser)
router.route("/admin/deleteUser").post(deleteUser)

module.exports = router
