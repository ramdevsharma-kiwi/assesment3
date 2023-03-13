const express = require("express")
const router = express.Router();
const auth = require("../middleware/auth")
const userController = require('../controllers/user-controller')

router.post("/register",userController.register);
router.post("/login",userController.login);
router.patch("/subscribe-train/:train_id",auth.authorization, auth.isUser, userController.subscribeTrain)
router.get("/train-info",auth.authorization, auth.isUser ,userController.trainInfo);

module.exports = router;
