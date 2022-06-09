import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import ModalForm from '@/components/ModalForm'
import Modal from '@/components/Modal'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUser } from '@/hooks/user'
import PrimaryStatistic from '@/components/PrimaryStatistic'

const Dashboard = (props) => {

    const [sections, setSections] = useState([])
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [classrooms, setClassrooms] = useState([])
    const [groups, setGroups] = useState([])
    const [buildings, setBuildings] = useState([])
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')
    const [showModalForm, setShowModalForm] = useState(false)
    const [data, setData] = useState([])
    const [defaultSection, setDefaultSection] = useState('')
    const [defaultGroup, setDefaultGroup] = useState('')
    const [defaultBuilding, setDefaultBuilding] = useState('')

    const OnModalUser = () => {
        setText('Envoyer une invitation')
        setOpen(true)
    }

    const { getSection, getGroup, getBuilding, getPrimaryStatistics, getClassroomsWithGroups  } = useUser({
        middleware: 'auth',
    })

    const addClassroom = (e) => {
        e.preventDefault()
        alert(name)
    }

    useEffect(() => {
        getSection({ setSections, setDefaultSection })
        getBuilding({ setBuildings, setDefaultBuilding })
        getGroup({ setGroups, setDefaultGroup })
        getPrimaryStatistics({ setData })
        getClassroomsWithGroups({ setClassrooms })
    }, [])

    return (
        <AppLayout
            header={
                <div className="flex flex-row justify-between">
                    <div className="">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Dashboard
                        </h2>
                    </div>
                    <div className="flex flex-row justify-between">
                        <h2 
                            className="border-eee px-4 py-1 mr-2 font-semibold text-xl text-gray-600 leading-tight rounded-sm cursor-pointer"
                            onClick={() => setShowModalForm(true)}>
                            + contenu
                        </h2>
                        <h2 
                            className="bg-blue-400 hover:bg-blue-500 px-4 py-1 font-semibold text-xl text-white leading-tight rounded-sm cursor-pointer"
                            onClick={OnModalUser}>
                            + ajouter
                        </h2>
                    </div>
                </div>
            }>

            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-6 border-b border-gray-200">
                            <div className="grid sm:grid-cols-4 sm:gap-4 grid-cols-2 gap-6 my-1">

                                { data.map((item, index) => (
                                    <PrimaryStatistic 
                                        title={item.title}
                                        count={item.count}
                                        key={index}
                                    />
                                ))}
                              
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Modal 
                open={open} 
                setOpen={setOpen} 
                text={text} 
                notify={toast}
            />
            <ModalForm 
                open={showModalForm} 
                setOpen={setShowModalForm} 
                notify={toast} 
                sections={sections} 
                setSections={setSections}
                groups={groups}
                setGroups={setGroups}
                buildings={buildings}
                setBuildings={setBuildings}
                defaultSection={defaultSection}
                defaultGroup={defaultGroup}
                defaultBuilding={defaultBuilding}
            />
        </AppLayout>
    )
} 


export default Dashboard
