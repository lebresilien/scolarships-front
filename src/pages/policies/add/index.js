import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { AiOutlineUserAdd } from 'react-icons/ai'
import TitleComponent from '@/components/TitleComponent'
import ModalPay from '@/components/ModalPay'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';

const customStyles = {
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
};


const type = "policies/2"

const Add = () => {

    const [state, setState] = useState([])
    const [additionals, setAdditionals] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState('')
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [id, setId] = useState('')
    const [amount, setAmount] = useState('')
    const [classroom_id, setClassroom_id] = useState('')
    const [errors, setErrors] = useState([])
    const ref = useRef(null);

    const filteredItems = state.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	)

    const { list, create } = useUser({
        middleware: 'auth',
    })

    useEffect(() => { 
        list({ setState, setPending, setAdditionals, type })
    },[])

    const showModalUpdate = (id, name) => {
        setErrors([])
        setShowModal(true)
        setName(name)
        setId(id)
        setAmount('')
    }

    const columns = [
        {
            name: <span className="text-gray-900 md:text-lg">Noms && Prénoms</span>,
            selector: row => <span className="text-gray-900 md:text-lg">{row.name}</span>,
            sortable: true,
        },      
        {
            name: <span className="text-gray-900 md:text-lg">Operations</span>,
            selector: row => 
                <div className="flex flex-row"> 
                    <AiOutlineUserAdd className="cursor-pointer mr-2" size={25} onClick={() => showModalUpdate(row.id, row.name)} />
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

    const save = () => {

        setLoading(true);

        const data = {
            student_id: id,
            classroom_id: classroom_id,
            amount: amount
        }

        create('/api/v1/policies', data)
        .then(() => {
            setLoading(false);
            console.log('rre', state)
            console.log('rre', id)
            setState(state.filter(item => item.id !== id));
            toast('Inscription réussie')
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
                                title={<TitleComponent title="Inscriptions" />}
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

            <ModalPay 
                open={showModal} 
                setOpen={setShowModal} 
                title="Nouvelle Inscription"
                loading={loading}
                setPending={setPending}
                surname={name}
                errors={errors}
                type={type}
                additional={additionals}
                setClassroom_id={setClassroom_id}
                amount={amount}
                setAmount={setAmount}
                save={save}
            />


        </AppLayout>
    )
}

export default Add