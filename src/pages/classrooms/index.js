import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo, useRef } from "react"
import { FaEdit, FaInfoCircle } from 'react-icons/fa'
import { VscNote } from 'react-icons/vsc'
import TitleComponent from '@/components/TitleComponent'
import ModalClasse from '@/components/ModalClasse'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};

const Classroom = () => {

    const [classroms, setClassrooms] = useState([])
    const [buildings, setBuildings] = useState([])
    const [groups, setGroups] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [groupValue, setGroupValue] = useState({value: '', label: ''})
    const [buildingValue, setBuildingValue] = useState({value: '', label: ''})
    const [updateName, setUpdateName] = useState('')
    const [updateDescription, setUpdateDescription] = useState('')
    const [id, setId] = useState('')

    const ref = useRef(null);
    
    const filteredItems = classroms.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { getClasse, getBuilding, getGroup } = useUser({
        middleware: 'auth'
    })

    useEffect(() => { 

        getClasse({ setClassrooms, setPending })
        getBuilding({ setBuildings })
        getGroup({ setGroups })

        const handleClick = () => {
           setUpdate(false)
        };

        const element = ref.current;

        element.addEventListener('click', handleClick);

        return () => {
            element.removeEventListener('click', handleClick);
        };

    },[])

    const showModalUpdate = (slug, building_id, group_id, name, description) => {
        setUpdate(true)
        setShowModal(true)
        setUpdateName(name)
        setId(slug)
        setUpdateDescription(description)
        const findGroup = groups.find(item => item.id == group_id)
        setGroupValue({ value: findGroup.id, label: findGroup.name })
        const findBuilding = buildings.find(item => item.id == building_id)
        setBuildingValue({ value: findBuilding.id, label: findBuilding.name })
    }

    const columns = [
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Groupe',
            selector: row => row.group_name,
            sortable: true,
        },
        {
            name: 'Batiment',
            selector: row => row.building_name,
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
                    <FaEdit className="cursor-pointer mr-2" title="modifier" size={25} onClick={() => showModalUpdate(row.id, row.building_id, row.group_id, row.name, row.description)}/>
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
                                title={<TitleComponent title="Classes" setShowModal={setShowModal} setUpdateName={setUpdateName} setUpdateDescription={setUpdateDescription}/>}
                                columns={columns}
                                data={filteredItems}
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

            <ToastContainer />

            <ModalClasse 
                open={showModal} 
                setOpen={setShowModal} 
                title="Salle de classe"
                loading={loading}
                setLoading={setLoading}
                buildings={buildings}
                groups={groups}
                setPending={setPending}
                update={update}
                groupValue={groupValue}
                setGroupValue={setGroupValue}
                buildingValue={buildingValue}
                setBuildingValue={setBuildingValue}
                setClassrooms={setClassrooms}
                updateName={updateName}
                setUpdateName={setUpdateName}
                updateDescription={updateDescription}
                setUpdateDescription={setUpdateDescription}
                slug={id}
            />

        </AppLayout>
    )
}

export default Classroom;