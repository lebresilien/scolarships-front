import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import FilterComponent from '@/components/FilterComponent'
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

const type = 'absents'

const Absent = () => {

    const [state, setState] = useState([])
    const [pending, setPending] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [hour, setHour] = useState('')
    const [day, setDay] = useState('')
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
		item => item.day && item.day.toLowerCase().includes(filterText.toLowerCase()),
	)

    const router = useRouter()
    const { id } = router.query;

    const { index, create, edit, remove } = useUser({
        middleware: 'auth',
    })

    useEffect(() => { 

        id && ((
            index('/api/v1/policies/'+id+'/absents')
            .then(res => {
                setPending(false)
                setState(res.data.state)
               setSurname(res.data.surname)
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

    const showModalUpdate = (id, day, hour) => {
        setUpdate(true)
        setShowModal(true)
        setId(id)
        setDay(day)
        setHour(hour)
        setSurname(surname)
    }

    const columns = [
        {
            name: 'Date',
            selector: row => row.day,
            sortable: true,
        },
        {
            name: 'Nombre d\'heures',
            selector: row => row.hour,
            sortable: true,
        },
        {
            name: 'Operations',
            selector: row => 
                <div className="flex flex-row"> 
                    <FaEdit className="cursor-pointer mr-2" size={25} onClick={() => showModalUpdate(row.id, row.day, row.hour)} />
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
            day: day,
            hour: hour,
            inscription_id: id
        }

        create('/api/v1/absents', data)
        .then((response) => {
            setLoading(false);
            setState([
                response.data.data,
                ...state
            ])
            toast('Ajout réussi')
        })
        .catch(error => {
            setErrors(Object.values(error.response.data.errors).flat())
        })
        setShowModal(false)
    }

    return (

        <AppLayout>

            <Head>
                <title>Scolarships - Historique des absences</title>
            </Head>

            <div className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg px-10">
                        <div className="">

                            <DataTable
                                title={<TitleComponent title="Historique d'absences" setShowModal={setShowModal} setHour={setHour} setDay={setDay} />}
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
                hour={hour}
                setHour={setHour}
                day={day}
                setDay={setDay}
                surname={surname}
                id={slug}
                errors={errors}
                setErrors={setErrors}
                save={save}
                edit={edit}
                type={type}
            />

        </AppLayout>
    )
}

export default Absent