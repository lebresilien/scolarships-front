import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import LoadingScreen from '@/components/LoadingScreen'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Textarea from '@/components/Textarea'
import Label from '@/components/Label'
import avatar_girl from '@/assets/images/avataaars-girl.png'
import avatar from '@/assets/images/avataaars.png'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/user'
import Link from 'next/link'

const StudentProfile = () => {

    const [loading, setLoading] = useState(false)
    const [student, setStudent] = useState({})
    const [classrooms, setClassrooms] = useState([])
    const [defaultValue, setDefaultValue] = useState({})
    const [errors, setErrors] = useState([])
    const [pending, setPending] = useState(false)

    const router = useRouter()
    const { id } = router.query
    
    const { show } = useUser({
        middleware: 'auth',
    })

    
    return (

        <>
            {!loading ?
                <AppLayout>

                    <Head>
                        <title>Scolarships - Apprenants - Details</title>
                    </Head>

                    <div className="py-8">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm leading-6">

                                <div className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                                    <div className="hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm">
                                    <dl class="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                                        <div>
                                            <dt class="sr-only">Nom</dt>
                                            <dd class="group-hover:text-white font-semibold text-slate-900">
                                                Tapondjou
                                            </dd>
                                        </div>
                                        <div>
                                            <dt class="sr-only">Category</dt>
                                            <dd class="group-hover:text-blue-200">tt</dd>
                                        </div>
                                        </dl>
                                    </div>
                                </div>

                                <div className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                                    <div className="hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm">
                                    <dl class="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                                        <div>
                                            <dt class="sr-only">Prenom</dt>
                                            <dd class="group-hover:text-white font-semibold text-slate-900">
                                                Tapondjou
                                            </dd>
                                        </div>
                                        <div>
                                            <dt class="sr-only">Category</dt>
                                            <dd class="group-hover:text-blue-200">tt</dd>
                                        </div>
                                        </dl>
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

export default StudentProfile