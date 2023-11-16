import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import LoadingScreen from '@/components/LoadingScreen'
import Card from '@/components/Card'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const type = 'units'

const Show = () => {

    const [value, setValue] = useState([])
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const { show } = useUser({
        middleware: 'auth'
    })

    const router = useRouter()
    const {id} = router.query

    useEffect(() => { 
        id && show({ id, type, setLoading, setValue, setName, setErrors })
    }, [id]);

    return (

        <>
        
            {!loading ?

                <AppLayout>

                    <Head>
                        <title>Scolarships - Notes</title>
                    </Head>

                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-xl text-gray-900 leading-10">
                          {name}
                        </h3>
                        <AuthValidationErrors className="" errors={errors} />
                    </div>

                    <div className="py-6">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="overflow-hidden sm:rounded-lg">
                                <div className="px-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:mt-6 md:gap-6 py-5">
                                    {value?.map((course) => (
                                        <Card title={course.name} key={course.id} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <ToastContainer />
                
                </AppLayout>

                :

                <LoadingScreen />
            }

        </>
    )
}

export default Show;