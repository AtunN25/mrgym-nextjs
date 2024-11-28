
'use client';
import React, { useState, useEffect } from 'react';
import { ClientUpdate } from '@/Interface/Client'



function Table({ data }: { data: ClientUpdate[]; }) {

    const [clients, setClients] = useState<ClientUpdate[]>(data);
    const [editClient, setEditClient] = useState<ClientUpdate | null>(null);



    useEffect(() => {

        setClients(data);
    }, [data]);

    
    const filteredData = clients.filter((client) => {
        //console.log('Client habilitado:', client.habilitado);
        return client.habilitado === true;
    });

    console.log('Datos filtrados:', filteredData);

    /*filteredData.map((client) => {
        console.log("Cliente:", client);
        console.log("ID Cliente:", client.id_cliente); 
      });*/


    const eliminar = async (idNumber: number) => {
        try {

            const idString = idNumber.toString();

            const clienteEliminarPut = clients.find(client => client.id_cliente === idNumber);

            console.log('clienteELiminarPut ' + clienteEliminarPut)

            const clienteActualizar = {
                ...clienteEliminarPut,  
                habilitado: false  
            };

            console.log(clienteActualizar)
            const token = localStorage.getItem('token'); 

            if (!token) {
                throw new Error('Token no encontrado');
            }

            console.log('objeto ' + JSON.stringify(clienteActualizar))

            
            const response = await fetch(
                `/cliente/actualizar/${idString}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(clienteActualizar),
                }
            );

            if (!response.ok) {
                throw new Error('Error al actualizar cliente');
            }

            
            setClients((prevClients) =>
                prevClients.filter((client) => client.habilitado || client.dni_cliente !== idString)
            );

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const abrirEditar = (client: ClientUpdate) => {
        setEditClient(client);
    };

    const actualizar = async () => {
        if (!editClient) return;

        try {
          

            const token = localStorage.getItem('token'); 

            if (!token) {
                throw new Error('Token no encontrado');
            }

            console.log(JSON.stringify(editClient))
            const response = await fetch(
                `/cliente/actualizar/${editClient.id_cliente}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(editClient),
                }
            );

            if (!response.ok) {
                throw new Error('Error al actualizar cliente');
            }

            // Actualizar el estado local
            setClients((prevClients) =>
                prevClients.map((client) =>
                    client.dni_cliente === editClient.dni_cliente ? editClient : client
                )
            );

            // Cerrar el modal
            setEditClient(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Apellido
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Teléfono
                        </th>
                        <th scope="col" className="px-6 py-3">
                            DNI
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Miembro
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Options
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData
                        .slice()
                        .reverse()
                        .map((client, index) => (

                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {client.nombre_cliente}
                            </td>
                            <td className="px-6 py-4">{client.apellido_cliente}</td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                {client.telefono_cliente}
                            </td>
                            <td className="px-6 py-4">{client.dni_cliente}</td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                {client.email}
                            </td>
                            <td className="px-6 py-4">{client.miembro ? 'Sí' : 'No'}</td>

                            <td className='space-x-2'>
                                <button
                                    className="bg-blue-500 text-white p-2 rounded-md"
                                    onClick={() => abrirEditar(client)}
                                >
                                    editar
                                </button>
                                <button
                                    className="bg-red-500 text-white p-2 rounded-md"
                                    onClick={() => eliminar(client.id_cliente)}
                                >
                                    eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Modal de edición */}
            {editClient && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md space-y-4 w-full md:w-1/3">
                        <h2 className="text-xl font-bold">Editar Cliente</h2>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={editClient.nombre_cliente}
                            onChange={(e) =>
                                setEditClient({ ...editClient, nombre_cliente: e.target.value })
                            }
                            className="w-full border p-2 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={editClient.apellido_cliente}
                            onChange={(e) =>
                                setEditClient({ ...editClient, apellido_cliente: e.target.value })
                            }
                            className="w-full border p-2 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Teléfono"
                            value={editClient.telefono_cliente}
                            onChange={(e) =>
                                setEditClient({ ...editClient, telefono_cliente: e.target.value })
                            }
                            className="w-full border p-2 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            value={editClient.email}
                            onChange={(e) =>
                                setEditClient({ ...editClient, email: e.target.value })
                            }
                            className="w-full border p-2 rounded-md"
                        />
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <label className="text-sm">Miembro:</label>
                                <input
                                    type="checkbox"
                                    checked={editClient.miembro}
                                    onChange={(e) =>
                                        setEditClient({
                                            ...editClient,
                                            miembro: e.target.checked,
                                        })
                                    }
                                    className="p-2"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="text-sm">Habilitado:</label>
                                <input
                                    type="checkbox"
                                    checked={editClient.habilitado}
                                    onChange={(e) =>
                                        setEditClient({
                                            ...editClient,
                                            habilitado: e.target.checked,
                                        })
                                    }
                                    className="p-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-green-500 text-white p-2 rounded-md"
                                onClick={actualizar}
                            >
                                Guardar
                            </button>
                            <button
                                className="bg-gray-500 text-white p-2 rounded-md"
                                onClick={() => setEditClient(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>

    )
}

export default Table
