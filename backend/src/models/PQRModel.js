const db = require('../config/db');

const PQR = {

    // Obtener todas las solicitudes
    findAll: async () => {
        try {
            const [rows] = await db.execute(`
                SELECT *
                FROM pqr
                ORDER BY fecha_creacion DESC
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // Crear una nueva solicitud
    create: async (datos) => {
        try {
            const [result] = await db.query(
                'INSERT INTO pqr SET ?',
                [datos]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

};

module.exports = PQR;