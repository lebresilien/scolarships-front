import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo, useCallback } from "react"
import { FaEdit } from 'react-icons/fa'
import TitleComponent from '@/components/TitleComponent'
import ModalSection from '@/components/ModalSection'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};

const type = "courses"


const Courses = () => {

    const [state, setState] = useState([])
    const [additionals, setAdditionals] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [update, setUpdate] = useState(false)
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [name, setName] = useState('')
    const [selectedGroup, setSelectedGroup] = useState({})
    const [unit_id, setUnit_id] = useState('')
    const [description, setDescription] = useState('')
    const [coeff, setCoeff] = useState('')
    const [id, setId] = useState('')
    const [selectedRows, setSelectedRows] = useState(false)
    const [toggleCleared, setToggleCleared] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errors, setErrors] = useState([])

    const filteredItems = state.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { list, add, edit, remove } = useUser({
        middleware: 'auth'
    })

    useEffect(() => { 
        list({ setState, setPending, type, setAdditionals })
    },[])

    const columns = [
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Categorie',
            selector: row => row.group.label,
            sortable: true,
        },
        {
            name: 'Coefficient',
            selector: row => row.coeff,
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
            selector: row => <div className="flex flex-row"><FaEdit className="cursor-pointer mr-2" size={25} onClick={() => showModalUpdate(row.id, row.name, row.description, row.group, row.coeff)}/></div>
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
	}, [state, selectedRows, toggleCleared])

    const showModalUpdate = (id, name, description, group, coeff) => {
        setUpdate(true)
        setShowModal(true)
        setName(name)
        setId(id)
        setDescription(description)
        setSelectedGroup(group)
        setUnit_id(group.value)
        setCoeff(coeff)
    }

    return (

        <AppLayout>

            <Head>
                <title>Scolarships - Cours</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <div className="">

                            <AuthValidationErrors className="mb-4 mt-5" errors={errors} />

                            <DataTable
                                title={<TitleComponent title="Matiéres" setShowModal={setShowModal} setCoeff={setCoeff} setDescription={setDescription} setUpdate={setUpdate} setName={setName} />}
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
                title="Matière"
                loading={loading}
                setLoading={setLoading}
                setPending={setPending}
                setState={setState}
                state={state}
                update={update}
                setUpdate={setUpdate}
                name={name}
                setName={setName}
                id={id}
                additional={additionals}
                save={add}
                edit={edit}
                type={type}
                selectedGroup={selectedGroup}
                unit_id={unit_id}
                setUnit_id={setUnit_id}
                description={description}
                setDescription={setDescription}
                setSelectedGroup={setSelectedGroup}
                coeff={coeff}
                setCoeff={setCoeff}
            />

        </AppLayout>
    )
}

export default Courses