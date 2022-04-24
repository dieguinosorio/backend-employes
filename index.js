const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { dbConection } = require('./database/config');

const { PORT_ENV } = process.env

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/employes',require('./routes/employes'))

dbConection()

app.listen(PORT_ENV,()=>{
  console.log(`Aplicación corriendo en el puerto : ${PORT_ENV}`)
})
