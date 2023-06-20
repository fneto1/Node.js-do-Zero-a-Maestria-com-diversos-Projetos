const {Sequelize} = require("sequelize")

const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

/* try {

    sequelize.authenticate()
    console.log("Conectamos com sucesso utilizando o sequelize");
    
} catch (error) {
    console.log("Não foi possivel conectar ao banco de dados: ", error);
} */

module.exports = sequelize