import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Modal from '@/components/Modal'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUser } from '@/hooks/user'
import PrimaryStatistic from '@/components/PrimaryStatistic'
import ContentLoader, { Facebook } from 'react-content-loader'
import { useSelector } from 'react-redux'

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
    const [units, setUnits] = useState([])

    const OnModalUser = () => {
        setText('Envoyer une invitation')
        setOpen(true)
    }

    const { getSection, getGroup, getBuilding, getPrimaryStatistics, getClassroomsWithGroups  } = useUser({
        middleware: 'auth',
    })

    const user = useSelector((state) => state.userReducer.user)

    useEffect(() => {
        //getSection({ setSections, setDefaultSection })
        //getBuilding({ setBuildings, setDefaultBuilding })
        //getGroup({ setGroups, setDefaultGroup })
        getPrimaryStatistics({ setData })
        //getClassroomsWithGroups({ setClassrooms, setLoading, setUnits })
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
                    <title>Scolarships - Dashboard</title>
                </Head>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="py-6 border-b border-gray-200">
                                {/* {user?.name == "Doe" && (( */}
                                <div className="grid sm:grid-cols-4 sm:gap-4 grid-cols-2 gap-6 my-1">
                                    {!loading ?
                                        data.map((item, index) => (
                                            <PrimaryStatistic 
                                                title={item.title}
                                                count={item.count}
                                                key={index}
                                            />
                                        )) :

                                        <div className="row">
                                            <div className="col-md-4">
                                                
                                                <ContentLoader 
                                                    viewBox="0 0 1360 900" 
                                                    height={900}
                                                    width={1360} 
                                                    {...props}
                                                    backgroundColor="white"
                                                    foregroundColor="#4338CA"
                                                >
                                                    <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="30" y="250" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="30" y="275" rx="0" ry="0" width="120" height="20" />
                                                    <rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="250" y="250" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="250" y="275" rx="0" ry="0" width="120" height="20" />
                                                    <rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="470" y="250" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="470" y="275" rx="0" ry="0" width="120" height="20" />
                                                    <rect x="690" y="20" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="690" y="250" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="690" y="275" rx="0" ry="0" width="120" height="20" />
                                                    <rect x="910" y="20" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="910" y="250" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="910" y="275" rx="0" ry="0" width="120" height="20" />
                                                    <rect x="1130" y="20" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="1130" y="250" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="1130" y="275" rx="0" ry="0" width="120" height="20" />
                                                    <rect x="30" y="340" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="30" y="570" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="30" y="595" rx="0" ry="0" width="120" height="20" />
                                                    <rect x="250" y="340" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="250" y="570" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="250" y="595" rx="0" ry="0" width="120" height="20" />
                                                    <rect x="470" y="340" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="470" y="570" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="470" y="595" rx="0" ry="0" width="120" height="20" />
                                                    <rect x="690" y="340" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="690" y="570" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="690" y="595" rx="0" ry="0" width="120" height="20" />
                                                    <rect x="910" y="340" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="910" y="570" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="910" y="595" rx="0" ry="0" width="120" height="20" />
                                                    <rect x="1130" y="340" rx="8" ry="8" width="200" height="200" />
                                                    <rect x="1130" y="570" rx="0" ry="0" width="200" height="18" />
                                                    <rect x="1130" y="595" rx="0" ry="0" width="120" height="20" />
                                                </ContentLoader>
                                            </div>
                                          
                                        </div>
                                    }
                                
                                </div>
                           {/*  ))} */}
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
               
            </AppLayout>
    )
} 


export default Dashboard
