const Cita = require('../models/citaModel');
// 1. Obtener todas las citas (Con JOIN para ver detalles del paciente y medico)
exports.getAllCitas = async (req, res) => {
    try {
     const results = await Cita.findAll();
     res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
     // 2. Crear una nueva cita
    exports.createCita = async (req, res) => {
        try {
        const datos = req.body; // id_paciente, id_medico, fecha, hora, estado, motivo 
        const result = await Cita.create(datos);
            res.status(201).json({ mensaje: "Cita programada con exito", id: result.insertId,
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
    exports.updateCita = async (req, res) => {
        try {
        const {id } = req.params;
        const datos = req.body;
            await Cita.update(id, datos);
            res.status(200).json({ mensaje: "cita actualizada correctamente",
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
    exports.deleteCita = async (req, res) => {
        try {
        const { id } = req.params;
            await Cita.delete(id);
            res.status(200).json({ mensaje: "Cita eliminada correctamente",
                nota: "El espacio ha sido liberado en la agenda medica."
            });
         }  catch (err) {
                res.status(500).json({ error: err.message });
    }
};
