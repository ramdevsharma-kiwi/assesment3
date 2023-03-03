const express = require("express")
const router = express.Router();

const userRoutes = require('./user')
const adminRoutes = require('./admin')
const subAdminRoutes = require('./sub-admin')

router.use('/api/user',userRoutes)
router.use('/api/admin',adminRoutes)
router.use('/api/sub-admin',subAdminRoutes)

module.exports = router;
