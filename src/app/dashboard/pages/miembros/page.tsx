"use client"

import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code'
import Table from '@/components/Table'
import { Client } from '@/Interface/Client'
import Register from '@/components/Register'
import Swal from 'sweetalert2';
import { fetchClients, registerClient } from '@/services/clienteService'; 

function Miembros() {


  const [clients, setClients] = useState<Client[]>([]);
  const [qrDniCliente, setQrDniCliente] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          
          const data = await fetchClients(token); 
          console.log('Clientes obtenidos:', data);
          setClients(data);

        } catch (error) {
          console.log('Error al obtener los datos', error);
        }
      } else {
        console.log('Token no encontrado');
      }
    };

    fetchData();
  }, []);

  const RegistrarCliente = async (data: Client) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        
        const newClient = await registerClient(token, data);

        Swal.fire({
          title: 'Buen Trabajo!',
          text: 'Cliente registrado con éxito!',
          icon: 'success',
        });

        console.log(newClient.dni_cliente)

        if (newClient.dni_cliente) {
          setQrDniCliente(newClient.dni_cliente); // Solo actualizar si hay dni_cliente
        } else {
          console.error('El cliente registrado no tiene DNI');
        }

        //actualizar la lista de clientes
        setClients((prevClients) => [...prevClients, newClient]);

      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Formato de datos incorrectos!',
          icon: 'error',
        });
        console.error('Error al registrar el cliente:', error);
      }
    } else {
      console.log('Token no encontrado');
    }
  };


  return (
    <div className="p-4 sm:ml-64">
      <div className=" border-2 border-gray-200  rounded-lg dark:border-gray-700 mt-14">

        <div className='border rounded-lg border-gray-950 p-4 flex-auto space-y-2'>


          <Register onFormSubmit={RegistrarCliente}></Register>

          <Table data={clients}></Table>

          {qrDniCliente && (
            <div className="mt-4 flex justify-center">
              <QRCode value={qrDniCliente} size={256} bgColor="#282c34" fgColor="#fff" level="H" />
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default Miembros
