import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import LoadingScreen from '@/components/LoadingScreen'

const type = "buildings"
const Build = () => {

    const [value, setValue] = useState([])
    const [name, setName] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const { show } = useUser({
        middleware: 'auth'
    })

    const router = useRouter()
    const { id } = router.query

    useEffect(() => { 
        id && show({ id, setValue, setName, setLoading, type, setErrors })
    }, [id]); 


    return (

        <>
        
            {!loading ?

                <AppLayout>

                    <Head>
                        <title>Scolarships - Salles</title>
                    </Head>

                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-xl text-gray-900 leading-10">
                            Liste des salles {name}
                        </h3>
                        <AuthValidationErrors className="" errors={errors} />
                    </div>

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="overflow-hidden sm:rounded-lg">
                                <div className="">

                                    <div className='grid grid-cols-1 mx-3 md:mx-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                        {value?.map((classroom, index) => (
                                            <div key={index} className="flex flex-col justify-center mb-2 sm:mx-2 rounded-md border border-gray-200 bg-white p-5 md:p-10 transition-shadow duration-300 hover:shadow-lg">
                                                
                                                <dt className="mb-2 text-md font-extrabold">{ classroom.name }</dt>
                                                
                                                <dd className="text-gray-500">{ classroom.description }</dd>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                
                </AppLayout>

                :

                <LoadingScreen />
            }

        </>
    )
}

export default Build;