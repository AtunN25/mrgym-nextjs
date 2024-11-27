'use client'
import React, { useState ,useEffect} from 'react'
import {ClientUpdate} from '@/Interface/Client'
import Swal from 'sweetalert2';

/*interface Membresia {
    fecha_inicio: string;
    fecha_final: string;
    duracion_meses: number;
    costo_mensual: number;
    fk_promocion: number;
    fk_cliente_membresia: number;
}*/

interface MembresiaFormProps {
    data: ClientUpdate | undefined;
  }

  const MembresiaForm: React.FC<MembresiaFormProps> = ({ data }) => {

    console.log('ultima data'+ data)
    const [formData, setFormData] = useState({
        fecha_inicio: '',
        fecha_final: '',
        duracion_meses: 0,
        costo_mensual: 0,
        fk_cliente_membresia: 0,
        fk_promocion: 1,
      });

    useEffect(() => {
        // Recuperar el último cliente del localStorage
        const ultimoCliente = localStorage.getItem('ultimoCliente');
        if (ultimoCliente) {
          const cliente = JSON.parse(ultimoCliente);
          console.log(cliente)
          setFormData((prevData) => ({
            ...prevData,
            fk_cliente_membresia: cliente.id_cliente, // Asignamos el id_cliente al estado
          }));

          console.log(cliente.id_cliente)
        }
      }, []);

   
    
      // Si data es undefined, mostrar un loading o un mensaje de espera
      if (!data) {
        return <div>Loading...</div>; // O cualquier otro mensaje adecuado
      }
    

      const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
          // Mostrar los datos que se enviarán
          console.log("Datos enviados:", formData);
      
          
          // Enviar los datos a través de un POST
          const response = await fetch('https://mrgymbackendspringboot-production-d49e.up.railway.app/membresia/registrar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Indicamos que estamos enviando JSON
              'Authorization': `Bearer ${token}`, // Si necesitas incluir el token en los headers
            },
            body: JSON.stringify(formData), // Convertimos los datos del formulario a JSON
          });
      
          // Verificamos si la respuesta es exitosa
          if (!response.ok) {
            throw new Error('Error al registrar la membresía');
          }
      
          // Si la respuesta es exitosa, procesamos la respuesta
          const data = await response.json();
          console.log('Respuesta del servidor:', data);
      
          // Aquí puedes hacer algo con la respuesta, como mostrar un mensaje de éxito
          Swal.fire({
            title: 'Registro exitoso!',
            text: 'La membresía ha sido registrada correctamente.',
            icon: 'success',
          });
      
          // Puedes actualizar el estado o realizar otras acciones después de enviar los datos
          // setFormData({...}); // Si deseas limpiar o actualizar el formulario
      
        } catch (error) {
          // Manejo de errores
          console.error('Error en la solicitud de registro de membresía:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Hubo un problema al registrar la membresía.',
            icon: 'error',
          });
        }
      };
      

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="w-full gap-16 p-4 font-[sans-serif] border-2 border-gray-200 rounded-lg text-black">
            <form className="" onSubmit={onSubmit}>
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-3">
                        <div className="relative z-0 w-full mb-5 group">
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0">
                                Fecha de inicio
                            </label>
                            <input
                                type="date"
                                name="fecha_inicio"
                                value={formData.fecha_inicio}
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300"
                                required
                            />
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0">
                                Fecha final
                            </label>
                            <input
                                type="date"
                                name="fecha_final"
                                value={formData.fecha_final}
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="col-span-3">
                        <div className="relative z-0 w-full mb-5 group">
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0">
                                Duración (meses)
                            </label>
                            <input
                                type="number"
                                name="duracion_meses"
                                value={formData.duracion_meses}
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300"
                                required
                            />
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0">
                                Costo mensual
                            </label>
                            <input
                                type="number"
                                name="costo_mensual"
                                value={formData.costo_mensual}
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className='flex items-center pt-4 space-x-12'>
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                    >
                        Registrar Membresía
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MembresiaForm;
