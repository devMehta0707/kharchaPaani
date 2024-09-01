import sequelize from "../dbConnection/connection.js"
import {DataTypes} from 'sequelize';
const User = sequelize.define('users',{
  user_name:{
    type:DataTypes.STRING(255)
  },
  password:{
    type:DataTypes.STRING(255)
  }
})

export default User;