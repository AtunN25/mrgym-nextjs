"use client"
import React, { useState } from 'react';
//import { useRef } from 'react';
import Html5QrcodePlugin from './Html5QrcodeScannerPlugin'
import { ClientUpdate } from '@/Interface/Client'
import Swal from 'sweetalert2';

function Asistencia() {

  const [qrDniClient, setqrDniClient] = useState<ClientUpdate[]>([]);
  const [datosCliente, setDatosCliente] = useState<ClientUpdate | null>(null);
  //const qrCodePluginRef = useRef<{ stop: () => Promise<void> } | null>(null);
  const [tipoAsistencia, setTipoAsistencia] = useState<string>('INGRESO');

  const onNewScanResult = (decodedText: string, decodedResult: unknown) => {
    console.log("Decoded text:", decodedText);
    console.log("DecodedResult:", decodedResult);

    if (decodedText) {
      Swal.fire({
        title: 'Buen Trabajo!',
        text: 'Cliente registrado con éxito!',
        icon: 'success',
      });


      BuscarCodigoDni(decodedText);

      /*if(qrCodePluginRef.current){
        qrCodePluginRef.current.stop()
          .then(() => {
            console.log("QR Code scanning stopped.");
          })
          .catch((err: Error) => {
            console.error("Error stopping QR Code scanning", err);
          });
        }*/
    }
  };

  const BuscarCodigoDni = async (decodedText: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`https://mrgymbackendspringboot-production-d49e.up.railway.app/cliente/buscar/${decodedText}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        console.log('data = ' + JSON.stringify(data));
        setqrDniClient(data);
        console.log(qrDniClient);
        setDatosCliente(data)

      } catch (error) {
        console.log('Error al obtener los datos', error);
      }
    } else {
      console.log('Token no encontrado');
    }
  };

  const RegistrarAsistencia = async () => {
    if (!datosCliente) {
      Swal.fire({
        title: 'Error',
        text: 'No se ha seleccionado un cliente.',
        icon: 'error',
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      const asistencia = {
        fecha_asistencia: new Date().toISOString(), // Fecha en el formato correcto
        tipo_asistencia: tipoAsistencia,
        fk_cliente_asistencia: datosCliente.id_cliente, // ID del cliente
        fk_empleado_asistencia: 1, // Empleado fijo
      };

      try {
        const response = await fetch('https://mrgymbackendspringboot-production-d49e.up.railway.app/asistencia/registrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(asistencia),
        });

        if (!response.ok) {
          throw new Error('Error al registrar la asistencia');
        }

        Swal.fire({
          title: 'Asistencia registrada',
          text: 'La asistencia se ha registrado con éxito.',
          icon: 'success',
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo registrar la asistencia.',
          icon: 'error',
        });
        console.log('Error al registrar la asistencia', error);
      }
    } else {
      console.log('Token no encontrado');
    }
  };


  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700 mt-14">
        asistencia
      </div>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
      <div>

        <h3>Datos del asistente:</h3>
        {datosCliente ? (
          <div>

            <p><strong>Nombre:</strong> {datosCliente.nombre_cliente}</p>
            <p><strong>Apellido:</strong> {datosCliente.apellido_cliente}</p>
            <p><strong>Teléfono:</strong> {datosCliente.telefono_cliente}</p>
            <p><strong>DNI:</strong> {datosCliente.dni_cliente}</p>
            <p><strong>Email:</strong> {datosCliente.email}</p>
            <p><strong>Miembro:</strong> {datosCliente.miembro ? "Sí" : "No"}</p>


            <div className="mt-4">
              <label htmlFor="tipo-asistencia" className="block text-sm font-medium text-gray-700">
                Tipo de Asistencia
              </label>
              <select
                id="tipo-asistencia"
                value={tipoAsistencia}
                onChange={(e) => setTipoAsistencia(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="INGRESO">Ingreso</option>
                <option value="SALIDA">Salida</option>
              </select>
            </div>


            <button
              onClick={RegistrarAsistencia}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Registrar Asistencia
            </button>

          </div>


        ) : (
          <p>No se han encontrado datos del asistente.</p>
        )}
      </div>
    </div>
  )
}

export default Asistencia
