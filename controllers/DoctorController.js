const Doctor = require("../models/Doctor"); // Sequelize model

// 👉 Create Doctor 
const createDoctor = async (req, res) => {
  try {
    const { name, email, specialization } = req.body;

    const existingDoctor = await Doctor.findOne({
      where: { email }
    });

    if (existingDoctor) {
      return res.status(200).send({
        success: false,
        msg: "Doctor already exists"
      });
    }

    const doctor = await Doctor.create({
      name,
      email,
      specialization
    });

    res.status(201).send({
      success: true,
      msg: "Doctor created successfully",
      doctor
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server Error" });
  }
};


//
const applyDoctor = async (req, res) => {
  try {
    const { specialization, fees } = req.body;
    const createdBy = req.user.id;

    console.log(req.body, createdBy, "********");

    // Create new doctor application
    const newDoc = await Doctor.create({
      specialization,
      fees,
      createdBy,
      status: "Pending", 
    });

    console.log(newDoc, "New Doctor Created");

    if (newDoc) {
      return res.status(200).send({
        msg: "Doctor applied successfully",
        success: true,
      });
    } else {
      return res.status(400).send({
        msg: "Doctor application failed",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      msg: "Server Error",
      success: false,
    });
  }
};


// 👉 Get All Doctors (USED FOR APPOINTMENT DROPDOWN)
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      attributes: ["id", "name", "specialization","email"]
    });

    res.status(200).json({
      success: true,
      doctors
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server Error"
    });
  }
};

module.exports = {
  createDoctor,
  applyDoctor,
  getAllDoctors
};
