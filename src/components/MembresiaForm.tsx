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
       
        const ultimoCliente = localStorage.getItem('ultimoCliente');
        if (ultimoCliente) {
          const cliente = JSON.parse(ultimoCliente);
          console.log(cliente)
          setFormData((prevData) => ({
            ...prevData,
            fk_cliente_membresia: cliente.id_cliente, 
          }));

          console.log(cliente.id_cliente)
        }
      }, []);

   
    
     
      if (!data) {
        return <div></div>;
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
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify(formData), 
          });
      
       
          if (!response.ok) {
            throw new Error('Error al registrar la membresía');
          }
      
         
          const data = await response.json();
          console.log('Respuesta del servidor:', data);
      
     
          Swal.fire({
            title: 'Registro exitoso!',
            text: 'La membresía ha sido registrada correctamente.',
            icon: 'success',
          });
      
        
      
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
        <div className="w-full gap-16 p-4 font-[sans-serif] border-2 border-gray-200 rounded-lg text-black flex flex-col ">
            <form className="" onSubmit={onSubmit}>
                <div className="flex  gap-2  h-full">
                    <div className="w-1/2">
                        <div className="relative z-0 w-full mb-5 group">
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Fecha de inicio
                            </label>
                            <input
                                type="date"
                                name="fecha_inicio"
                                value={formData.fecha_inicio}
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-1/2">
                        <div className="relative z-0 w-full mb-5 group">
                            <label className=" absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ">
                                Duración (meses)
                            </label>
                            <input
                                type="number"
                                name="duracion_meses"
                                value={formData.duracion_meses}
                                onChange={handleChange}
                                min="1"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                                min="1"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className='flex '>
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
