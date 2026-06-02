const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
// 1. Middlewares (para que el servidor entienda JSON)
 app.use(cors()); // Permite conexiones externas (FRONTEND)
 app.use(express.json()); // Permite procesar datos en formato JSON
 app.use(morgan('dev')); //Registro de peticiones en consola
 // 2. Todo lo que venga de "/usuarios" lo maneje el archivo de rutas (API)
 app.use('/api/usuario', require('./routes/userRoutes'));
 app.use('/api/paciente', require('./routes/pacienteRoutes'));
 app.use('/api/medico', require('./routes/medicoRoutes'));
 app.use('/api/especialista', require('./routes/especialistaRoutes'));
 app.use('/api/horario', require('./routes/horarioRoutes'));
 app.use('/api/cita', require('./routes/citaRoutes'));
 app.use('/api/historia', require('./routes/historiaRoutes'));
 // 3. Ruta de Bienvenida y Estado del Sistema
 app.get('/', (req, res) => {
   req.json({
      mensaje: "Bienvenido a la API del Centro Medico",
      estado: "Sistema Operativo",
      entidades_activas: 8
   });
 });
 // 4. Arranque del Servidor
 const PORT = process.env.PORT || 3000;
 app.listen(PORT,() => {
   console.log('===================================================');
   console.log(`SERVIDOR MEDICO FUNCIONANDO EN: http://localthost:${PORT}`);
   console.log('Base de Datos vinculada y rutas listas.');
   console.log('=========================================================');
 });












