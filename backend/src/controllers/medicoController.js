const Medico = require('../models/medicoModel');
// Obtener todos los medicos
exports.getAllMedicos = async (req, res) => {
        try {
            const result = await Medico.obtenerTodos();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
};
        
// Crear un nuevo medico con registro multiple
exports.createMedico =  async (req, res) => {
   //console.log("=== datos que recibe el backend ===", require.body);
    try{
        const result = await Medico.crear(req.body);
            return res.status(201).json({
                mensaje: 'Medico y usuario creados con exito en el sistema',         
                id_medico: result
            });
             
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error en el proceso de registro multiple del medico',
         error: error.message});
    }
};
// Obtener medico por ID
exports.getMedicoById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Medico.obtenerPorId(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ mensaje: 'Medico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

exports.getMedicoByUsuarioId = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const result = await Medico.obtenerPorUsuarioConUsuario(id_usuario);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ mensaje: 'Medico no encontrado para este usuario' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

    // Actualizar un medico
exports.updateMedico = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Medico.actualizar(id, req.body);
        if (result.affectedRows > 0) {
        res.status(200).json({ mensaje: 'Medico actualizado con exito' });
        } else {
            res.status(404).json({ mensaje: 'Medico no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Eliminar un medico
exports.deleteMedico = async (req, res) => {
      try {
         const { id } = req.params;
         const result = await Medico.eliminar(id);
         if (result.affectedRows > 0) {
         res.status(200).json({ mensaje: 'Medico eliminado con exito' });
         } else {
            res.status(404).json({ mensaje: 'Medico no encontrado' });
         }
      } catch (error) {
          res.status(500).json({ error: error.message});
    }
};    




























