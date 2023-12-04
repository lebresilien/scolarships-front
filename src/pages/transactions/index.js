import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import DataTable from 'react-data-table-component'
import FilterComponent from '@/components/FilterComponent'
import { useState, useEffect, useMemo } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Button from '@/components/Button'
import Label from '@/components/Label'
import Select from 'react-select'
import Input from '@/components/Input'

const customStyles = {
    headCells: {
        style: {
            fontWeight: 'bolder',
        },
    },
}

const Transaction = () => {
    const [sections, setSections] = useState([])
    const [groups, setGroups] = useState([])
    const [classrooms, setClassrooms] = useState([])
    const [data, setData] = useState([])
    const [amount, setAmount] = useState('')
    const [classroom_id, setClassroom_id] = useState('')
    const [pending, setPending] = useState(false)
    const [loading, setLoading] = useState(false)
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

    const filteredItems = data?.length > 0 &&  data.filter(
        item => (item && item.name) && item.name.toLowerCase().includes(filterText.toLowerCase()),
    )

    const { index, indexWithParams } = useUser({
        middleware: 'auth',
    })

    useEffect(() => {
        index('/api/v1/sections').then(res => {
            let arr = []
            res.data.state.map(section => {
                arr.push({
                    label: section.name,
                    value: section.id,
                })
            })
            setSections(arr)
        })
    }, [])

    const handleChange = newValue => {
        index(`/api/v1/sections/${newValue.value}`).then(res => {
            setGroups(res.data.data.data)
        })
    }

    const handleChangeGroup = newValue => {
        index(`/api/v1/groups/${newValue.value}`).then(res => {
            setClassrooms(res.data.data.data)
        })
    }

    const handleChangeClassroom = newValue => {
        setClassroom_id(newValue.value)
    }

    const search = () => {
        setPending(true)
        setLoading(true)
        const params = { amount: amount }
        indexWithParams(`/api/v1/transactions/listing/${classroom_id}`, params)
        .then(res => {
            setData(res.data.data)
            setLoading(false)
            setPending(false)
        })
    }

    const columns = [
        {
            name: 'Noms & Prénoms',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Montant',
            selector: row => row.amount + ' FCFA',
            sortable: true,
        },
       
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
                <title>Scolarships - Historique de Transactions</title>
            </Head>

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg px-10">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-1/2">
                                <div className="mb-3">
                                    <Label htmlFor="description">
                                        Selectionner la section{' '}
                                    </Label>
                                    <div>
                                        <Select
                                            options={sections}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {groups.length > 0 && (
                                    <div className="mb-3">
                                        <Label htmlFor="description">
                                            Selectionner le groupe{' '}
                                        </Label>
                                        <div>
                                            <Select
                                                options={groups}
                                                onChange={handleChangeGroup}
                                            />
                                        </div>
                                    </div>
                                )}

                                {classrooms.length > 0 && (
                                    <div className="mb-3">
                                        <Label htmlFor="description">
                                            Selectionner la salle de classe{' '}
                                        </Label>
                                        <div>
                                            <Select
                                                options={classrooms}
                                                onChange={handleChangeClassroom}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="col-span-6 sm:col-span-3 mb-3">
                                    <Label
                                        htmlFor="amount"
                                        className="block text-sm font-medium text-gray-700">
                                        Montant Rechercher
                                    </Label>
                                    <Input
                                        required
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        onChange={e =>
                                            setAmount(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="my-5 space-x-2 sm:flex sm:flex-row justify-end">
                                    <Button
                                        type="button"
                                        onClick={search}
                                        disabled={loading}>
                                        {!loading
                                            ? 'Rechercher'
                                            : 'Recherche en cours...'}
                                    </Button>
                                </div>
                            </div>

                            <div className="w-full">                                           
                                {data?.length > 0 && ((
                                    <DataTable
                                        title={"Historique de Paiement"}
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
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Transaction
