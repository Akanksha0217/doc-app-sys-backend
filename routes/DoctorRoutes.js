

const express=require('express')
const router = express.Router()
const DoctorController = require('../controllers/DoctorController')
const {auth} = require('../middleware/auth')


router.get("/createDoctor", auth,DoctorController.createDoctor);
router.get("/DoctorList", auth,DoctorController.getAllDoctors);
router.post("/applyDoctor", auth,DoctorController.applyDoctor);

module.exports = router
