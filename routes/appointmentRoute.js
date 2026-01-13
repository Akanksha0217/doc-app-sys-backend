const express= require('express')
const appointmentController = require('../controllers/appointmentController')
const { auth, Doctor,Admin } = require('../middleware/auth')

const router = express.Router()

router.post('/createAppointment',auth, appointmentController.createAppointment)

router.put('/statusUpdateByDoctor/:ID',auth, Doctor, appointmentController.statusUpdateByDoctor)

router.put('/updateAppointment/:ID', auth ,appointmentController.updateAppointment )

router.delete('/deleteAppointment/:id', auth, appointmentController.deleteAppointment)

router.get('/getAppointmentsByUser', auth, appointmentController.getAppointmentsByUser)

router.get('/showAppointmentsOfDoctor', auth ,Doctor, appointmentController.showAppointmentsOfDoctor)

router.get('/getAllAppointment', auth ,Admin, appointmentController.getAllAppointment)   



module.exports = router