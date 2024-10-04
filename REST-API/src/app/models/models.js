const { createRandomId } = require("../globals/globals")

exports.getAll = async ({ db, tableName, limit, offset }) => {
    try {
        const allData = await db.select("*").from(tableName).limit(limit ? limit : 100).offset(offset ? offset : 0)

        if(allData){
            return {
                data: allData,
                error: null
            }

        } else{
            return {
                data: null, 
                error: {
                    reason: 'Error fetching data, check logs',
                    actualError: ''
                }
            }
        }

    } catch (error) {

        return {
            data: null, 
            error: {
                reason: 'Unexpected fetching error',
                actualError: error
            }
        }
    }
}


exports.insertData = async ({ db, tableName, columnValues }) => {
    try {
        const insertion = await db(tableName).insert(columnValues).returning('*')

        if(insertion){
            return {
                data: insertion[0],
                error: null
            }

        } else{
            return {
                data: null, 
                error: {
                    reason: 'Error inserting data, check logs',
                    actualError: ''
                }
            }
        }

    } catch (error) {

        return {
            data: null, 
            error: {
                reason: 'Unexpected insertion error',
                actualError: error
            }
        }
    }
}

exports.getByIdentifier = async ({ db, tableName, whereClause }) => {
    try {
        const specificData = await db.select('*').from(tableName).where(whereClause)

        if(specificData){
            return {
                data: specificData,
                error: null
            }
        } else{
            return {
                data: null,
                error: {
                    reason: 'Error getting specific data. Check logs'
                }
            }
        }

    } catch (error) {
        return {
            data: null,
            error: {
                reason: 'Unexpected fetch specific error',
                actualError: error
            }
        }
    }
}

exports.updateData = async ({ db, tableName, update, whereClause }) => {
    try {
        
        const updatedData = await db(tableName).where(whereClause).update(update).returning('*')

        if(updatedData){
            return {
                data: updatedData,
                error: null
            }

        } else{
            return {
                data: null,
                error: {
                    reason: 'Error updating user',
                    actualError: ''
                }
            }
        }

    } catch (error) {
        return {
            data: null,
            error: {
                reason: 'Unexpected update error',
                actualError: error
            }
        }
    }
}

exports.deleteData = async ({ db, tableName, whereClause }) => {
    try {
        
        const updatedData = await db(tableName).where(whereClause).del().returning('*')

        if(updatedData){
            return {
                data: updatedData,
                error: null
            }

        } else{
            return {
                data: null,
                error: {
                    reason: 'Error deleting user',
                    actualError: ''
                }
            }
        }

    } catch (error) {
        return {
            data: null,
            error: {
                reason: 'Unexpected delte error',
                actualError: error
            }
        }
    }
}




exports.generateUniqueId = async ({ db, tableName, idKeyName }) => {
    try {
        let retry = true
        while(retry){
            const newId = createRandomId().slice(0, 100)
            const checkId = await this.getByIdentifier({ tableName, whereClause: { [idKeyName]: newId }, db })
            if(checkId){
                if(checkId.data.length == 0){
                    retry = false
                    return {
                        id: newId,
                        error: null
                    }
                }
    
                if(checkId.error){
                    retry = false
                    return {
                        id: null,
                        error: {
                            reason: 'Unexpected validation error',
                            actualError: ''
                        }
                    }
                }
            }
        } 

        return {
            id: null,
            error: {
                reason: 'Unexpected validation error',
                actualError: ''
            }
        }      
    } catch (error) {
        return {
            id: null,
            error: {
                reason: 'Unexpected unique Id generation error',
                actualError: error
            }
        }
    }
}

// exports.sendEmail = async ({ to, subject, text, emailClient }) => {
//     try {

//         const messageData = {
//             from: `Excited User <mailgun@${process.env.EMAIL_DOMAIN}>`, //supposed to be the company email
//             to, subject, text
//         };
          
//         const sendingMail = await emailClient.messages.create(process.env.EMAIL_DOMAIN, messageData)

//         if(sendingMail){
//             return {
//                 sent: true,
//                 error: null
//             }
//         }

//         return {
//             sent: false,
//             error: {
//                 reason: 'Error encountered while mail was on transit',
//                 actualError: err
//             }
//         }       
        
//     } catch (error) {
//         return {
//             sent: false,
//             error: {
//                 reason: 'An unexpected error occurred while trying to send the mail',
//                 actualError: error
//             }
//         }
//     }
// }