import Swal from "sweetalert2";

export const login = async (username: string, password: string) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        Swal.fire({
          title: "Error!",
          text: "Credenciales incorrectas!",
          icon: "error",
        });
        throw new Error('Hubo un problema con la autenticación');
      }
  
      const data = await response.json();
      Swal.fire({
        title: "Buen Trabajo!",
        text: "Credenciales correctas!",
        icon: "success",
      });
  
      return data; // Devuelve la respuesta para manejarla en el componente
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  };
  