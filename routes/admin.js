const express = require("express")
const router = express.Router();

const auth = require("../middleware/auth")
const adminController = require('../controllers/admin-controller')

router.post("/login", adminController.login);
router.post("/create-subadmin", auth.authorization, auth.isAdmin, adminController.createSubAdmin);
router.delete("/delete-subadmin/:id", auth.authorization, auth.isAdmin ,adminController.deleteSubAdmin)
router.patch("/permission/:id", auth.authorization, auth.isAdmin ,adminController.giveRights)


module.exports = router;
