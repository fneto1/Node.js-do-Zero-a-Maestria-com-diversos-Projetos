const getToken = (req) => {
    //recuperar o header autorization da requisição
    const authHeader = req.headers.authorization

    //separar o header authorization e recuperar o segundo índice do array
    const token = authHeader.split(" ")[1]

    return token
}

module.exports = getToken