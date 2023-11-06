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
import AuthValidationErrors from '@/components/AuthValidationErrors'

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};

const type = 'groups'

const Group = () => {

    const [state, setState] = useState([])
    const [additionals, setAdditionals] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [fees, setFees] = useState('')
    const [update, setUpdate] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState({})
    const [section_id, setSection_id] = useState('')
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [id, setId] = useState('')
    const [selectedRows, setSelectedRows] = useState(false)
    const [toggleCleared, setToggleCleared] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errors, setErrors] = useState([])

    const ref = useRef(null);
    
    const filteredItems = state.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { list, add, edit, remove } = useUser({
        middleware: 'auth'
    })

    useEffect(() => { 

        list({ setState, setPending, setAdditionals, type })

        const handleClick = () => {
           setUpdate(false)
        };

        const element = ref.current;

        element.addEventListener('click', handleClick);

        return () => {
            element.removeEventListener('click', handleClick);
        };

    },[])

    const showModalUpdate = (id, name, fees, description, group) => {
        setUpdate(true)
        setShowModal(true)
        setName(name)
        setId(id)
        setDescription(description)
        setFees(fees)
        setSelectedGroup(group)
        setSection_id(group.value)
    }

    const columns = [
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Section',
            selector: row => row.group.label,
            sortable: true,
        },
        {
            name: 'Pension',
            selector: row => row.fees,
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
                    <FaEdit className="cursor-pointer mr-2" title="modifier" size={25} onClick={() => showModalUpdate(row.id, row.name, row.fees, row.description, row.group)}/>
                    <Link href={"groups/"+row.slug}><FaInfoCircle title="details" className="cursor-pointer mr-2" size={25} /></Link>
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
                <title>Scolarships - Groupes</title>
            </Head>

            <div className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg px-10">
                        <div className="py-6 border-b border-gray-200">

                            <AuthValidationErrors className="mb-4 mt-5" errors={errors} />

                            <DataTable
                                title={<TitleComponent title="Groupes" setShowModal={setShowModal} setUpdateName={setName} setUpdateDescription={setDescription} setFees={setFees} />}
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
                title="Groupes"
                loading={loading}
                setLoading={setLoading}
                additional={additionals}
                setPending={setPending}
                update={update}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                fees={fees}
                setFees={setFees}
                id={id}
                setState={setState}
                state={state}
                save={add}
                edit={edit}
                section_id={section_id}
                setSection_id={setSection_id}
                setSelectedGroup={setSelectedGroup}
                selectedGroup={selectedGroup}
                type={type}
            />

        </AppLayout>
    )

}

export default Group;