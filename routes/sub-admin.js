const express = require("express")
const router = express.Router();
const auth = require("../middleware/auth")

const subAdminController = require('../controllers/sub-admin-contoller')

router.post("/login",subAdminController.login);
router.post("/create-train",auth.authorization, auth.isSubAdmin, subAdminController.createTrain);
router.get("/train-info/:id",auth.authorization, auth.isSubAdmin, subAdminController.trainInfo);
router.delete("/delete-train/:id",auth.authorization, auth.isSubAdmin, subAdminController.deleteTrain)
router.patch("/update-train-status/:id",auth.authorization, auth.isSubAdmin, subAdminController.updateTrainStatus)

module.exports = router;
