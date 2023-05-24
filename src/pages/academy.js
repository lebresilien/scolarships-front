import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  TitleComponent  from '@/components/TitleComponent'
import  FilterComponent  from '@/components/FilterComponent'
import Button from '@/components/Button'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Switch from "react-switch"
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { FaInfoCircle } from 'react-icons/fa'

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};

const Academy = () => {

    const [academies, setAcademies] = useState([])
    const [selectedRows, setSelectedRows] = useState(false)
    const [toggleCleared, setToggleCleared] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [pending, setPending] = useState(true)
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errors, setErrors] = useState([])
    const [active, setActive] = useState(true)
	
    const filteredItems = academies.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { getAcademies, addAcademy, updateAcademy } = useUser({
        middleware: 'auth',
    })

    useEffect(() => { 
       getAcademies({ setAcademies, setPending })
    },[])

    const handleDetails = (academy_id) => {
        //content
    }

    const handleChangeActive = (academy_id) => {
    
        if(active) {
            
            confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <div className='flex flex-col bg-blue-400 p-5'>
                        <h1 className="font-bold">Confirmation</h1>
                        <p>Voulez-vous vraiment effectuer cette operation?</p>
                        <div className="flex flex-row justify-between my-4">

                            <Button onClick={onClose}>Annuler</Button>

                            <Button
                                onClick={() => {

                                    updateAcademy({ academy_id, setActive, onClose, setWaiting, academies, setAcademies })

                                }}
                                className="inline-flex items-center px-2 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-medium text-white tracking-widest hover:bg-red-600 active:bg-red-600 focus:outline-none focus:border-red-600 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                { !waiting ? 'Confirmer' : 'Confirmation ...' }
                            </Button>

                        </div>
                    </div>
                  );
                }
              });

        } 
    }

    const columns = [
        {
            name: 'Libelle',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Slug',
            selector: row => row.slug,
            sortable: true,
        },
        {
            name: 'Crée le',
            selector: row => row.created_at,
            sortable: true,
        },
        {
            name: 'Operation',
            selector: row => row.status == 1 ? <div className="flex flex-row"> <FaInfoCircle className="cursor-pointer mr-2" onClick={ () => handleDetails(row.id) } size={25} /> <Switch checked={active} onChange={ () => handleChangeActive(row.id) } /></div>: <div className="flex flex-row"> <FaInfoCircle className="cursor-pointer mr-2" onClick={ () => handleDetails(row.id) } size={25} /> <Switch disabled={true} onChange={ () => {} } /></div>
        }
    ];
  
    const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

    const contextActions = useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
				setToggleCleared(!toggleCleared);
				setAcademies(differenceBy(academies, selectedRows, 'title'));
			}
		};

		return (
			<Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
				Delete
			</Button>
		);
	}, [academies, selectedRows, toggleCleared]);

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

    const save = (e) => {
        e.preventDefault()
        addAcademy({ name, setLoading, setErrors, setAcademies, academies, setActive, setName})
    }

    const handleChange = (e) => setName(e.target.value)

    return (

        <AppLayout>

            <Head>
                <title>Scolarships - academies</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-6 border-b border-gray-200">

                            <AuthValidationErrors 
                                className="mb-4 mt-5" 
                                errors={errors} 
                            />
                            
                            <DataTable
                                title={
                                    <TitleComponent 
                                        name={name} 
                                        handleChange={handleChange} 
                                        title="Academies" 
                                        save={save} 
                                        loading={loading}
                                    />
                                }
                                columns={columns}
                                data={filteredItems}
                                selectableRows
                                contextActions={contextActions}
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={toggleCleared}
                                pagination
                                paginationResetDefaultPage={resetPaginationToggle} 
                                subHeader
                                subHeaderComponent={subHeaderComponentMemo}
                                persistTableHead
                                progressPending={pending}
                                customStyles={customStyles}
                            />

                        </div>
                    </div>
                </div>
            </div>

        </AppLayout>
        
    )
}


export default Academy;