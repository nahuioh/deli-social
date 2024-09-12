import { FormData } from "../types/types";
export const registerUser = async (formData: FormData) => {
  const apiUrl = process.env['REACT_APP_API_URL'];
  if (!apiUrl) {
    throw new Error('API_URL no está definida en las variables de entorno');
  }
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: {
          email: formData.email,
          nombreCompleto: formData.nombreCompleto,
          age: formData.age,
          nombreUsuario: formData.nombreUsuario,
          country: formData.country,
          password: formData.password
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.errors || 'Error en el registro');
    }

    return response.json();
  } catch (error) {
    // Manejo de errores (puedes ajustar esto según lo que necesites)
    console.error('Error al registrar el usuario:', error);
    throw error; // Re-lanzar el error para que pueda ser manejado por el llamador de la función
  }
};
