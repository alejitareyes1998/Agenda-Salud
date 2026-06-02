const mysql = require('mysql2/promise');
require('dotenv').config();
// Creamos la "piscina" de conexiones
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
//Verificacion de conexion
db.getConnection()
    .then(connection => {
        console.log('¡Conexion exitosa! El Backend y MySQL ya estan conectados mediante .env');
        connection.release(); //En la version de promesas, esto funciona asi
    })
    .catch(err => {
        console.error('Error de conexion:', err.message);
    });
module.exports = db;