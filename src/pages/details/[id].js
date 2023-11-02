import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import LoadingScreen from '@/components/LoadingScreen'
import React, { useState, useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/user'
import Link from 'next/link'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import Button from '@/components/Button'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};

const Details = () => {

    const [loading, setLoading] = useState(true)
    const [pending, setPending] = useState(true)
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [currentYearTransactions, setCurrentYearTransactions] = useState([])
    const [otherYearTransactions, setOtherYearTransactions] = useState([])
    const [currentYearExtensions, setCurrentYearExtensions] = useState([])
    const [otherYearExtensions, setOtherYearExtensions] = useState([])
    const [filterText, setFilterText] = useState('')
    const [waiting, setWaiting] = useState(false)

    const router = useRouter()
    const { slug } = router.query

    const { getStudentTransactionsAndExtensions, deleteStudentAccount } = useUser({
        middleware: 'auth',
    })

    useEffect(() => {
        slug && getStudentTransactionsAndExtensions({ setCurrentYearTransactions, setCurrentYearExtensions, setOtherYearTransactions, setOtherYearExtensions, slug, setPending, setLoading })
        console.log("output", currentYearTransactions)
    }, [slug])

    const filteredCurrentYearTransactionsItems = currentYearTransactions.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    )

    const filteredOtherYearTransactionsItems = currentYearTransactions.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    )

    const filteredCurrentYearExtensionsItems = currentYearExtensions.filter(
        item => item.created_at && item.created_at.toLowerCase().includes(filterText.toLowerCase()),
    )

    const filteredOtherYearExtensionsItems = currentYearExtensions.filter(
        item => item.created_at && item.created_at.toLowerCase().includes(filterText.toLowerCase()),
    )

    const transactionColumns = [
        {
            name: 'Montant',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'libelle',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.created_at,
            sortable: true,
        },
    ];

    const extensionsColumns = [
        {
            name: 'Crée le',
            selector: row => row.created_at,
            sortable: true,
        },
        {
            name: 'Jusqu\'au',
            selector: row => row.valid_until_at,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.state, 
            sortable: true,
        },
    ];

    const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
	}, [filterText, resetPaginationToggle]);

    const confirmOrNotDeleteAccount = (slug) => {

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='flex flex-col bg-blue-400 p-5'>
                        <h1 className="font-bold">Confirmation</h1>
                        <p>Voulez-vous vraiment effectuer cette operation?</p>
                        <div className="flex flex-row justify-between my-4">
                            
                            <Button onClick={onClose}>Annuler</Button>
                            
                            <Button
                                onClick={() => deleteStudentAccount({ slug, setWaiting, onClose, router }) }
                                passed={true}
                                className="inline-flex items-center px-2 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-medium text-white tracking-widest hover:bg-red-600 active:bg-red-600 focus:outline-none focus:border-red-600 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                { !waiting ? 'Confirmer' : 'Confirmation ...' }
                            </Button>

                        </div>
                    </div>
                )
            }
        })
    }

    return (

        <>
            {!loading ?
                <AppLayout>

                    <Head>
                        <title>Scolarships - Transactions</title>
                    </Head>

                    <div className="py-8">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="py-3 sm-px-0 px-2 border-b border-gray-200">
                                    
                                    <nav className="bg-grey-light rounded-md w-full">
                                        <ol className="list-reset flex">
                                            <li>
                                                <Link href="/inscription">
                                                    <a className="text-gray-800 hover:text-gray-900">Inscription</a>
                                                </Link>
                                            </li>
                                            <li><span className="text-gray-800 mx-2">{'>'}</span></li>
                                            <li className="text-gray-800">{slug}</li>
                                        </ol>
                                    </nav>

                                    <div className="grid grid-cols-1 gap-12">

                                        <div className="flex flex-col items-center mt-8 py-8 border-b border-t border-gray-200">

                                            <div className="flex flex-col w-full">
                                                <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">Liste des transactions</h3>
                                                <span className="text-sm text-gray-400 tracking-wide leading-10">Transactions liées à l'anneé scolaire en cours</span>
                                            </div>

                                            <div className="w-full flex-col">
                                                <div className="flex flex-col">

                                                    {currentYearTransactions.length != 0 ?
                                                        <DataTable
                                                            title={'Transactions'}
                                                            columns={transactionColumns}
                                                            data={filteredCurrentYearTransactionsItems}
                                                            pagination
                                                            paginationResetDefaultPage={resetPaginationToggle} 
                                                            subHeader
                                                            subHeaderComponent={subHeaderComponentMemo}
                                                            persistTableHead
                                                            progressPending={pending}
                                                            customStyles={customStyles}
                                                        />
                                                        :
                                                        <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">
                                                            Pas d'elements à afficher
                                                        </h3>
                                                    }

                                                </div>
                                            </div>
                                        </div>


                                        <div className="flex flex-col items-center mt-8 py-8 border-b border-gray-200">

                                            <div className="flex flex-col w-full">
                                                <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">Liste des transactions</h3>
                                                <span className="text-sm text-gray-400 tracking-wide leading-10">Transactions liées aux anneés scolaires anterieures</span>
                                            </div>

                                            <div className="w-full flex-col">
                                                <div className="flex flex-col">

                                                    {otherYearTransactions.length != 0 ?
                                                        <DataTable
                                                            title={'Transactions'}
                                                            columns={transactionColumns}
                                                            data={filteredOtherYearTransactionsItems}
                                                            pagination
                                                            paginationResetDefaultPage={resetPaginationToggle} 
                                                            subHeader
                                                            subHeaderComponent={subHeaderComponentMemo}
                                                            persistTableHead
                                                            progressPending={pending}
                                                            customStyles={customStyles}
                                                        />
                                                        :
                                                        <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">
                                                            Pas d'elements à afficher
                                                        </h3>
                                                    }

                                                </div>
                                            </div>
                                        </div>


                                        <div className="flex flex-col items-center mt-8 border-b border-gray-200 py-8">

                                            <div className="flex flex-col w-full">
                                                <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">Liste des moratoires</h3>
                                                <span className="text-sm text-gray-400 tracking-wide leading-10">Moratoires liés à l'anneé scolaire en cours</span>
                                            </div>

                                            <div className="w-full flex-col">
                                                <div className="flex flex-col">
                                                
                                                    {currentYearExtensions.length != 0 ?
                                                        <DataTable
                                                            title={'Moratoires'}
                                                            columns={extensionsColumns}
                                                            data={filteredCurrentYearExtensionsItems}
                                                            pagination
                                                            paginationResetDefaultPage={resetPaginationToggle} 
                                                            subHeader
                                                            subHeaderComponent={subHeaderComponentMemo}
                                                            persistTableHead
                                                            progressPending={pending}
                                                            customStyles={customStyles}
                                                        />
                                                        :
                                                        <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">
                                                            Pas d'elements à afficher
                                                        </h3>
                                                    }

                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center mt-8">

                                            <div className="flex flex-col w-full">
                                                <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">Liste des moratoires</h3>
                                                <span className="text-sm text-gray-400 tracking-wide leading-10">Moratoires liés à l'anneé scolaire en cours</span>
                                            </div>

                                            <div className="w-full flex-col">
                                                <div className="flex flex-col">
                                                
                                                    {otherYearExtensions.length != 0 ?
                                                        <DataTable
                                                            title={'Moratoires'}
                                                            columns={extensionsColumns}
                                                            data={filteredOtherYearExtensionsItems}
                                                            pagination
                                                            paginationResetDefaultPage={resetPaginationToggle} 
                                                            subHeader
                                                            subHeaderComponent={subHeaderComponentMemo}
                                                            persistTableHead
                                                            progressPending={pending}
                                                            customStyles={customStyles}
                                                        />
                                                        :
                                                        <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">
                                                            Pas d'elements à afficher
                                                        </h3>
                                                    }

                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center mt-8 border-t border-gray-200">

                                            <div className="flex flex-col w-full">
                                                <h3 className="font-bold text-xl leading-4 text-red-500 leading-10">Suppression compte</h3>
                                            </div>

                                            <div className="w-full flex-col">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-900 tracking-wide leading-10">La suppression d'un compte aura les consequences suivantes:</span>
                                                    <ul className="list-disc ml-12">
                                                        <li className="text-sm text-gray-900 tracking-wide leading-7">Toutes les informations liées au compte seront supprimées</li>
                                                        <li className="text-sm text-gray-900 tracking-wide leading-7">Cette suppression est irreversible</li>
                                                    </ul>
                                                    <Button 
                                                        cancel={1} 
                                                        className="items-center px-2 py-1 bg-red-500 border border-transparent rounded-md font-semibold text-medium text-white tracking-widest hover:bg-red-600 active:bg-red-600 focus:outline-none focus:border-red-600 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150 w-1/5 my-3"
                                                        onClick={ () => confirmOrNotDeleteAccount(slug) }
                                                    >
                                                        Supprimer
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <ToastContainer position="bottom-left"/>
                
                </AppLayout>

                :

                <LoadingScreen />
            }
        </>
    )
}

export default Details