const { Sequelize } = require('sequelize'); 
const connection = require('../database/connection'); 
const sequelize = new Sequelize(connection.development);
async function testConnection() {   
try {     
      await sequelize.authenticate();
      console.log('Database connected succefully');
} catch (error) {
      
      console.error('Unable to connect to the database:', error);
   }
}
testConnection();
  
module.exports = sequelize;