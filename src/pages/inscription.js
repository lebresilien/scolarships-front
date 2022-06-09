import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo } from "react"
import { FaInfoCircle, FaEdit, FaMoneyBill } from 'react-icons/fa'
import { BsSignpostSplitFill } from 'react-icons/bs'
import TitleComponent from '@/components/TitleComponent'
import ModalStudent from '@/components/ModalStudent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import ModalPay from '@/components/ModalPay'
import ModalExtended from '@/components/ModalExtended'

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};


const Student = () => {

    const [students, setStudents] = useState([])
    const [student_id, setStudent_id] = useState('')
    const [classrooms, setClassrooms] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showModalPay, setShowModalPay] = useState(false)
    const [showModalMoratoire, setShowModalMoratoire] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [pending, setPending] = useState(true)
    const [fullName, setFullName] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

    const filteredItems = students.filter(
		item => item.fname && item.fname.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { getStudents, addStudent, getClassroom } = useUser({
        middleware: 'auth',
    })

    useEffect(() => { 

        getStudents({ setStudents, setPending })

        getClassroom({ setClassrooms })

    },[])

    const columns = [
        {
            name: 'Nom',
            selector: row => row.fname,
            sortable: true,
        },
        {
            name: 'Prenom',
            selector: row => row.lname,
            sortable: true,
        },
        {
            name: 'sexe',
            selector: row => row.sexe,
            sortable: true,
        },
        {
            name: 'Operations',
            selector: row => 
                <div className="flex flex-row"> 
                    <Link href={"students/"+row.slug}><a><FaEdit className="cursor-pointer mr-2" size={25} /></a></Link>
                    <FaMoneyBill className="cursor-pointer mr-2" onClick={() => showPaiment(row.id)} size={30} />
                    <BsSignpostSplitFill className="cursor-pointer mr-2" onClick={() => showMoratoire(row.id, row.lname, row.fname)} size={25} />
                    <Link href={"details/"+row.slug}><a><FaInfoCircle className="cursor-pointer mr-2" size={25} /></a></Link>
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

    const showPaiment = (id) => {
        setStudent_id(id)
        setShowModalPay(true)
    }

    const showMoratoire = (id, name, surname) => {
        const full_name = surname + ' ' + name
        setStudent_id(id)
        setFullName(full_name)
        setShowModalMoratoire(true)
    }

    const showUserDetails = (id, name, surname) => {

    }

    return (

        <AppLayout>

            <Head>
                <title>Scolarships - Eleves</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-6 border-b border-gray-200">


                            <DataTable
                                title={<TitleComponent title="Elèves" setShowModal={setShowModal} />}
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

            <ModalStudent 
                open={showModal} 
                setOpen={setShowModal} 
                title="Nouvel Eléve"
                classrooms={classrooms}
                setStudents={setStudents}
                setPending={setPending}
            />

            <ModalPay 
                open={showModalPay} 
                setOpen={setShowModalPay} 
                title="Nouveau paiement"
                student_id={student_id}
            />

            <ModalExtended
                open={showModalMoratoire} 
                setOpen={setShowModalMoratoire} 
                title="Nouveau moratoire"
                student_id={student_id}
                name={fullName}
            />

        </AppLayout>
    )
}

export default Student