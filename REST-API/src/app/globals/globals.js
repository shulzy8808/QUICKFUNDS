const bcrypt = require('bcryptjs');
const saltRounds = 10;
const crypto = require('crypto')


exports.hashText = async ({ text }) => {
    try {
        const hashedText = await bcrypt.hash(text, saltRounds)

        if(hashedText){
            return {
                hash: hashedText,
                error: null
            }
    
        } else{
            return {
                hash: null,
                error: {
                    reason: 'Hash error occured!',
                    actualError: ''
                }
            }
        }   
    } catch (error) {
        return {
            hash: null,
            error: {
                reason: 'Unexpected hash error occurred!',
                actualError: error
            }
        }        
    }
}

exports.compareHashWithText = async ({ hash, text }) => {
    try {
        const comparison = await bcrypt.compare(text, hash)

        if(comparison){
            return {
                data: {
                    isSame: true,
                },
                error: null
            }
        } else{
            return {
                data: {
                    isSame: false,
                },
                error: null
            }
        }   
            
    } catch (error) {
        return {
            data: null,
            error: {
                reason: 'Unexpected hash comparison error occurred',
                actualError: error
            }
        }
    }
}


exports.createRandomId = () => crypto.randomBytes(64).toString('hex')

exports.generateActivationToken = () => {
    const tokenNumbers = []
    for(let i = 0; i < 4; i++){
        const randomNumber = Math.floor(Math.random() * 99)
        tokenNumbers.push(randomNumber)
    }
    return `${tokenNumbers[0]}${tokenNumbers[1]}${tokenNumbers[2]}${tokenNumbers[3]}`
}