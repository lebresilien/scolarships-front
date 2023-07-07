import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo, useRef } from "react"
import TitleComponent from '@/components/TitleComponent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaEdit, FaInfoCircle } from 'react-icons/fa'
import Link from 'next/link'
import ModalGroup from '@/components/ModalGroup'

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};

const Group = () => {

    const [groups, setGroups] = useState([])
    const [sections, setSections] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [fees, setFees] = useState('')
    const [update, setUpdate] = useState(false)
    const [sectionValue, setSectionValue] = useState({value: '', label: ''})
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [id, setId] = useState('')

    const ref = useRef(null);
    
    const filteredItems = groups.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { getGroup, getSection } = useUser({
        middleware: 'auth'
    })

    useEffect(() => { 

        getGroup({ setGroups, setPending })
        getSection({ setSections })

        const handleClick = () => {
           setUpdate(false)
        };

        const element = ref.current;

        element.addEventListener('click', handleClick);

        return () => {
            element.removeEventListener('click', handleClick);
        };

    },[])

    const showModalUpdate = (slug, section_id, name, fees, description) => {
        setUpdate(true)
        setShowModal(true)
        setName(name)
        setId(slug)
        setDescription(description)
        setFees(fees)
        const findSection = sections.find(item => item.id == section_id)
        setSectionValue({ value: findSection.id, label: findSection.name })
    }

    const columns = [
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Section',
            selector: row => row.section_name,
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
                    <FaEdit className="cursor-pointer mr-2" title="modifier" size={25} onClick={() => showModalUpdate(row.slug, row.section_id, row.name, row.fees, row.description)}/>
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

    return (

        <AppLayout>

            <Head>
                <title>Scolarships - Groupes</title>
            </Head>

            <div className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-6 border-b border-gray-200">


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
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />

            <ModalGroup 
                open={showModal} 
                setOpen={setShowModal} 
                title="Groupes"
                loading={loading}
                setLoading={setLoading}
                sections={sections}
                setPending={setPending}
                update={update}
                sectionValue={sectionValue}
                setSectionValue={setSectionValue}
                setSections={setSections}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                fees={fees}
                setFees={setFees}
                slug={id}
                setGroups={setGroups}
            />

        </AppLayout>
    )

}

export default Group;