import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import LoadingScreen from '@/components/LoadingScreen'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/user'
import Block from '@/components/Block'
import AuthValidationErrors from '@/components/AuthValidationErrors'

const classroom = () => {

    const [loading, setLoading] = useState(true)
    const [classroom, setClassroom] = useState({})
    const [errors, setErrors] = useState([])

    const router = useRouter()
    const { slug } = router.query

    const { showClassroom } = useUser({
        middleware: 'auth',
    })

    useEffect(() => {

        slug && showClassroom({ slug, setLoading, setClassroom, setErrors })

    }, [slug]); 

    return (

        <>
            {!loading ?
                
                <AppLayout>

                    <Head>
                        <title>Scolarships - classe - Details</title>
                    </Head>

                    

                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">
                            Fiche de la salle {slug}
                        </h3>
                        <AuthValidationErrors className="" errors={errors} />
                    </div>

                    <div className="py-8">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow-sm sm:rounded-lg">

                                <div className="py-3 sm-px-0 px-2 border-b border-gray-200">

                                    <div className="grid sm:grid-cols-1 sm:gap-6 grid-cols-1 gap-6">
                                        
                                        <Block classroom={classroom} />

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

export default classroom