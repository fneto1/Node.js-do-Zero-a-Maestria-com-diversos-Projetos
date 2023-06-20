const {DataTypes} = require('sequelize') //objeto que retorna os tipos de dados

const db = require('../db/conn') //conexão com o banco de dados

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation: {
        type: DataTypes.STRING,
        required: true
    },
    newsletter: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = User