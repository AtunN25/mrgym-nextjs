

export const fetchMembresia = async (token: string) => {
    const response = await fetch('https://mrgymbackendspringboot-production-d49e.up.railway.app/membresia/listar', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Error en la solicitud al listar clientes');
    }
  
    return response.json();
  };