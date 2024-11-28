
// por el momento miebro se guardara como si
import { ClientRegister } from '@/Interface/Client'


function Register({ onFormSubmit }: { onFormSubmit: (data: ClientRegister) => void; }) {


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        //const miembro = formData.has("miembro"); 

        const data: ClientRegister = {
            nombre_cliente: formData.get("nombre_cliente") as string,
            apellido_cliente: formData.get("apellido_cliente") as string,
            telefono_cliente: formData.get("telefono_cliente") as string,
            dni_cliente: formData.get("dni_cliente") as string,
            email: formData.get("email") as string,
            //miembro: miembro,
            miembro: true,
            habilitado : true
        };

        onFormSubmit(data);
    };

    return (
        <div className=" w-full gap-16 p-4  font-[sans-serif] border-2 border-gray-200  rounded-lg text-black">
            <form className="" onSubmit={onSubmit}>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                    <div className=''>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="nombre_cliente" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre Cliente</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="apellido_cliente" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido Cliente</label>
                        </div>
                    </div>

                    <div className="">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="telefono_cliente" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefono</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="dni_cliente" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dni</label>
                        </div>
                    </div>
                    <div className="">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="email" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">E-mail</label>



                            <div className='flex items-center pt-4 space-x-12'>
                                {/*<label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="miembro" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-black peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-500">Miembro</span>
                                </label>*/}
                                <button type="submit" className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
                                    Registrar Cliente
                                </button>
                            </div>


                        </div>

                    </div>


                </div>
            </form>

        </div>
    )
}

export default Register
