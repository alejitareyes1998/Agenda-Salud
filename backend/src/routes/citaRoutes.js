const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
// Rutas para las citas
router.get('/', citaController.getAllCitas);
router.post('/', citaController.createCita);
router.get('/paciente/:id', citaController.getCitasByPaciente);
router.put('/:id', citaController.updateCita);
router.delete('/:id', citaController.deleteCita);
module.exports = router;
