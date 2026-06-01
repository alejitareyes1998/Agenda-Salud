const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');
// Ruta para obtener todos los horarios
router.get('/', horarioController.getAllHorarios);
router.post('/', horarioController.createHorario);
// Ruta para actualizar y eliminar un horario especifico por su ID
router.put('/:id', horarioController.updateHorario);
router.delete('/:id', horarioController.deleteHorario);
module.exports = router;