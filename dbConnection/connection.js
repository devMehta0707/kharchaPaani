import { Sequelize } from "sequelize";
const sequelize = new Sequelize('kharcha_paani', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: true
  }
})
try {
  sequelize.authenticate().then(async()=>{
    sequelize.sync({alter:true}).then(async()=>{
      console.log('Connected To DataBase')
    }).catch((error)=>{
      console.log('sync table error: ', error);
    })
  })
} catch (error) {
  console.log('error: ', error);
}

export default sequelize;