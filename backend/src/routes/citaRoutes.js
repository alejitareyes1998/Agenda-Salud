const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
//const protegerRuta = require('../middlewares/authMiddleware');
router.get('/paciente/:id', citaController.getCitasByPaciente); // Obtener Citas paciente

// Rutas para las citas
//router.use(protegerRuta);
router.get('/', citaController.getAllCitas);
router.post('/', citaController.createCita);
router.put('/:id', citaController.updateCita);
router.delete('/:id', citaController.deleteCita);
module.exports = router;
