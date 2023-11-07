import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import LoadingScreen from '@/components/LoadingScreen'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/user'
import Card from '@/components/Card'
import AuthValidationErrors from '@/components/AuthValidationErrors'

const type = 'students'

const StudentProfile = () => {

    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState({})
    const [errors, setErrors] = useState([])

    const router = useRouter()
    const { id } = router.query
    
    const { show } = useUser({
        middleware: 'auth',
    })

    useEffect(() => {
        id && show({ id, setValue, setLoading, type, setErrors })
    }, [id])

    return (

        <>
            {!loading ?
                <AppLayout>

                    <Head>
                        <title>Scolarships - Apprenants - Details</title>
                    </Head>

                    <div className="py-8">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            
                            <h1 className="mb-10 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl">Details Apprenant</h1>
                            
                            <AuthValidationErrors className="mb-4 mt-5 text-center" errors={errors} />

                            <div className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-y-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm leading-6">

                                <Card title={'Matricule'} value={value?.matricule} />
                                <Card title={'Nom'} value={value?.fname} />
                                <Card title={'Prenom'} value={value?.lname} /> 
                                <Card title={'Sexe'} value={value?.sexe == "M" ? "Masculin" : "Feminin"} />
                                <Card title={'Date de Naissance'} value={value?.born_at} />
                                <Card title={'Lieu de Naissance'} value={value?.born_place} />
                                <Card title={'Etablissement de Provenance'} value={value?.comming} />
                                <Card title={'Quartier'} value={value?.quarter} />
                                <Card title={'Date d\'Inscription'} value={value?.created_at} />
                                <Card title={'Nom du Père'} value={value?.father_name} />
                                <Card title={'Contact du Père'} value={value?.fphone} />
                                <Card title={'Nom de la Mère'} value={value?.mother_name} />
                                <Card title={'Contact de la mère '} value={value?.mphone} />
                                <Card title={'Details sur l\'Apprenants'} value={value?.allergy} />

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

export default StudentProfile