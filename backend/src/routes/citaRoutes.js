const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
// Rutas para las citas
router.get('/', citaController.getAllCitas);
router.post('/', citaController.createCita);
router.put('/:id', citaController.updateCita);
router.delete('/:id', citaController.deleteCita);
module.exports = router;
