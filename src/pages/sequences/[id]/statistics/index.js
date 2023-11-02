import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Statistic from '@/components/Statistic'
import LoadingScreen from '@/components/LoadingScreen'

const Statistics = () => {

    const [statistics, setStatistics] = useState([])
    const [pending, setPending] = useState(false)
    const [title, setTitle] = useState('')
    const router = useRouter()
    const { id } = router.query

    const { getSequenceSectionStats } = useUser({
        middleware: 'auth',
    })

     useEffect(() => {

        id && getSequenceSectionStats({ id, setStatistics, setPending, setTitle})

    }, [id]);  
    
    return (

        <>
            {pending ?

                <AppLayout>

                    <Head>
                        <title>Scolarships - Statistiques</title>
                    </Head>

                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">
                            Statistiques { title }
                        </h3>
                    </div>

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="py-6 border-b border-gray-200">

                                    <div className='grid grid-cols-1 mx-3 md:mx-2 md:grid-cols-2 gap-8 sm:gap-6 '>
                                        
                                        {statistics?.map((statistic, index) => (
                                            statistic.data && (
                                                <Statistic
                                                    key={index}
                                                    title={statistic.name}
                                                    success={statistic.data.success_percent ? statistic.data.success_percent : 'Ras'}
                                                    average={statistic.data.average_note ? statistic.data.average_note : 'Ras'}
                                                    higher={statistic.data.max ? statistic.data.max.note : 'Ras'}
                                                    lower={statistic.data.min ? statistic.data.min.note : 'Ras'}
                                                    first={statistic.data.max ? statistic.data.max.name : 'Ras'}
                                                    last={statistic.data.min ? statistic.data.min.name : 'Ras'}
                                                    link={statistic.data.min ? `/sequences/${slug}/sections/${statistic.id}/statistics`: 'Ras'}
                                                />
                                            )
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

export default Statistics;