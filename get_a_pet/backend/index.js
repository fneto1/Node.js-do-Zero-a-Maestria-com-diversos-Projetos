const express = require('express')
const cors = require('cors')

const app = express()

//config JSON response
app.use(express.json())

//Solve CORS
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

//Assets
app.use(express.static('public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)



app.listen(5000, () => {
    console.log("Aplicação rodando");
})