import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo } from "react"
import { FaEdit } from 'react-icons/fa'
import TitleComponent from '@/components/TitleComponent'
import ModalCourse from '@/components/ModalCourse'
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


const Courses = () => {

    const [courses, setCourses] = useState([])
    const [units, setUnits] = useState([])
    const [course, setCourse] = useState({})
    const [groups, setGroups] = useState([])
    const [classrooms, setClassrooms] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [update, setUpdate] = useState(false)
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')

    const filteredItems = courses.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { getClassroomsWithGroups, getCourses, showCourse } = useUser({
        middleware: 'auth',
    })

    useEffect(() => { 

        getClassroomsWithGroups({ setClassrooms, setUnits })

        getCourses({ setCourses, setPending })

    },[])

    const columns = [
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Categorie',
            selector: row => row.unit.name,
            sortable: true,
        },
        {
            name: 'Crée le',
            selector: row => row.created_at,
        },
        {
            name: 'Operations',
            selector: row => <div className="flex flex-row"><FaEdit className="cursor-pointer mr-2" size={25} onClick={() => showModalUpdate(row.slug)}/></div>
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

    const showModalUpdate = (slug) => {
        showCourse({ setCourse, slug, setShowModal, setUpdate, setGroups, setName, setSlug })
    }

    return (

        <AppLayout>

            <Head>
                <title>Scolarships - Cours</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-6 border-b border-gray-200">


                            <DataTable
                                title={<TitleComponent title="Matiéres" setShowModal={setShowModal} setUpdate={setUpdate} />}
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

            <ModalCourse 
                open={showModal} 
                setOpen={setShowModal} 
                title="Matière"
                loading={loading}
                setLoading={setLoading}
                classrooms={classrooms}
                setPending={setPending}
                setCourses={setCourses}
                update={update}
                setUpdate={setUpdate}
                setCourse={setCourse}
                groups={groups}
                setGroups={setGroups}
                name={name}
                setName={setName}
                slug={slug}
                units={units}
            />

        </AppLayout>
    )
}

export default Courses