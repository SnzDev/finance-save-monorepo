import { Table } from 'flowbite-react'
import { Footer } from '@components/Footer'
import { Navbar } from '@components/Navbar'

export function Dashboard () {
  return (
    <section className="flex flex-col w-screen h-screen">
      <Navbar />
      <div className="flex flex-col flex-1 w-full p-4 justify-start h-full bg-slate-100">
        <div
          className="py-4 rounded-lg md:py-8 dark:bg-gray-800"
          id="stats"
          role="tabpanel"
          aria-labelledby="stats-tab"
        >
          <dl className="grid grid-cols-2 gap-8 mx-auto max-w-screen-xl text-gray-900 sm:grid-cols-3 dark:text-white">
            <div className="flex drop-shadow-md flex-col bg-white py-7 rounded justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold text-red-500">
                R$ 600,00
              </dt>
              <dd className="font-semibold text-red-500 dark:text-gray-400">
                Saida
              </dd>
            </div>
            <div className="flex drop-shadow-md flex-col bg-white py-7 rounded justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold text-green-500">
                R$ 7.000,00
              </dt>
              <dd className="font-semibold text-green-500 dark:text-gray-400">
                Entrada
              </dd>
            </div>
            <div className="flex drop-shadow-md flex-col bg-white py-7 rounded justify-center items-center">
              <dt className="mb-2 text-3xl font-extrabold">R$ 2.800,00</dt>
              <dd className="font-semibold text-gray-500 dark:text-gray-400">
                Saldo
              </dd>
            </div>
          </dl>
        </div>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Product name</Table.HeadCell>
              <Table.HeadCell>Color</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Apple MacBook Pro 17"
                </Table.Cell>
                <Table.Cell>Sliver</Table.Cell>
                <Table.Cell>Laptop</Table.Cell>
                <Table.Cell>$2999</Table.Cell>
                <Table.Cell
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                  }}
                >
                  <a
                    href="#"
                    className="font-medium text-yellow-400 dark:text-yellow-600 mr-2 hover:underline"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-800 hover:underline"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
      <Footer />
    </section>
  )
}
