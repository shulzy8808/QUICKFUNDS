const express = require('express')
const cors = require('cors')
const endpoints = require('./src/app/endpoints/endpoints')
require('dotenv').config();
const { secureDbConn, insecureDbConn } = require('./src/config/database')

const app = express()
const PORT = 3001

// "http://quick___funds.com"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: '*'
}))

app.use((req, res, next) => {
    req.db = secureDbConn
    // await insecureDbConn.connect()
    req.insecure_db = insecureDbConn
    next()
});

app.use('/api/v1', endpoints.companies)

app.listen(PORT, () => {
    // console.log("Server Running")
    // console.log("Listening on port " + PORT)
})




