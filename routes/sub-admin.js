const express = require("express")
const router = express.Router();

const subAdminController = require('../controllers/sub-admin-contoller')

router.post("/login",subAdminController.login);
router.post("/create-train",subAdminController.createTrain);
router.get("/train-info",subAdminController.trainInfo);
router.delete("/delete-train",subAdminController.deleteTrain)
router.patch("/update-train-status",subAdminController.updateTrainStatus)

module.exports = router;
