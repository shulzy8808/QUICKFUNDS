const { generateAccessToken } = require("../../../config/tokenHandler")
const { hashText, compareHashWithText } = require("../../globals/globals")
const { getByIdentifier, insertData, getAll, updateData } = require("../../models/models")


exports.fetchInitialData = async ({ db, company_id, siteSecured }) => {
    try {

        const initialData = {}

        const customers = 
            siteSecured
            ?
                await getByIdentifier({ db, tableName: 'company_customers', whereClause: { company_id } })
            :
                await getAll({ db, tableName: 'company_customers' })

        if(!customers.data){
            throw new Error()
        }

        initialData.customers = customers.data

        return {
            data: initialData,
            error: null
        }
        
    } catch (error) {
        return {
            data: null,
            error: {
                reason: 'Something went wrong',
                actualError: error
            }
        }
    }
}


exports.comapanySignUp = async (req, res) => {
    try {
        
        const { db, insecure_db } = req

        db.transaction(async trx => {
            try {
                
                const { email, password, company_name, siteSecured, security_question, answer } = req.body

                if(!email || !password || !company_name){
                    return res.status(400).json({ error: 'Incomplete credentials provided', err: '' })
                }

                const checkEmail = await getByIdentifier({ db: trx, tableName: 'companies', whereClause: { company_email: email } })

                if(checkEmail.data){
                    if(checkEmail.data.length > 0){
                        return res.status(400).json({ error: 'Email already in use', err: '' })
                    }

                    const hashPassword = await hashText({ text: password })
                    const hashEmail = await hashText({ text: email })

                    if(hashPassword.hash && hashEmail.hash){

                        if(!siteSecured){
                            const query = `INSERT INTO companies (company_identifier, company_email, password, security_question, answer) VALUES ('${ hashEmail.hash}', '${email}', '${password}' , '${security_question ? security_question : 'Initial value is called?'}',  '${ answer ? answer : 'default'}')`
                            console.log(query)
                            const query2 = `INSERT INTO company_profiles (company_id, company_name) VALUES ('${hashEmail.hash}', '${company_name}')`

                            await insecure_db.query(query)
                            await insecure_db.query(query2)

                            return res.json({ message: 'Successfully registered company' })
                        }

                        const companiesColumnValues = {
                            company_email: email,
                            password_hash: hashPassword.hash,
                            password,
                            company_identifier: hashEmail.hash,
                            security_question: security_question || 'Initial value is called?',
                            answer: answer || 'Default'
                        }

                        const companyProfilesColumnValues = {
                            company_name,
                            company_id: hashEmail.hash
                        }

                        const newCompany = await insertData({ db: trx, tableName: 'companies', columnValues: companiesColumnValues })
                        const newCompanyProfile = await insertData({ db: trx, tableName: 'company_profiles', columnValues: companyProfilesColumnValues })

                        if(newCompany.data && newCompanyProfile.data){
                            return res.json({ message: 'Successfully registered company' })
                        }
                        
                    }
                }

                

                throw new Error('Failed to find email in the companies table.');

            } catch (error) {
                console.log(error)
                return res.status(400).json({ error: 'Unexpected error', err: error })                
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: 'Unexpected error', err: error })
    }
}


exports.companyLogin = async (req, res) => {
    try {

        const { db, insecure_db } = req

        const { siteSecured, email, password } = req.body

        if(!siteSecured){ 

            let query;

            if(email == 'default'){
                query = "SELECT * FROM companies LEFT JOIN company_profiles ON companies.company_identifier = company_profiles.company_id"    
            
            } else{
                query = "SELECT * FROM companies LEFT JOIN company_profiles ON companies.company_identifier = company_profiles.company_id WHERE companies.company_email='" + email + "'"
            }            

            const company = await insecure_db.query(query)

            const firstCompany = company.rows
            
            if(firstCompany[0]){
                const otherData = await this.fetchInitialData({ db, siteSecured })

                if(otherData.data){
                    return res.json({
                        message: 'Company login successful',
                        data: {
                            companyDetails: { ...firstCompany[0] },
                            ...otherData.data,
                        }
                    })
                }
            }  
            
            throw new Error()
        }       

        return await db.transaction(async trx => {
            try {

                const { email, password } = req.body

                if(!email || !password){
                    return res.status(400).json({ error: 'Incomplete credentials provided', err: '' })
                }

                const company = await trx.select('*').from('companies')
                    .leftJoin('company_profiles', 'companies.company_identifier', 'company_profiles.company_id')
                    .where({ company_email: email })

                if(company){
                    if(!company[0]){
                        return res.status(400).json({ error: 'Email not registered on our platform'})
                    }

                    const { password_hash, company_id } = company[0]

                    //validate password
                    const passwordCheck = await compareHashWithText({ hash: password_hash, text: password })

                    if(passwordCheck.data.isSame){
                        delete company[0].password
                        delete company[0].password_hash

                        const otherData = await this.fetchInitialData({ db: trx, company_id })

                        if(otherData.data){
                            return res.json({ 
                                message: 'Company login successful',
                                data: {
                                    companyDetails: { ...company[0] },
                                    ...otherData.data,
                                    accessToken: generateAccessToken({ userEmail: email })
                                }
                            })
                        }

                    } else{
                        return res.status(400).json({ error: 'Incorrect password', err: '' })
                    }
                }


                
                throw new Error()
                
            } catch (error) {
                return res.status(400).json({ error: 'Unexpected error', err: error })                
            }
        })
        
    } catch (error) {
        return res.status(400).json({ error: 'Unexpected error', err: error })
    }
}


exports.getSingleCompany = async (req, res) => {
    try {

        const { db } = req

        return await db.transaction(async trx => {
            try {

                const { company_id, siteSecured } = req.body

                if(!siteSecured){
                    const firstCompany = await trx.select('*').from('companies')
                        .leftJoin('company_profiles', 'companies.company_identifier', 'company_profiles.company_id')
                    
                    if(firstCompany[0]){
                        const otherData = await this.fetchInitialData({ db, siteSecured })

                        if(otherData.data){
                            return res.json({
                                message: 'Company login successful',
                                data: {
                                    companyDetails: { ...firstCompany[0] },
                                    ...otherData.data,
                                }
                            })
                        }
                    }

                    throw new Error()
                }

                if(!company_id){
                    return res.status(400).json({ error: 'Incomplete credentials provided', err: '' })
                }

                const singleCompany = await trx.select('*').from('companies')
                    .leftJoin('company_profiles', 'companies.company_identifier', 'company_profiles.company_id')
                    .where({ company_id })

                if(singleCompany && singleCompany[0]){

                    delete singleCompany[0].password
                    delete singleCompany[0].password_hash

                    const { company_id, company_email } = singleCompany[0]
                    const otherData = await this.fetchInitialData({ db: trx, company_id })

                    if(otherData.data){
                        return res.json({ 
                            message: 'Company login successful',
                            data: {
                                companyDetails: { ...singleCompany[0] },
                                ...otherData.data,
                                accessToken: generateAccessToken({ userEmail: company_email })
                            }
                        })
                    }

                }




                throw new Error()

                
            } catch (error) {
                return res.status(400).json({ error: 'Unexpected error', err: error })                
            }
        })
        
    } catch (error) {
        return res.status(400).json({ error: 'Unexpected error', err: error })        
    }
}

exports.forgotPassword = async (req, res) => {
    try {

        const { db, insecure_db } = req

        const { siteSecured, security_question, answer, email, newPassword } = req.body

        if(!security_question || !answer || !email || !newPassword){
            return res.status(400).json({ error: 'Incomplete credentials provided', err: '' })
        }

        const updatedPassword = await updateData({
            db,
            tableName: 'companies',
            update: {
                password: newPassword
            },
            whereClause: {
                company_email: email,
                security_question
            }
        })

        if(updatedPassword.data){
            return res.json({ 
                message: 'Successfully updated password'
            })
        }



        throw new Error()

        
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: 'Unexpected error', err: error })  
    }
}

exports.getSecurityInfo = async (req, res) => {
    try {

        const { db } = req

        const { email } = req.body

        if(!email){
            return res.status(400).json({ error: 'Incomplete credentials provided', err: '' })
        }

        const company = await getByIdentifier({ db, tableName: 'companies', whereClause: { company_email: email } })

        if(company.data){
            return res.json({
                message: "Successfully retrieved security info",
                data: company.data[0]
            })
        }

        throw new Error()
        
    } catch (error) {
        return res.status(400).json({ error: 'Unexpected error', err: error }) 
    }
}