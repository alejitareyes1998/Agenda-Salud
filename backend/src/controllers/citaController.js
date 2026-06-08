const Cita = require('../models/citaModel');
const db = require('../config/db');

// 1. Obtener todas las citas (Con JOIN para ver detalles del paciente y medico)
const getAllCitas = async (req, res) => {
    try {
        const results = await Cita.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Crear una nueva cita
const createCita = async (req, res) => {
    try {
        const datos = req.body; // id_paciente, id_medico, fecha, hora, estado, motivo 
        const result = await Cita.create(datos);
        res.status(201).json({ 
            mensaje: "Cita programada con exito", 
            id: result.insertId,
            recordatorio: [
                "Se recomienda llegar 20 minutos antes de su cita, para evitar retrasos y garantizar una atencion oportuna.",
                "Recuerde traer su documento de identidad y cualquier informacion medica relevante para su consulta.",
                "Si desea cancelar o reprogramar su cita, por favor hacerlo minimo con 12 horas de anticipacion para evitar cargos por cancelacion tardia."
            ]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Actualizar una cita existente
const updateCita = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;
        await Cita.update(id, datos);
        res.status(200).json({ 
            mensaje: "cita actualizada correctamente",
            recordatorios: [
                "Recuerde: Se recomienda llegar 20 minutos antes de su cita, para evitar retrasos y garantizar una atencion oprtuna.",
                "Recuerde traer su documento de identidad y cualquier informacion medica relevante para su consulta.",
                "Si desea cancelar o reprogramar su cita, por favor hacerlo minimo con 12 horas de anticipacion para evitar cargos por cancelacion tardia."
            ]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Eliminar una cita
const deleteCita = async (req, res) => {
    try {
        const { id } = req.params;
        await Cita.delete(id);
        res.status(200).json({ 
            mensaje: "Cita eliminada correctamente",
            nota: "El espacio ha sido liberado en la agenda medica."
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Obtener citas de un paciente específico
const getCitasByPaciente = async (req, res) => {
    try {
        const { id } = req.params; 
        const results = await Cita.findByPaciente(id); 
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 6. NUEVO: Obtener la disponibilidad de horarios en bloques de 20 min
const obtenerDisponibilidad = async (req, res) => {
    const { id_medico, fecha } = req.query;
    const DURACION_CITA = 20; 

    if (!id_medico || !fecha) {
        return res.status(400).json({ error: "Faltan parámetros: id_medico y fecha son obligatorios" });
    }

    try {
        // Obtener el día de la semana en español
        const diasSemana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        const fechaObjeto = new Date(fecha + 'T00:00:00'); 
        const nombreDia = diasSemana[fechaObjeto.getDay()];

        // Consultar el rango de trabajo del médico para ese día
        const queryHorario = `
            SELECT hora_inicio, hora_fin 
            FROM horario 
            WHERE id_medico = ? AND dia = ? AND estado = 'activo'
        `;
        const [horariosTrabajo] = await db.query(queryHorario, [id_medico, nombreDia]);

        if (horariosTrabajo.length === 0) {
            return res.json([]); // Si no trabaja (ej: Domingo), devuelve vacío
        }

        const { hora_inicio, hora_fin } = horariosTrabajo[0];

        // Consultar las citas ocupadas activas
        const queryCitas = `
            SELECT hora 
            FROM cita 
            WHERE id_medico = ? AND fecha = ? AND estado IN ('pendiente', 'confirmada')
        `;
        const [citasOcupadas] = await db.query(queryCitas, [id_medico, fecha]);
        
        const horasOcupadasSet = new Set(citasOcupadas.map(c => c.hora.substring(0, 5)));
        const intervalosDisponibles = [];
        
        const [hInicio, mInicio] = hora_inicio.split(':').map(Number);
        const [hFin, mFin] = hora_fin.split(':').map(Number);
        
        let minutosActuales = (hInicio * 60) + mInicio;
        const minutosFinales = (hFin * 60) + mFin;

        // Generar los bloques de tiempo
        while (minutosActuales + DURACION_CITA <= minutosFinales) {
            const horas = Math.floor(minutosActuales / 60).toString().padStart(2, '0');
            const minutos = (minutosActuales % 60).toString().padStart(2, '0');
            const horaFormato = `${horas}:${minutos}`; 

            if (!horasOcupadasSet.has(horaFormato)) {
                intervalosDisponibles.push({ hora: horaFormato });
            }

            minutosActuales += DURACION_CITA;
        }

        return res.json(intervalosDisponibles);

    } catch (error) {
        console.error("Error al calcular intervalos:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Exportamos TODAS las funciones juntas para que ninguna se borre
module.exports = {
    getAllCitas,
    createCita,
    updateCita,
    deleteCita,
    getCitasByPaciente,
    obtenerDisponibilidad
};
