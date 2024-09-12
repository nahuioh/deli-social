import { FormData } from "../types/types";
// src/services/api.ts
export const registerUser = async (formData: FormData) => {
   const response = await fetch('http://localhost:3000/accounts', {
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
};
