import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { FaEdit, FaInfoCircle } from 'react-icons/fa'
import { VscNote } from 'react-icons/vsc'
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

const type = "classrooms";

const Classroom = () => {

    const [state, setState] = useState([])
    const [additionals, setAdditionals] = useState([])
    const [others, setOthers] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
   /*  const [groupValue, setGroupValue] = useState({value: '', label: ''})
    const [buildingValue, setBuildingValue] = useState({value: '', label: ''})
    const [updateName, setUpdateName] = useState('')
    const [updateDescription, setUpdateDescription] = useState('') */
    const [id, setId] = useState('')
    const [selectedRows, setSelectedRows] = useState(false)
    const [group_id, setGroup_id] = useState('')
    const [building_id, setBuilding_id] = useState('')
    const [selectedGroup, setSelectedGroup] = useState({})
    const [selectedOther, setSelectedOther] = useState({})
    const [toggleCleared, setToggleCleared] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errors, setErrors] = useState([])

    const ref = useRef(null);
    
    const filteredItems = state.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { list, add, remove, updateClassroom } = useUser({
        middleware: 'auth'
    })

    useEffect(() => { 

        list({ setState, setPending, setAdditionals, type, setOthers })

        const handleClick = () => {
           setUpdate(false)
        };

        const element = ref.current;

        element.addEventListener('click', handleClick);

        return () => {
            element.removeEventListener('click', handleClick);
        };

    },[])

    const showModalUpdate = (id, building, group, name, description) => {
        setUpdate(true)
        setShowModal(true)
        setName(name)
        setId(id)
        setDescription(description)
        setSelectedGroup(group)
        setGroup_id(group.value)
        setBuilding_id(building.value)
        setSelectedOther(building)
        //setErrors([])
        /* const findGroup = groups.find(item => item.id == group_id)
        setGroupValue({ value: findGroup.id, label: findGroup.name })
        const findBuilding = buildings.find(item => item.id == building_id)
        setBuildingValue({ value: findBuilding.id, label: findBuilding.name }) */
    }

    const columns = [
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Groupe',
            selector: row => row.group.label,
            sortable: true,
        },
        {
            name: 'Batiment',
            selector: row => row.building.label,
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
                    <FaEdit className="cursor-pointer mr-2" title="modifier" size={25} onClick={() => showModalUpdate(row.id, row.building, row.group, row.name, row.description)}/>
                    <Link href={"classrooms/"+row.slug+"/courses"}><VscNote title="notes" className="cursor-pointer mr-2" size={25} /></Link>
                    <Link href={"classrooms/"+row.slug}><FaInfoCircle title="details" className="cursor-pointer mr-2" size={25} /></Link>
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
                <title>Scolarships - Salles</title>
            </Head>

            <div className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">

                            <DataTable
                                title={<TitleComponent title="Classes" setShowModal={setShowModal} setUpdateName={setName} setUpdateDescription={setDescription}/>}
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
                title="Salle de classe"
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
                edit={updateClassroom}
                additional={additionals}
                other={others}
                group_id={group_id}
                building_id={building_id}
                setGroup_id={setGroup_id}
                setBuilding_id={setBuilding_id}
                selectedGroup={selectedGroup}
                selectedOther={selectedOther}
                setSelectedGroup={setSelectedGroup}
                setSelectedOther={setSelectedOther}
                type={type}
            />

        </AppLayout>
    )
}

export default Classroom;