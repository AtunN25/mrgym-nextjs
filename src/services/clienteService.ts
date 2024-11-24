  
  import { Client } from '@/Interface/Client'

  export const fetchClients = async (token: string) => {
    const response = await fetch('https://mrgymbackendspringboot-production-2dcf.up.railway.app/cliente/listar', {
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
  
  //se cambio el any por CLient en caso de un error 
  export const registerClient = async (token: string, data: Client) => {
    const response = await fetch('https://mrgymbackendspringboot-production-2dcf.up.railway.app/cliente/agregar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Error en la solicitud al registrar cliente');
    }
  
    return response.json();
  };