
'use client'
function CardsDashboard() {
    return (
        <div className="bg-white shadow rounded-lg w-full dark:bg-gray-800">
            <dl className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 w-full divide-y sm:divide-y-0 sm:divide-x dark:divide-gray-700 dark:text-white">
                <div className="flex flex-col items-center justify-center py-4 w-full ">
                    <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Clientes</dd>
                </div>
                <div className="flex flex-col items-center justify-center py-4 w-full ">
                    <dt className="mb-2 text-3xl font-extrabold">100M+</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Membresías</dd>
                </div>
                <div className="flex flex-col items-center justify-center py-4 w-full ">
                    <dt className="mb-2 text-3xl font-extrabold">1000s</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Asistencia en Total</dd>
                </div>
                <div className="flex flex-col items-center justify-center py-4 w-full ">
                    <dt className="mb-2 text-3xl font-extrabold">1B+</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Asistencia Hoy</dd>
                </div>
                <div className="flex flex-col items-center justify-center py-4 w-full ">
                    <dt className="mb-2 text-3xl font-extrabold">90+</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Total Empleados</dd>
                </div>
                <div className="flex flex-col items-center justify-center py-4 w-full ">
                    <dt className="mb-2 text-3xl font-extrabold">4M+</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Total de Promociones</dd>
                </div>
            </dl>
        </div>
    )
}

export default CardsDashboard
