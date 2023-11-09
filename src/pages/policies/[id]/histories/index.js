import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import  FilterComponent  from '@/components/FilterComponent'
import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { FaEdit } from 'react-icons/fa'
import TitleComponent from '@/components/TitleComponent'
import ModalPay from '@/components/ModalPay'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

const customStyles = {
   
    headCells: {
        style: {
            fontWeight: 'bolder'
        },
    },
   
};

const type = 'transactions'

const Student = () => {

    const [state, setState] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [surname, setSurname] = useState('')
    const [slug, setId] = useState('')
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const [selectedRows, setSelectedRows] = useState(false)
    const [toggleCleared, setToggleCleared] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errors, setErrors] = useState([])

    const ref = useRef(null);

    const filteredItems = state.filter(
		item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
	)

    const router = useRouter()
    const { id } = router.query;

    const { index, create, edit, remove } = useUser({
        middleware: 'auth',
    })

    useEffect(() => { 

        id && ((
            index('/api/v1/transactions/history/'+id)
            .then(res => {
                setPending(false)
                setState(res.data.state)
                res.data.state.length > 0 &&  setSurname(res.data.state[0].name)
            })
        ))
        
        const handleClick = () => {
           setUpdate(false)
        };

        const element = ref.current;

        element.addEventListener('click', handleClick);

        return () => {
            element.removeEventListener('click', handleClick);
        };

    }, [id])

    const showModalUpdate = (id, amount, title, name) => {
        setUpdate(true)
        setShowModal(true)
        setId(id)
        setAmount(amount)
        setName(title)
        setSurname(name)
    }

    const columns = [
        {
            name: 'Libellé',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Montant',
            selector: row => row.amount + 'FCFA',
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.created_at,
            sortable: true,
        },
        {
            name: 'Noms & Prénoms',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Operations',
            selector: row => 
                <div className="flex flex-row"> 
                    <FaEdit className="cursor-pointer mr-2" size={25} onClick={() => showModalUpdate(row.id, row.amount, row.title, row.name)} />
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

    const save = () => {

        setLoading(true);

        const data = {
            name: name,
            amount: amount,
            inscription_id: id
        }

        create('/api/v1/transactions', data)
        .then((response) => {
            setLoading(false);
            setState([
                response.data.data,
                ...state
            ])
            toast('Ajout réussi')
            setShowModal(false)
        })
        .catch(error => {
            setErrors(Object.values(error.response.data.errors).flat())
        })
    }

    return (

        <AppLayout>

            <Head>
                <title>Scolarships - Historique de Transactions</title>
            </Head>

            <div className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg px-10">
                        <div className="">

                            <DataTable
                                title={<TitleComponent title="Historique de transactions" setAmount={setAmount} setName={setName} setSurname={setSurname} setShowModal={setShowModal} surname={surname} />}
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

            <ModalPay 
                open={showModal} 
                setOpen={setShowModal} 
                title="Historique de transactions"
                loading={loading}
                setLoading={setLoading}
                state={state}
                setPending={setPending}
                update={update}
                setState={setState}
                name={name}
                setName={setName}
                amount={amount}
                setAmount={setAmount}
                surname={surname}
                id={slug}
                errors={errors}
                setErrors={setErrors}
                save={save}
                edit={edit}
            />

        </AppLayout>
    )
}

export default Student