const mysql = require('mysql2/promise')


const pool= mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
    
})

const testConnection = async() =>{
    try{
        await pool.getConnection();
        console.log("Connection Successfull....")
    }catch(err){
        console.log(err)
        console.log("connection faild ")
    }
}

testConnection()

module.exports = pool