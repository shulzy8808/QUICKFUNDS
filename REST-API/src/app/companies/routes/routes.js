const express = require('express')
const router = express.Router()
const tokenHandler = require('../../../config/tokenHandler')
const auth = require('../auth/auth')
const ctr = require('../controllers/controllers')


// ADMIN
router.get('/quick-funds-admin', tokenHandler.verifyAccessToken, (req, res) => {
    return res.json({
        defaultUser: 'default@gmail.com',
        defaultPassword: 'default'
    })
})


// AUTH
router.post('/companies/register', auth.comapanySignUp);
router.post('/companies/login', auth.companyLogin)
router.post('/companies/get-single-company', tokenHandler.verifyAccessToken, auth.getSingleCompany)
router.post('/companies/reset-password', auth.forgotPassword)
router.post('/companies/get-security-info', auth.getSecurityInfo)


// CONTACT
router.post('/users/send-message', ctr.sendUserMessage)


// COMAPNY'S CUSTOMERS
router.post('/companies/add-customer', tokenHandler.verifyAccessToken, ctr.addCustomer)




module.exports = router