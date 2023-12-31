import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { FaEdit, FaInfoCircle } from 'react-icons/fa'
import { BsBarChartFill } from 'react-icons/bs'
import TitleComponent from '@/components/TitleComponent'
import ModalSection from '@/components/ModalSection'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import Button from '@/components/Button'
import AuthValidationErrors from '@/components/AuthValidationErrors'

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};

const type = 'sequences'

const options = [
    {
        value: 1,
        label: 'Active'
    },
    {
        value: 0,
        label: 'Inactive'
    },
]

const Sequence = () => {

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
    const [selectedRows, setSelectedRows] = useState(false)
    const [toggleCleared, setToggleCleared] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errors, setErrors] = useState([])
    const [selectedStatus, setSelectedStatus] = useState({})
    const [status, setStatus] = useState('')

    const ref = useRef(null);
    
    const filteredItems = state.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { add, list, edit, remove } = useUser({
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

    const showModalUpdate = (id, name, description, status) => {
        setUpdate(true)
        setShowModal(true)
        setName(name)
        setId(id)
        setStatus(status)
        setDescription(description)
        setSelectedStatus({value: status, label: status == 1 ? 'Active' : "Inactive"})
    }

    const columns = [
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Etat',
            selector: row => <div className="rounded-full shadow-xl">{row.status ?  "Actif" : "Inactif"}</div>,
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
                    <FaEdit className="cursor-pointer mr-2" size={25} onClick={() => showModalUpdate(row.id, row.name, row.description, row.status)}/>
                    <Link href={`${type}/${row.id}/statistics`}><BsBarChartFill className="cursor-pointer mr-2" size={25} title="Statistiques" /></Link>
                    <Link href={`${type}/${row.id}`}><FaInfoCircle className="cursor-pointer mr-2" size={25} /></Link>
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
                <title>Scolarships - Sequences</title>
            </Head>

            <div className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-6 border-b border-gray-200">

                            <AuthValidationErrors className="mb-4 mt-5" errors={errors} />

                            <DataTable
                                title={<TitleComponent title="Sequences" setShowModal={setShowModal} setName={setName} />}
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
                title="Sequences"
                loading={loading}
                setLoading={setLoading}
                state={state}
                setPending={setPending}
                update={update}
                setState={setState}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                id={id}
                save={add}
                edit={edit}
                type={type}
                options={options}
                status={status}
                setStatus={setStatus}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
            />

        </AppLayout>
    )
}

export default Sequence;