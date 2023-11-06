import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { FaInfoCircle, FaEdit, FaMoneyBill } from 'react-icons/fa'
import { BsSignpostSplitFill } from 'react-icons/bs'
import TitleComponent from '@/components/TitleComponent'
import ModalSection from '@/components/ModalSection'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import ModalPay from '@/components/ModalPay'
import ModalExtended from '@/components/ModalExtended'
import Button from '@/components/Button'

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};

const type = "students"

const Student = () => {

    const [state, setState] = useState([])
    const [additionals, setAdditionals] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [lname, setLname] = useState('')
    const [fname, setFname] = useState('')
    const [sexe, setSexe] = useState('M')
    const [born_place, setBornPlace] = useState('')
    const [born_at, setBornAt] = useState('')
    const [father_name, setFatherName] = useState('')
    const [mother_name, setMotherName] = useState('')
    const [fphone, setFphone] = useState('')
    const [mphone, setMphone] = useState('')
    const [quarter, setQuarter] = useState('')
    const [comming, setComming] = useState('')
    const [allergy, setAllergy] = useState('')
    const [amount, setAmount] = useState('')
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [id, setId] = useState('')
    const [selectedRows, setSelectedRows] = useState(false)
    const [classroom_id, setClassroom_id] = useState('')
    const [selectedGroup, setSelectedGroup] = useState({})
    const [toggleCleared, setToggleCleared] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errors, setErrors] = useState([])

    const ref = useRef(null);

    const filteredItems = state.filter(
		item => item.fname && item.fname.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { list, add, edit, remove } = useUser({
        middleware: 'auth',
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

    const showModalUpdate = (id, name, surname, sexe, bornAt, bornPlace, comeFrom, allergy, qter, Mname, Fname, Fphone, Mphone) => {
        setUpdate(true)
        setShowModal(true)
        setLname(name)
        setFname(surname)
        setSexe(sexe)
        setQuarter(qter)
        setMotherName(Mname)
        setFatherName(Fname)
        setFphone(Fphone)
        setMphone(Mphone)
        setAllergy(allergy)
        setBornAt(bornAt)
        setBornPlace(bornPlace)
        setComming(comeFrom)
        setId(id)
    }

    const columns = [
        {
            name: 'Matricule',
            selector: row => row.matricule,
            sortable: true,
        },
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
            name: 'Etablissement de Provenance',
            selector: row => row.comming,
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
                    <Link href={"students/"+row.id}><a target="_blank"><FaEdit className="cursor-pointer mr-2" size={25} onClick={() => showModalUpdate(row.id, row.fname, row.lname, row.sexe, row.born_at, row.born_place, row.comming, row.allergy, row.quarter, row.mother_name, row.father_name, row.fphone, row.mphone)} /></a></Link>
                    <FaMoneyBill className="cursor-pointer mr-2" onClick={() => showPaiment(row.id)} size={30} />
                    <BsSignpostSplitFill className="cursor-pointer mr-2" onClick={() => showMoratoire(row.id, row.lname, row.fname)} size={25} />
                    <Link href={"students/"+row.id}><a target="_blank"><FaInfoCircle className="cursor-pointer mr-2" size={25} /></a></Link>
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
                <title>Scolarships - Apprenants</title>
            </Head>

            <div className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg px-10">
                        <div className="py-6 border-b border-gray-200">

                            <DataTable
                                title={<TitleComponent title="Apprenants" setShowModal={setShowModal} />}
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
                title="Liste Apprenants"
                loading={loading}
                setLoading={setLoading}
                state={state}
                setPending={setPending}
                update={update}
                setState={setState}
                lname={lname}
                setLname={setLname}
                fname={fname}
                setFname={setFname}
                sexe={sexe}
                setSexe={setSexe}
                born_place={born_place}
                setBornPlace={setBornPlace}
                born_at={born_at}
                setBornAt={setBornAt}
                father_name={father_name}
                setFatherName={setFatherName}
                mother_name={mother_name}
                setMotherName={setMotherName}
                fphone={fphone}
                setFphone={setFphone}
                mphone={mphone}
                setMphone={setMphone}
                quarter={quarter}
                amount={amount}
                setQuarter={setQuarter}
                comming={comming}
                setComming={setComming}
                allergy={allergy}
                setAllergy={setAllergy}
                setAmount={setAmount}
                id={id}
                save={add}
                edit={edit}
                additional={additionals}
                classroom_id={classroom_id}
                setClassroom_id={setClassroom_id}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                type={type}
            />

            {/* <ModalPay 
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
            /> */}

        </AppLayout>
    )
}

export default Student