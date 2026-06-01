const Horario = require('../models/horarioModel');
// 1. OBTENER TODOS LOS GET
exports.getAllHorarios = async (req, res) => {
    try {
        const result = await Horario.obtenerTodos();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
};
// 2. CREAR UN NUEVO HORARIO (POST)
exports.createHorario = async (req, res) => {
    try {
        const result = await Horario.crear(req.body);
        res.status(201).json({ mensaje: "horario creado con exito", id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// 3. ACTUALIZAR UN HORARIO (PUT)
exports.updateHorario = async (req, res) => {
    try {
        const { id } = req.params;
        const resul = await Horario.actualizar(id, req.body);
        res.status(200).json({ mensaje: "Horario actualizado con exito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// 4. ELIMINAR UN HORARIO (DELETE)
exports.deleteHorario = async (req, res) => {
    try{
       const { id } = req.params;
        await Horario.eliminar(id);
        res.status(200).json({ mensaje: "Horario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


