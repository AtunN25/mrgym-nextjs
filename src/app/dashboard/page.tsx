'use client'

import CardsDashboard from "@/components/CardsDashboard";
import { useEffect, useState } from "react";
import {fetchClients} from '@/services/clienteService'
import {fetchMembresia} from '@/services/membresiaService'
import {ClientUpdate} from '@/Interface/Client'


export interface Asistencia {
  id_asistencia: number;
  fecha_asistencia: string; 
  tipo_asistencia: "INGRESO" | "SALIDA"; 
  clienteEntities: ClientUpdate;
}


export interface DashboardStats {
  totalClientes: number;
  totalMembresias: number;
  asistenciaTotal: number;
  asistenciaHoy: number;
  empleados: number; 
}

function Dashboard() {
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  
  const [token, setToken] = useState<string | null>(null);

  const [stats, setStats] = useState<DashboardStats>({
    totalClientes: 0,
    totalMembresias: 0,
    asistenciaTotal: 0,
    asistenciaHoy: 0,
    empleados: 1, // Valor fijo
  });

  useEffect(() => {
    // Acceder a `localStorage` solo en el cliente
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); 

  useEffect(() => {

    const fetchTotalMembresias = async () => {
      try {
        //const token = localStorage.getItem("token");
        if (token) {
          const membresias = await fetchMembresia(token);
          const totalMembresias = membresias.length; // Suponiendo que membresias es un array
          setStats((prevStats) => ({
            ...prevStats,
            totalMembresias: totalMembresias, // Actualizar el total de membresías
          }));
        }
      } catch (error) {
        console.error("Error al obtener las membresías", error);
      }
    };

    fetchTotalMembresias();

    // Obtener la cantidad total de clientes
    const fetchTotalClientes = async () => {
      try {
        //const token = localStorage.getItem("token");
        if (token) {
          const clientResponse = await fetchClients(token);
          const totalClientes = clientResponse.length; // Obtener el número de clientes
          setStats((prevStats) => ({
            ...prevStats,
            totalClientes: totalClientes, // Actualizar el total de clientes
          }));
        }
      } catch (error) {
        console.error("Error al obtener los clientes", error);
      }
    };

    fetchTotalClientes();
    
    const fetchAsistencias = async () => {
      try {
        const response = await fetch(
          "https://mrgymbackendspringboot-production-d49e.up.railway.app/asistencia/listar",
          {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAsistencias(data);
          console.log(data)
          console.log(JSON.stringify(data))


           // Procesar datos para las estadísticas
          // const uniqueClientes = new Set(data.map((a: Asistencia) => a.clienteEntities?.id_cliente || 0));// Aquí se corrige el callback
           const totalHoy = data.filter((a: Asistencia) =>
             new Date(a.fecha_asistencia).toDateString() === new Date().toDateString()
           ).length;
 
           setStats((prevStats) => ({
            ...prevStats,
            asistenciaTotal: data.length,
            asistenciaHoy: totalHoy,
          }));

        } else {
          console.error("Error al obtener las asistencias");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchAsistencias();

    
  }, );


  return (
    <div className="p-4 sm:ml-64">
      <div className="border-gray-200 rounded-lg dark:border-gray-700 mt-14 p-2 gap-2 space-y-4">

        <CardsDashboard stats={stats}/>


          <table className=" w-full rounded-lg shadow text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>

                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                   DNI
                </th>
                <th scope="col" className="px-6 py-3">
                    Fecha y hora
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>

              </tr>
            </thead>
            <tbody>
            {asistencias.map((asistencia) => (
              <tr
                key={asistencia.id_asistencia}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {`${asistencia.clienteEntities.nombre_cliente} ${asistencia.clienteEntities.apellido_cliente}`}
                    </div>
                    <div className="font-normal text-gray-500">{'+51 '+ asistencia.clienteEntities.telefono_cliente}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {asistencia.clienteEntities.dni_cliente }
                </td>
                <td className="px-6 py-4">
                  {new Date(asistencia.fecha_asistencia).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full me-2 ${
                        asistencia.tipo_asistencia === "INGRESO"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    {asistencia.tipo_asistencia === "INGRESO"
                      ? "Ingreso"
                      : "Salida"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
  
  );
}

export default Dashboard;
