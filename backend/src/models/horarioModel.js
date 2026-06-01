const db = require('../config/db');
const Horario = {
    obtenerTodos: async () => {
            const [rows] = await db.query('SELECT * FROM horario');
            return rows;
     },
    crear: async (datos) => {
            const { id_medico, dia, hora_inicio, hora_fin, estado } = datos;
            const query = `INSERT INTO horario (id_medico, dia, hora_inicio, hora_fin, estado) VALUES (?, ?, ?, ?, ?)`;
            const [result] = await db.query(query, [id_medico, dia, hora_inicio, hora_fin, estado]);
            return result;
    },
    

actualizar: async (id, datos) => {
        const [result] = await db.query('UPDATE horario SET ? WHERE id_horario = ?', [datos, id]);
        return result;
    
    },

eliminar: async (id) => {
        const [result] = await db.query('DELETE FROM horario WHERE id_horario = ?', [id]);
        return result;
    }
};

module.exports = Horario;
    

