import axios from "axios";

// Configuracion basepara todos los servicios
const apiConfig = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});
export default apiConfig;