import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Modal from '@/components/Modal'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUser } from '@/hooks/user'
import ContentLoader from 'react-content-loader'
import { useSelector } from 'react-redux'
import ChartOne from '@/components/ChartOne'
import ChartTwo from '@/components/ChartTwo'
import Card from '@/components/Card'

const Dashboard = (props) => {

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')
    const [showModalForm, setShowModalForm] = useState(false)
    const [data, setData] = useState({})
   

    const OnModalUser = () => {
        setText('Envoyer une invitation')
        setOpen(true)
    }

    const { getPrimaryStatistics  } = useUser({
        middleware: 'auth',
    })

    const user = useSelector((state) => state.userReducer.user)

    useEffect(() => {
        getPrimaryStatistics({ setData, setLoading })
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
                    <div className="max-w-7xl mx-auto">
                        <div className="overflow-hidden sm:rounded-lg">
                            {/* {user?.name == "Doe" && (( */}
                            
                                {!loading ?

                                    <div className="">

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 p-4">
                                            
                                            <Card title="Sections" value={data?.sections} />
                                            <Card title="Batiments" value={data?.buildings} />
                                            <Card title="Groupes" value={data?.groups} />
                                            <Card title="Salles" value={data?.classrooms} />
                                            <Card title="Apprenants" value={data?.students} />
                                            <Card title="Moratoires en cours" value={data?.users} />
                                            <Card title="Utilisateurs" value={data?.users} />
                                            
                                        </div>

                                        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                                            <ChartOne months={data?.transactions?.months} values={data?.transactions?.values} />
                                            <ChartTwo days={data?.transactions?.days} values={data?.transactions?.day_values}/> 
                                        </div>

                                    </div>:

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
                                
                           {/*  ))} */}
                        </div>
                    </div>
                </div>
                
               
            </AppLayout>
    )
} 


export default Dashboard
