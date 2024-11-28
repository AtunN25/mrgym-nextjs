"use client"

import React, { useEffect, useState } from 'react';
//import QRCode from 'react-qr-code'
import Table from '@/components/Table'
import { ClientRegister, ClientUpdate } from '@/Interface/Client'
import Register from '@/components/Register'
import Swal from 'sweetalert2';
import { fetchClients, registerClient } from '@/services/clienteService';
import MembresiaForm from '@/components/MembresiaForm'
import QrCode from '@/components/QrCode'

function Miembros() {


  const [clients, setClients] = useState<ClientUpdate[]>([]);
  const [qrDniCliente, setQrDniCliente] = useState<string | null>(null);

  const [Ultimoclients, setUltimoClients] = useState<ClientUpdate>();


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

  const RegistrarCliente = async (data: ClientRegister) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {

        const newClient = await registerClient(token, data);

        Swal.fire({
          title: 'Buen Trabajo!',
          text: 'Cliente registrado con éxito!',
          icon: 'success',
        });

        console.log(newClient)

        if (newClient.dni_cliente) {
          setQrDniCliente(newClient.dni_cliente); // Solo actualizar si hay dni_cliente
        } else {
          console.error('El cliente registrado no tiene DNI');
        }

        setUltimoClients(newClient);
        localStorage.setItem('ultimoCliente', JSON.stringify(newClient));
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
      <div className="  border-gray-200  rounded-lg dark:border-gray-700 mt-14">

        <div className='  rounded-lg border-gray-950 p-4 flex-auto space-y-2'>


          <Register onFormSubmit={RegistrarCliente}></Register>

          <div className='sm:flex sm:space-x-4 '>

            <div className='hidden sm:block'>
              {qrDniCliente && (
                <div className="">
                  <QrCode props={qrDniCliente} />
                </div>
              )}
            </div>

            <MembresiaForm data={Ultimoclients}></MembresiaForm>


          </div>

          <Table data={clients}></Table>



        </div>

      </div>
    </div>
  )
}

export default Miembros
