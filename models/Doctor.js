const {sequelize} = require('../config/db')

const {DataTypes} = require('sequelize')


const Doctor = sequelize.define("Doctor", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specialization: {
      type: DataTypes.STRING
    },
    fees:{
      type:DataTypes.INTEGER,
       allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    status: {
    type: DataTypes.ENUM(
      'Pending',
      'Accepted',
      'Reject'
    ),
     defaultValue: 'Pending'},
     
     updatedBy: {
  type: DataTypes.INTEGER // doctorId
}

  },{
    timestamps:true,
    tableName:"Doctors"
}
);


module.exports = Doctor;
