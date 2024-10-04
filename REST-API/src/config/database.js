require('dotenv').config();
const knex = require('knex')
const { Client, Pool } = require('pg')

const DEVELOPMENT_DB_HOST= '127.0.0.1'
const DEVELOPMENT_DB_PORT= '5432'
const DEVELOPMENT_DB_USER= 'oladamola'
const DEVELOPMENT_DB_PASSWORD= "oladamola"
const DEVELOPMENT_DB_DATABASE= 'quick_funds_database'
const DEVELOPMENT_DB_CLIENT='pg'



const PRODUCTION_DB_HOST= '127.0.0.1'
const PRODUCTION_DB_PORT= 5432
const PRODUCTION_DB_USER= 'root'
const PRODUCTION_DB_PASSWORD= 'rootpassword'
const PRODUCTION_DB_DATABASE='quick_funds_database'
const PRODUCTION_DB_CLIENT='pg'



const JWT_TOKEN='b8a24944e8b568d3ba284d217210e6ae66871351e6c4ab8a5421b34261a3163848ba44408510453347e0de0e971f382d7af8b227474b24e19db382d4078a0437'


const dbEnvironment = {
    development: {
        host: DEVELOPMENT_DB_HOST,
        port: DEVELOPMENT_DB_PORT,
        user: DEVELOPMENT_DB_USER,
        password: DEVELOPMENT_DB_PASSWORD,
        database: DEVELOPMENT_DB_DATABASE,
        client: DEVELOPMENT_DB_CLIENT
    },
    production: {
        host: PRODUCTION_DB_HOST,
        port: PRODUCTION_DB_PORT,
        user: PRODUCTION_DB_USER,
        password: PRODUCTION_DB_PASSWORD,
        database: PRODUCTION_DB_DATABASE,
        client: PRODUCTION_DB_CLIENT
    }    
}


const secureDbConn = () => {
    let connectionParams;
    if(process.env.NODE_ENV == 'production'){
        connectionParams = dbEnvironment.production
    } else{
        connectionParams = dbEnvironment.development
    }

    const { host, port, user, password, database, client } = connectionParams;

    const connection = 
        process.env.NODE_ENV == 'production'
        ?
        knex({ 
            client, 
            connection: { host, port, user, password, database, ssl: true }, 
            ssl: {
                rejectUnauthorized: false
            }
        })
        :
        knex({ client, connection: { host, port, user, password, database } });

    return connection    
}

const insecureDbConn = () => {

    let connectionParams;
    if(process.env.NODE_ENV == 'production'){
        connectionParams = dbEnvironment.production
    } else{
        connectionParams = dbEnvironment.development
    }

    const { host, port, user, password, database, client } = connectionParams

    const pgClient = new Pool({ 
        user, 
        password, 
        database,
        port,
        host, 
    })

    return pgClient
}

const connectedDb_secure = secureDbConn()
const connectedDb_insecure = insecureDbConn()

module.exports = { secureDbConn: connectedDb_secure, insecureDbConn: connectedDb_insecure }