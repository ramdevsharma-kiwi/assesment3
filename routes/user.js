const express = require("express")
const router = express.Router();

const userController = require('../controllers/user-controller')

router.post("/register",userController.register);
router.post("/login",userController.login);
router.patch("/subscribe-train",userController.subscribeTrain)
router.get("/train-info",userController.trainInfo);

module.exports = router;
