const multer = require('multer')
const path = require('path')

//Destination to store the images
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){

        let folder = ""
        //verificando se é foto de usuário ou pet para escolha da pasta
        if(req.baseUrl.includes("users")){
            folder = "users"
        } else if(req.baseUrl.includes("pets")){
            folder = "pets"
        }

        //função de callback que indica o caminho para a pasta da foto
        cb(null, `public/images/${folder}`)
    },
    //determinando o nome do arquivo
    filename: function(req, file, cb){
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    }
})

//função que faz o upload da foto
const imageUpload = multer({
    //local onde a foto ficará armazenada (função anterior)
    storage: imageStorage,
    //filtrando apenas imagens que sejam png ou jpg
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error('Por favor, envie apenas jpg ou png.'))
        }
        //aqui é feito o upload da foto
        cb(undefined, true)
    }
})

module.exports = {imageUpload}