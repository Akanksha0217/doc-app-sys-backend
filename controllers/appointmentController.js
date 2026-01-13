// const Appointment = require("../models/appointmentModel");
// const User = require("../models/userModel");

const { Appointment, User, Doctor } = require("../models");

async function createAppointment(req, res) {
  try {
    const {dateTime, doctorId} = req.body 
     const createdBy = req.user.id
     const newAppoint =  await Appointment.create({dateTime, doctorId,createdBy})
    if(!newAppoint){
    res.status(200).send({ msg: "appointment not created", success:false });
    }
    res.status(200).send({ msg: "appointment created successfully", success:true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

// async function statusUpdateByDoctor(req, res) {
//   const {ID}=req.params
//   console.log("ID:", req.params.ID, typeof req.params.ID);
//   try {
//     const updatedAppointment = await Appointment.update({
//         status:req.body.status,
//         updatedBy:req.user.id
//     },{
//         where:{id:ID}
//     })
//     console.log(updatedAppointment,"updatedAppointment")

//     if(updatedAppointment.length == 0){
//     res.status(200).send({ msg: "appointment not updated", success:false });
//     }
//     res.status(200).send({ msg: "appointments status updated successfully",success:true });
//   } catch (error) {
//     res.status(500).send({ msg: "Server Error" });
//   }
// }


async function statusUpdateByDoctor(req, res) {
  const { ID } = req.params
  const { status } = req.body

  // validate status
  const allowedStatus = ['Pending', 'Accepted', 'Reject']
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' })
  }

  try {
    const [updatedRows] = await Appointment.update(
      {
        status,
        updatedBy: req.user.id
      },
      {
        where: { id: ID }
      }
    )

    if (updatedRows === 0) {
      return res.status(404).json({
        msg: 'Appointment not found or not updated',
        success: false
      })
    }

    res.status(200).json({
      msg: 'Appointment status updated successfully',
      success: true
    })
    console.log("BODY:", req.body);
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error' })
  }
}














async function updateAppointment (req, res) {
  // dateTime, doctorId,createdBy 
  try{
       const  ID  = req.params.ID   
        console.log("ID:", req.params.ID, typeof req.params.ID);
        const { dateTime, doctorId} = req.body
        console.log(req.body)

       const [updateAppoint] = await Appointment.update({dateTime,doctorId},{where:{id:ID}})
   
    if (updateAppoint === 0) {
      return res.status(404).send({msg: "Appointment not found", success: false})}

    //  Update appointment
    
    return res.status(200).send({msg: "Appointment updated successfully",success: true,})

  }catch(error){
    return res.status(404).send({msg:"server error", error: error.message})
  }
}

async function deleteAppointment(req, res) {
  try {
    const  id  =Number(req.params.id)

     console.log("ID:", req.params.id, typeof req.params.id);
    const appointment = await Appointment.findByPk(id,{
       paranoid: false,
    })
    console.log(appointment)
    console.log("ID:", req.params.id, typeof req.params.id);
    console.log("Paranoid:", Appointment.options.paranoid);


    if (!appointment) {return res.status(404).send({msg: "Appointment not found",success: false})}

    await appointment.destroy()
    
    return res.status(200).send({ msg: "Appointment deleted successfully", success: true})

  } catch (error) {
    return res.status(500).send({msg: "Server Error",error: error.message})
  }
}


async function getAppointmentsByUser(req, res) {
  try {
    console.log("Appointment Associations:", Appointment.associations);
    const appointments = await Appointment.findAll({
      where: { createdBy: req.user.id },
      include: [
        {
          model: Doctor,
          as: "doctor", 
          attributes: ["id", "name", "email","specialization"],
        },
      ],
    });
    return res.status(200).send({success:true,appointments});
    // if (!appointments.length) {
    //   return res.status(400).send({ msg: "No appointments yet" });
    // }
    // res.status(200).send({ success: true, appointments });
  } catch (error) {
    console.error("Appointment error:", error);
    res.status(500).send({
      msg: "Server Error",
      error: error.message,
    }
  );
  }
}

async function showAppointmentsOfDoctor(req, res) {
  try {
    const appointments = await Appointment.findAll({
      where: { doctorId: req.user.id },
      include: [
        { model: User, as: "patient", attributes: ["id", "name", "email"] }
      ]
    });

    if (appointments.length === 0) {
      return res.status(400).send({ msg: "No appointments yet" });
    }

    res.status(200).send({ appointments, success: true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error", error: error.message });
  }
}

async function getAllAppointment(re,res) {
  try {
     const appointments = await Appointment.findAll({

     })
      if (appointments.length === 0) {
      return res.status(400).send({ msg: "No appointments yet" });
    }

    res.status(200).send({ appointments, success: true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error", error: error.message });
  
  }
  
}

module.exports={createAppointment,statusUpdateByDoctor,updateAppointment,deleteAppointment,getAppointmentsByUser,showAppointmentsOfDoctor,getAllAppointment}
