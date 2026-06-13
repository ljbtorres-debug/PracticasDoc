// Sustituye por tu IP real (ej: 192.168.1.15)

// const IP_COMPUTADORA = '192.168.100.61';
// export const BASE_URL = `http://${IP_COMPUTADORA}:8000/api`;

    
    export const BASE_URL = `http://localhost:8000/api`;

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    // Configuramos los headers por defecto
    const defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    // Si la respuesta no es exitosa (ej. 404 o 500), lanzamos un error
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error en la petición');
    }

    // Retornamos el JSON ya convertido
    return response.json();
};