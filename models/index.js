const User = require("./userModel");
const Doctor = require("./Doctor");
const Appointment = require("./appointmentModel");
require("../models");


// Patient
User.hasMany(Appointment, { foreignKey: "createdBy" });
Appointment.belongsTo(User, { foreignKey: "createdBy", as: "patient" });

// Doctor
Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });

// Updated By
Appointment.belongsTo(User, { foreignKey: "updatedBy", as: "updatedByUser" });

module.exports = {
  User,
  Appointment,
  Doctor
};
