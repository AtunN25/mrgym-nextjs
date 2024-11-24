'use client'

import CardsDashboard from "@/components/CardsDashboard";


function Dashboard() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="border-gray-200 rounded-lg dark:border-gray-700 mt-14 p-2 gap-2 space-y-4">

        <CardsDashboard />


          <table className=" w-full rounded-lg shadow text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>

                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>

              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                  <div className="ps-3">
                    <div className="text-base font-semibold">Neil Sims</div>
                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  React Developer
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                  </div>
                </td>

              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                  <div className="ps-3">
                    <div className="text-base font-semibold">Bonnie Green</div>
                    <div className="font-normal text-gray-500">bonnie@flowbite.com</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  Designer
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                  </div>
                </td>

              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                  <div className="ps-3">
                    <div className="text-base font-semibold">Jese Leos</div>
                    <div className="font-normal text-gray-500">jese@flowbite.com</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  Vue JS Developer
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                  </div>
                </td>

              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                  <div className="ps-3">
                    <div className="text-base font-semibold">Thomas Lean</div>
                    <div className="font-normal text-gray-500">thomes@flowbite.com</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  UI/UX Engineer
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                  </div>
                </td>

              </tr>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">

                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                  <div className="ps-3">
                    <div className="text-base font-semibold">Leslie Livingston</div>
                    <div className="font-normal text-gray-500">leslie@flowbite.com</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  SEO Specialist
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Offline
                  </div>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
  );
}

export default Dashboard;
