import  { createContext, useRef } from 'react';
import { Toast } from 'primereact/toast';
const AlertaContext = createContext();
const AlertaProvider = ({ children }) => { 
    const toastRef = useRef(null);
    /**
     * Dispara una alerta flotante condescendiente con la vista.
     * @pram {string} titulo - titulo de la ventana.
     * @param {string} mensaje - mensaje detallado.
     * @param {'success' | 'error' | 'info' | 'warn'} tipo - color base de la notificacion.
     * @param {function} alCerrar - Accion opcional que se ejecuta tras cerrarse la alerta.
     */
    const mostrarAlertaGlobal = (titulo, mensaje, tipo = 'success', alCerrar = null) => {
        toastRef.current.show({
            severity: tipo,   // 'success', (verde), 'error' (rojo), 'info' (azul), 'warn' (amarillo)
            summary: titulo,
            detail: mensaje,
            life: 4000       // Desaparece automaticamente a los 4 segundos
        });
        // Si pasaste una funcion de redireccion (como ir acitas), la ejecuta a los 4 segundos
        if (alCerrar) {
            setTimeout(() => {
                alCerrar();
            }, 4000);
        }
    };

    return(
        <AlertaContext.Provider value={{ mostrarAlertaGlobal }}>
            {/* Estilo CSS inyectados para suavisar el Toast nativo de primeReact */}
            <style>{`
            .p-toast.p-toast-top-center {
            top: 5% !important;
            left: 50% !important;
            transform: translatex(-50%,) !important;
            position: fixed !important;
            width: 90% !important;
            max-width: 350px !important;
            z-index: 9999 !important;
            }
            /* Caja flotante con bordes redondeados */
            .p-toast .p-toast-message {
            background: #d5f1e79d !important;
            border-radius: 16px !important;
            box-shadow: 0 20px 25px -5px rgba(110, 80, 200, 0.15), !important;
            border-image: linear-gradient(135deg, #a78bfa, #c084fc, #6366f1) 1 !important;
            padding: 1.25rem !important;
            }
            /* Titulo en gris oscuro */
            .p-toast .p-toast-message .p-toast-summary {
            color: #1e293b !important;
            font-size: 15px !important;
            font-weight: 600 !important;
            }
            /* Mensaje en gri medio */
            .p-toast .p-toast-message .p-toast-detail {
            color: #64748b !important;
            font-size: 13px !important;
            margin-top: 4px !important;
            } 
            /* Tonos pastel para no cansar la vista */
            .p-toast .p-toast-message.p-toast-message-success {
            border-color : #64d2b1 !important; /* verde pastel suave */
            }
            .p-toast .p-toast-message.p-toast-message-error {
            border-color: #fca5a5 !important; /* Rojo/rosado suave */
            }
            .p-toast .p-toast-message.p-toast-message-info {
            border-color: #93c5fd !important; /* Azul pastel suave */
            }
            .p-toast .p-toast-message.p-toast-message-warn {
            border-color: #f2de7c !important; /* Amarillo pastel suave */
            }
        `}</style>
        {/* Ubicacion de la caja flotante */}
        <Toast ref={toastRef} position="top-center" />
        {children}
        </AlertaContext.Provider>
    );
};
export {AlertaContext, AlertaProvider}; 

