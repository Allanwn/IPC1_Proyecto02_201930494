
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    server: {
        port: process.env.PORT || 3000 // Valor por defecto si no está definido en el .env
    },
    adminData: {
        username: process.env.USERSTORE || 'defaultAdmin', // Valor por defecto
        password: process.env.PASSWORD || 'defaultPassword' // Valor por defecto
    }
};
