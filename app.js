const express = require('express')
require('dotenv').config()
const userRoute = require('./routes/userRoutes')
const doctorRoutes= require('./routes/DoctorRoutes')
const appointmentRoute = require('./routes/appointmentRoute')
const cors = require("cors");

const {testConnection} = require('./config/db')
testConnection()

require("./models")
const app = express()
const port = process.env.PORT || 7000

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use('/api/user', userRoute)
app.use('/api/appointment', appointmentRoute)
app.use("/api/doctor",doctorRoutes)



app.get('/', (req, res) => res.send('Hello mmmmm'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



// {"name":"Admin", "email":"admin@gmail.com","password":"admin", "contactNumber":"9876543210","address":"Pune"}