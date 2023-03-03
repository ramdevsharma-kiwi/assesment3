const express = require("express")
const router = express.Router();


const adminController = require('../controllers/admin-controller')

router.post("/login",adminController.login);
router.post("/create-subadmin",adminController.createSubAdmin);
router.delete("/delete-subadmin",adminController.deleteSubAdmin)
router.patch("/permission",adminController.giveRights)


module.exports = router;
