const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const protegerRuta = require('../middlewares/authMiddleware');
// definimos que cuando alguien entre a "/usuarios", use la funcion de tu controlador
//Ruta para el login
router.post('/login', userController.loginUser);
//Ruta para crear un nuevo usuario
router.post('/', userController.createUser);
//Ruta para recuperar contraseña
router.post('/recuperar-contrasena', userController.recuperarContrasena);

router.get('/', userController.getAllUser);

//Ruta para validar el código de recuperación
router.post('/validar-codigo', userController.validarCodigoRecuperacion);
//Ruta para cambiar contraseña
router.put('/cambiar-contrasena', userController.cambiarContrasena);
//Guardian de seguridad
router.use(protegerRuta);
// ruta para actualizar un usuario
router.put('/:id', userController.updateUser);
// ruta para eliminar un usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;