"use client"
import React, { useState } from 'react';
//import { useRef } from 'react';
import Html5QrcodePlugin from './Html5QrcodeScannerPlugin'
import {ClientUpdate} from '@/Interface/Client'
import Swal from 'sweetalert2';

function Asistencia() {

  const [qrDniClient, setqrDniClient] = useState<ClientUpdate[]>([]);
  const [datosCliente, setDatosCliente] = useState<ClientUpdate | null>(null);
  //const qrCodePluginRef = useRef<{ stop: () => Promise<void> } | null>(null);

  const onNewScanResult = (decodedText: string, decodedResult: unknown) => {
    console.log("Decoded text:", decodedText);
    console.log("DecodedResult:", decodedResult);

    if (decodedText ) {
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
            
          </div>
        ) : (
          <p>No se han encontrado datos del asistente.</p>
        )}
      </div>
      </div>
  )
}

export default Asistencia
