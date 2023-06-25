//import model
const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')

module.exports = class UserController {

    static async register(req, res) {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword
        const phone = req.body.phone

        //ou
        //{name, email, phone, password, confirmpassword} = req.body

        //validations
        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório" })
            return
        }
        if (!email) {
            res.status(422).json({ message: "O e-mail é obrigatório" })
            return
        }
        if (!phone) {
            res.status(422).json({ message: "O telefone é obrigatório" })
            return
        }
        if (!password) {
            res.status(422).json({ message: "A senha é obrigatória" })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: "A confirmação da senha é obrigatória" })
            return
        }
        if (password !== confirmpassword) {
            res.status(422).json({ message: "As senhas não conferem" })
            return
        }

        //check if user exists
        const userExists = await User.findOne({email: email})

        if(userExists){
            res.status(422).json({ message: "E-mail já cadastrado, por favor utilize outro" })
            return
        }
        
        // create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })


        try {

            const newUser = await user.save()

            await createUserToken(newUser, req, res)

        } catch (error) {
            res.status(500).json({message: error})
        }
        
    }

    static async login(req, res){
        const {email, password} = req.body

        if (!email) {
            res.status(422).json({ message: "O e-mail é obrigatório" })
            return
        }

        if (!password) {
            res.status(422).json({ message: "A senha é obrigatória" })
            return
        }

        //check if user exists
        const user = await User.findOne({email: email})

        if(!user){
            res.status(422).json({ message: "O usuário não existe" })
            return
        }

        //check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({ message: "Senha inválida" })
            return
        }

        //login
        await createUserToken(user, req, res)
    }

    static async checkUser(req, res){

        let currentUser

        console.log(req.headers);
        console.log(req.headers.authorization);

        if(req.headers.authorization){

            //extrair o token do header
            const token = getToken(req)

            //decodificar, verificar o token e recuperar as informações passadas no metodo jwt.sign do helper create-user-token
            const decoded = jwt.verify(token, 'nossosecret')

            //o decoded retorna um objeto com os dados passados para gerar o token
            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }
}