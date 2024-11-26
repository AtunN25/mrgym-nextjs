'use client'

export interface DashboardStats {
    totalClientes: number;
    totalMembresias: number;
    asistenciaTotal: number;
    asistenciaHoy: number;
    empleados: number; 
  }

function CardsDashboard({ stats }: {stats: DashboardStats;}) {

    const { totalClientes, totalMembresias, asistenciaTotal, asistenciaHoy, empleados } = stats;


    return (
        <div className="bg-white shadow rounded-lg w-full dark:bg-gray-800">
            <dl className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 w-full divide-y sm:divide-y-0 sm:divide-x dark:divide-gray-700 dark:text-white">
                <div className="flex flex-col items-center justify-center py-4 w-full ">
                    <dt className="mb-2 text-3xl font-extrabold">{totalClientes}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Clientes</dd>
                </div>
                <div className="flex flex-col items-center justify-center py-4 w-full ">
                    <dt className="mb-2 text-3xl font-extrabold">{totalMembresias}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Membresías</dd>
                </div>
                <div className="flex flex-col items-center justify-center py-4 w-full ">
                    <dt className="mb-2 text-3xl font-extrabold">{asistenciaTotal}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Asistencia en Total</dd>
                </div>
                <div className="flex flex-col items-center justify-center py-4 w-full ">
                    <dt className="mb-2 text-3xl font-extrabold">{asistenciaHoy}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Asistencia Hoy</dd>
                </div>
                <div className="flex flex-col items-center justify-center py-4 w-full ">
                    <dt className="mb-2 text-3xl font-extrabold">{empleados}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Empleados</dd>
                </div>
            </dl>
        </div>
    )
}

export default CardsDashboard
