import sequelize from "../dbConnection/connection.js"
import {DataTypes} from 'sequelize';
const Record = sequelize.define('records',{
  user_id:{
    type:DataTypes.STRING(255)
  },
  type:{
    type:DataTypes.ENUM,
    values:['credit','debit']
  },
  amount:{
    type:DataTypes.STRING(255)
  },
  date:{
    type:DataTypes.DATEONLY
  },
  comment:{
    type:DataTypes.TEXT,
    allowNull:true
  }
})

export default Record;