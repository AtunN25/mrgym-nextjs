"use client"
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import Image from 'next/image'

function Page() {

    const [usuario, setusuario] = useState<string>('');
    const [contrasenia, setcontrasenia] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        

        try {

            const data = await login(usuario, contrasenia);
            localStorage.setItem('token', data.token);
            router.push('/dashboard');

        } catch (error) {
            console.error('Error al autenticar:', error);
        }
    }

    return (
        <div className="bg-red-500">

            <section className="bg-white sm:bg-split-1-3">
                <div className="flex  flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-5/6 h-5/6 rounded-lg shadow-2xl  ">
                        <div className="p-6 space-y-4 md:space-y-6  flex col-span-2  gap-4 h-full">

                            <div className='text-white  w-1/3 flex flex-col  pt-52 items-center'>

                                <Image
                                    src="/image.png"
                                    width={200}
                                    height={200}
                                    alt="Picture of the author"
                                />

                                <p className='font-light '>Servicio profesional semi personalizado
                                    y grupal</p>
                            </div>


                            <div className='text-black  w-2/3  pt-14 '>

                                <div className=' flex justify-center items-center'>
                                    <form className="space-y-2    md:space-y-6 pt-12 px-10   " action="#" onSubmit={handleSubmit}>

                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                            Ingresa tu cuenta
                                        </h1>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Usuario</label>
                                            <input className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user"
                                                onChange={(e) => setusuario(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Contraseña</label>
                                            <input type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600   focus:border-primary-600 block  p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={(e) => setcontrasenia(e.target.value)}
                                            />
                                        </div>

                                        <button type="submit" className="  flex justify-center text-white bg-slate-800 border hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  ">Sign in</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page
