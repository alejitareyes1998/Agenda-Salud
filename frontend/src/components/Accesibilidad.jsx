import { useState } from 'react';
import './Accesibilidad.css';

function Accesibilidad() {
  const [abierto, setAbierto] = useState(false)

  function activarContraste() {
    document.body.classList.toggle("contraste-activo");
  }

  function aumentarLetra() {
    if (!document.body.classList.contains("letra-grande") && !document.body.classList.contains("letra-extra-grande")) {
      document.body.classList.add("letra-grande");
     
    } else if (!document.body.classList.contains("letra-extra-grande")) {
      document.body.classList.add("letra-extra-grande");
      document.body.classList.add("letra-extra-grande");
    }
  }

  function reducirLetra() {
    if (document.body.classList.contains("letra-extra-grande")) {
      document.body.classList.remove("letra-extra-grande");
      document.body.classList.add("letra-grande");
    } else if (document.body.classList.contains("letra-grande")) {
      document.body.classList.remove("letra-grande");
    }
  }

  function restaurarAccesibilidad() {
    document.body.classList.remove("contraste-activo");
    document.body.classList.remove("letra-grande");
    document.body.classList.remove("letra-extra-grande");
  }

  return (
    <div style={{
      position: 'fixed',
      right: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }}>

      {/* Panel que se despliega */}
      {abierto && (
        <div className="panel-accesibilidad" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          backgroundColor: '#1a73e8',
          padding: '10px',
          borderRadius: '10px 0 0 10px',
        }}>
          <button title="Contraste" onClick={activarContraste}>
            <span className="icono">◐</span>
            <span className="texto">Contraste</span>
          </button>
          <button title="Reducir letra" onClick={reducirLetra}>
            <span className="icono">A</span>
            <span className="texto">Reducir letra</span>
          </button>
          <button title="Aumentar letra" onClick={aumentarLetra}>
            <span className="icono">A+</span>
            <span className="texto">Aumentar letra</span>
          </button>
          <button title="Restaurar" onClick={restaurarAccesibilidad}>
            <span className="icono">↺</span>
            <span className="texto">Restaurar</span>
          </button>
        </div>
      )}

      {/* Botón flotante para abrir/cerrar */}
      <button
        onClick={() => setAbierto(!abierto)}
        title="Accesibilidad"
        style={{
          backgroundColor: '#1a73e8',
          color: 'white',
          border: 'none',
          borderRadius: '10px 0 0 10px',
          padding: '12px 8px',
          cursor: 'pointer',
          fontSize: '20px',
          writingMode: 'vertical-rl',
          letterSpacing: '2px',
          opacity: '0.7',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
      >
        ♿
      </button>

    </div>
  )
}

export default Accesibilidad;