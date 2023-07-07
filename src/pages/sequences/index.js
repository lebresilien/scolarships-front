import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo, useRef } from "react"
import { FaEdit, FaInfoCircle } from 'react-icons/fa'
import { BsBarChartFill } from 'react-icons/bs'
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

const Sequence = () => {

    const [errors, setErrors] = useState([]);
    const [sequences, setSequences] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [updateName, setUpdateName] = useState('')
    const [id, setId] = useState('')

    const ref = useRef(null);
    
    const filteredItems = sequences.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { getSequence } = useUser({
        middleware: 'auth'
    })

    useEffect(() => { 

        getSequence({ setSequences, setPending })

        const handleClick = () => {
           setUpdate(false)
        };

        const element = ref.current;

        element.addEventListener('click', handleClick);

        return () => {
            element.removeEventListener('click', handleClick);
        };

    },[])

    const showModalUpdate = (slug, name) => {
        setUpdate(true)
        setShowModal(true)
        setUpdateName(name)
        setId(slug)
    }

    const columns = [
        {
            name: 'Nom',
            selector: row => row.name,
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
                    <FaEdit className="cursor-pointer mr-2" size={25} onClick={() => showModalUpdate(row.id, row.building_id, row.group_id, row.name, row.description)}/>
                    <Link href={"sequences/"+row.slug+"/statistics"}><BsBarChartFill className="cursor-pointer mr-2" size={25} title="Statistiques" /></Link>
                    <Link href={"classrooms/"+row.slug}><FaInfoCircle className="cursor-pointer mr-2" size={25} /></Link>
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
                <title>Scolarships - Sequences</title>
            </Head>

            <div className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-6 border-b border-gray-200">


                            <DataTable
                                title={<TitleComponent title="Sequences" setShowModal={setShowModal} setUpdateName={setUpdateName} />}
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

           {/*  <ModalSequence 
                open={showModal} 
                setOpen={setShowModal} 
                title="Sequence"
                loading={loading}
                setLoading={setLoading}
                setPending={setPending}
                update={update}
                setSequences={setSequences}
                updateName={updateName}
                setUpdateName={setUpdateName}
                slug={id}
            /> */}

        </AppLayout>
    )
}

export default Sequence;