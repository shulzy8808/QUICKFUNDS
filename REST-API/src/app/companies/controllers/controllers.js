const { insertData } = require("../../models/models")

exports.sendUserMessage = async (req, res) => {
    try {

        const { db } = req

        const { full_name, email, reason, phone_number, message } = req.body

        if(!full_name || !email || !reason){
            return res.status(400).json({ error: 'Incomplete credentials provided', err: '' })
        }

        const newUserMessage = await insertData({
            db, 
            tableName: 'user_messages',
            columnValues: {
                full_name, email, reason, phone_number, message
            }
        })

        if(newUserMessage.data){
            return res.json({ 
                message: 'Message received. You will hear from us shortly!'
            })
        }




        throw new Error()
        
    } catch (error) {
        return res.status(400).json({ error: 'Unexpected error', err: error })
    }
}


exports.addCustomer = async (req, res) => {
    try {

        const { db, insecure_db } = req

        const { siteSecured, company_id, customer_name, loan_amount, interest_rate, start_date, due_date, reason } = req.body

        const columnValues = { company_id, customer_name, loan_amount, interest_rate, start_date, due_date, reason }

        if(!siteSecured){
            const query = "INSERT INTO company_customers (company_id, customer_name, loan_amount, interest_rate, start_date, due_date, reason) VALUES ('" + company_id + "'" + "," + "'" + customer_name + "'" + "," + "'" + loan_amount + "'" + "," + "'" + interest_rate + "'" + "," + "'" + start_date + "'" + "," + "'" + due_date + "'" + "," + "'" + reason + "'" + ") returning *"
    
            const newCustomer = await insecure_db.query(query)

            if(newCustomer.rows){
                return res.json({
                    message: 'Successfully added customer',
                    data: newCustomer.rows[0]
                })
            }
    
            throw new Error()
        }

        if(!company_id || !customer_name || !loan_amount || !interest_rate || !start_date || !due_date || !reason){
            return res.status(400).json({ error: 'Incomplete credentials provided', err: '' })
        }

        const newCustomer = await insertData({
            db,
            tableName: 'company_customers',
            columnValues
        })

        if(newCustomer.data){
            return res.json({
                message: 'Successfully added customer',
                data: newCustomer.data
            })
        }




        throw new Error()
        
    } catch (error) {
        return res.status(400).json({ error: 'Unexpected error', err: error })        
    }
}