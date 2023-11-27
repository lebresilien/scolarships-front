import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { FaInfoCircle, FaEdit } from 'react-icons/fa'
import ModalPay from '@/components/ModalPay'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import Button from '@/components/Button'

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};

const options = [
    {
        value: 1,
        label: "Actif"
    },
    {
        value: 0,
        label: "Inactif"
    }
]

const type = "policies/1"

const Policy = () => {

    const [state, setState] = useState([])
    const [additionals, setAdditionals] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalAbsent, setShowModalAbsent] = useState(false)
    const [update, setUpdate] = useState(false)
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [id, setId] = useState('')
    const [selectedRows, setSelectedRows] = useState(false)
    const [classroom_id, setClassroom_id] = useState('')
    const [selectedGroup, setSelectedGroup] = useState({})
    const [toggleCleared, setToggleCleared] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errors, setErrors] = useState([])
    const [selectedStatus, setSelectedStatus] = useState({})

    const ref = useRef(null);

    const filteredItems = state.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { list, remove, change } = useUser({
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

    const showModalUpdate = (id, name, status, group) => {
        setErrors([])
        setUpdate(true)
        setShowModal(true)
        setName(name)
        setStatus(status)
        setSelectedGroup(group)
        setId(id)
        setClassroom_id(group.value)
        setSelectedStatus({value: status, label: status == 1 ? 'Actif' : "Inactif"})
    }

    const columns = [
        {
            name: 'Matricule',
            selector: row => row.matricule,
            sortable: true,
        },
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Classe',
            selector: row => row.cname,
            sortable: true,
        },
        {
            name: 'Montant Versé',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'Année Academique',
            selector: row => row.academy_name,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status ? <span className="text-green-500 font-bold">Actif</span> : <span className="text-red-500 font-bold">Inactif</span> ,
            sortable: true,
        },
        {
            name: 'Operations',
            selector: row => 
                <div className="flex flex-row"> 
                    <FaEdit className="cursor-pointer mr-2" size={25} title='modifier' onClick={() => showModalUpdate(row.policy_id, row.name, row.status, row.group)} />
                    <Link href={`policies/${row.policy_id}/histories`}><a target="_blank"><FaInfoCircle className="cursor-pointer mr-2" size={25} title="Historiques" /></a></Link>
                    <Link href={`policies/${row.policy_id}/absents`}><a target="_blank"><FaInfoCircle className="cursor-pointer mr-2" size={25} title='Absences' /></a></Link>
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
                //remove({ setErrors, setWaiting, ids, state, setState, type })
			}
		};

		return (
			<Button disabled={waiting} key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
				{ waiting ? 'Suppression...' : 'Supprimer' }
			</Button>
		);
	}, [state, selectedRows, toggleCleared]);

    const edit = () => {

        setLoading(true);

        const data = {
            status: status,
            classroom_id: classroom_id,
            policy_id: id
        }

        change('/api/v1/policies', id,  data)
        .then(() => {

            setLoading(false);

            const item = additionals.find(classroom => classroom.value == classroom_id)
            const copySection = [...state]
            const currentItem = copySection.find(item => item.policy_id === id)
           
            currentItem.cname = item.label
            currentItem.status = selectedStatus.value === 1 ? "Actif" : "Inactif"
            
            setState(copySection)

            setShowModal(false)
        })
        .catch(error => {
            setLoading(false);
            setErrors(Object.values(error.response.data.errors).flat())
        })
    }

    return (

        <AppLayout>

            <Head>
                <title>Scolarships - Contrats</title>
            </Head>

            <div className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg px-10">
                        <div className="">

                            <DataTable
                                title={<Button><Link href={`/policies/add`}>Nouvelle Inscription</Link></Button>}
                                columns={columns}
                                data={filteredItems}
                                pagination
                                paginationResetDefaultPage={resetPaginationToggle} 
                                subHeader
                                subHeaderComponent={subHeaderComponentMemo}
                                persistTableHead
                                progressPending={pending}
                                customStyles={customStyles}
                                //selectableRows
                                //contextActions={contextActions}
                                /* selectedRows={selectedRows}
                                clearSelectedRows={toggleCleared}
                                onSelectedRowsChange={handleRowSelected} */
                            />

                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />

            <ModalPay 
                open={showModal} 
                setOpen={setShowModal} 
                title="Contrat Apprenant"
                loading={loading}
                setPending={setPending}
                update={update}
                surname={name}
                errors={errors}
                edit={edit}
                type={type}
                additional={additionals}
                options={options}
                setClassroom_id={setClassroom_id}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                status={status}
                setStatus={setStatus}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
            />


        </AppLayout>
    )
}

export default Policy