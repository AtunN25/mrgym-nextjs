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
        <div className="bg-slate-600 ">

            <section className="sm:bg-white sm:bg-split-1-3 h-screen">
                <div className="flex  flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-5/6 h-5/6 bg-white sm:bg-transparent rounded-lg shadow-2xl  ">
                        <div className="p-6  space-y-4 md:space-y-6  sm:flex  sm:col-span-2  gap-4 h-full">

                            <div className="text-white hidden sm:w-1/3 sm:flex flex-col sm:pt-52 items-start sm:items-center">
                                <Image
                                    src="/image.png"
                                    width={200}
                                    height={200}
                                    alt="Picture of the author"
                                    className="text-black"
                                />
                                <p className="font-light flex items-center justify-center">Servicio profesional semi personalizado y grupal</p>
                            </div>

                            

                            <div className='text-black  w-2/3  pt-1  sm:pt-14 '>

                               

                                <div className=' flex justify-center pl-20 items-center'>
                                    <form className="space-y-2   md:space-y-6 sm:pt-12 px-10   " action="#" onSubmit={handleSubmit}>

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
