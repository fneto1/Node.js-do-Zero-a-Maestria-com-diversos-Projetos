const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado ao banco de dados toughts');
} catch (error) {
    console.log(`Erro ao tentar conectar ao banco de dados: ${error}`)
}

module.exports = sequelize