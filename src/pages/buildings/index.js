import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import TitleComponent from '@/components/TitleComponent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaEdit, FaInfoCircle } from 'react-icons/fa'
import Link from 'next/link'
import ModalSection from '@/components/ModalSection'
import Button from '@/components/Button'

const type = 'buildings'

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};

const Building = () => {

    const [state, setState] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [update, setUpdate] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [id, setId] = useState('')
    const ref = useRef(null);
    const [selectedRows, setSelectedRows] = useState(false)
    const [toggleCleared, setToggleCleared] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errors, setErrors] = useState([])
    
    const filteredItems = state.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { list, add, updateBuilding, remove } = useUser({
        middleware: 'auth'
    })

    useEffect(() => { 

        list({ setState, setPending, type })

        const handleClick = () => {
           setUpdate(false)
        };

        const element = ref.current;

        element.addEventListener('click', handleClick);

        return () => {
            element.removeEventListener('click', handleClick);
        };

    },[])

    const showModalUpdate = (id, name, description) => {
        setUpdate(true)
        setShowModal(true)
        setName(name)
        setId(id)
        setDescription(description)
    }

    const columns = [
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Crée le',
            selector: row => row.created_at,
        },
        {
            name: 'Operations',
            selector: row => 
                <div className="flex flex-row">
                    <FaEdit className="cursor-pointer mr-2" title="modifier" size={25} onClick={() => showModalUpdate(row.id, row.name, row.description)}/>
                    <Link href={"buildings/"+row.slug}><FaInfoCircle title="details" className="cursor-pointer mr-2" size={25} /></Link>
                </div> 
        }
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

    const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

    const contextActions = useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to deleted:\r ${selectedRows.map(r => r.title)}?`)) {
				setToggleCleared(!toggleCleared);
                let ids = "";
                selectedRows.forEach((item, index) => {
                    if(index == (selectedRows.length - 1)) ids += item.id
                    else ids += item.id + ';'
                })
                remove({ setErrors, setWaiting, ids, state, setState, type })
			}
		};

		return (
			<Button disabled={waiting} key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
				{ waiting ? 'Suppression...' : 'Supprimer' }
			</Button>
		);
	}, [state, selectedRows, toggleCleared]);

    return (

        <AppLayout>

            <Head>
                <title>Scolarships - Batiments</title>
            </Head>

            <div className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <DataTable
                                title={<TitleComponent title="Batiments" setShowModal={setShowModal} setUpdateName={setName} setUpdateDescription={setDescription} />}
                                columns={columns}
                                data={filteredItems}
                                pagination
                                paginationResetDefaultPage={resetPaginationToggle} 
                                subHeader
                                subHeaderComponent={subHeaderComponentMemo}
                                persistTableHead
                                progressPending={pending}
                                customStyles={customStyles}
                                selectableRows
                                contextActions={contextActions}
                                selectedRows={selectedRows}
                                clearSelectedRows={toggleCleared}
                                onSelectedRowsChange={handleRowSelected}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />

            <ModalSection
                open={showModal} 
                setOpen={setShowModal} 
                title="Batiments"
                loading={loading}
                setLoading={setLoading}
                setPending={setPending}
                update={update}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                id={id}
                setState={setState}
                state={state}
                save={add}
                edit={updateBuilding}
                type={type}
            /> 

        </AppLayout>
    )

}

export default Building;