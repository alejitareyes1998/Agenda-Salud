
import { BrowserRouter as Router, Routes,Route, Navigate } from 'react-router-dom';
import Login from './pages/Usuario/Login';
import Registro from './pages/Usuario/Registro';
import Ayuda from './pages/Usuario/Ayuda';
import RecuperarContrasena from './pages/Usuario/RecuperarContrasena';

import PanelPaciente from './pages/Paciente/PanelPaciente';
import Medicos from './pages/Paciente/Medicos';
import PerfilPaciente from './pages/Paciente/PerfilPaciente';
import HistorialCitasPac from './pages/Paciente/HistorialCitasPac';

import PQR from './pages/Paciente/PQR';

import PanelMedico from './pages/Medico/PanelMedico';
import PerfilMedico from './pages/Medico/PerfilMedico';
import HistorialCitasMed from './pages/Medico/HistorialCitasMed';
import TusPacientes from './pages/Medico/TusPacientes';


import Accesibilidad from './components/Accesibilidad';
import BotonAyuda from './components/BotonAyuda';
import BotonAtras from './components/BotonAtras';
import ValidarCodigo from './pages/Usuario/ValidarCodigo';
import CambioContrasena from './pages/Usuario/CambioContrasena';
import RegistroPaciente from './pages/Paciente/RegistroPaciente';
import RegistroMedico from './pages/Medico/RegistroMedico';
import Cita from './pages/Cita/Cita'


// Creamos componentes rapidos para probar que las rutas funcionen
const AdminPanel = () => <div className='p-5'><h1>Panel de Administracion</h1><p>Bienvenido dueño del centro medico.</p></div>;


function App() {
  return (
    <Router>
      <BotonAyuda />
      <BotonAtras />
      <Accesibilidad />
      <Routes>
        {/* RUTA 1: El inicio. Todo el que llegue entra por el Login */}
        <Route path='/' element={<Login />} />

        {/* RUTA 2: El Login oficial */}
        <Route path='/login' element={<Login />} />

        {/* RUTA 3: La oficina del Administrador */}
        <Route path='/admin' element={<AdminPanel />} />

        {/* RUTA 4: El paneldel Medico */}
        <Route path='/panel-medico' element={<PanelMedico />} />
        <Route path='/perfil-medico' element={<PerfilMedico />} />
        <Route path='/historial-citas-med' element={<HistorialCitasMed />} />
        <Route path='/tus-pacientes' element={<TusPacientes />} />

        {/* RUTA: Panel Paciente*/}
        <Route path='/panel-paciente' element={<PanelPaciente />} />
        <Route path='/medicos' element={<Medicos />} />
        <Route path='/perfil' element={<PerfilPaciente />} />
        <Route path='/historial-citas-pac' element={<HistorialCitasPac />} />

<Route path='/pqr' element={<PQR />} />

        {/* RUTA: Registro Usuario*/}
        <Route path='/registro' element={<Registro />} />

        {/* RUTA: Ayuda Usuario*/}
        <Route path='/ayuda' element={<Ayuda />} />

        {/* RUTA: Recuperar Contraseña */}
        <Route path='/recuperar-contrasena' element={<RecuperarContrasena />} />
        {/* Ruta para validar el código de recuperación */}
        <Route path='/validar-codigo' element={<ValidarCodigo />} />
        {/* Ruta para cambiar la contraseña */}
        <Route path='/cambio-contrasena' element={<CambioContrasena />} />
        {/* Ruta para completar datos del paciente*/}
        <Route path='/registro-paciente' element={<RegistroPaciente />} />
        {/* Ruta para completar datos del medico*/}
        <Route path='/registro-medico' element={<RegistroMedico />} />
        {/*Ruta para agendar cita*/}
        <Route path='/agendar-cita' element={<Cita />} />

        {/* Siempre debe ir al final. REGLA DE SEGURIDAD: Si alguien escribe una ruta que no existe, lo mandamos al Login */}
        <Route path='*' element={<Navigate to='/login' />} />

      </Routes>
    </Router>
  );
}

export default App;