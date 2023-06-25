const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

//middleware to validate a token
const checkToken = (req, res, next) => {

    //console.log(req.headers);
    //console.log(req.user);

    //caso não tenha o authorization na header da requisição
    if(!req.headers.authorization){
        res.status(401).json({message: "Acesso negado"})
    }

    //Extraindo o token de req.headers.authorization
    const token = getToken(req)

    //Verificação caso não tenha token
    if(!token){
        res.status(401).json({message: "Acesso negado"})
    }

    //Verificação do token, caso o token seja válido o next() irá dar prosseguimento ao caminho da rota para o controller
    try {
        const verified = jwt.verify(token, 'nossosecret')
        //o verified retorna um objeto com os dados do usuário (nome, id)
        req.user = verified
        //console.log(req.user);
        next()        
    } catch (error) {
        res.status(401).json({message: "Token inválido"})
    }

}

module.exports = checkToken