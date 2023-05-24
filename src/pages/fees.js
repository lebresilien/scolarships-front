import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import React, { useState, useEffect, useRef } from 'react'
import Label from '@/components/Label'
import Select from 'react-select'
import Input from '@/components/Input'
import Button from '@/components/Button'

const Fees = () => {

    const[amount, setAmount] = useState("")
    const[groups, setGroups] = useState([])
    const[classrooms, setClassrooms] = useState([])
    const[defaultGroup, setDefaultGroup] = useState([])
    let options = []

    const { getGroup, showGroup } = useUser({
        middleware: 'auth',
    })

    useEffect(() => {
        getGroup({setGroups, setDefaultGroup})
    }, []);

    if(groups.length != 0 ) {

        groups.map((group) => {
            const item = { value: group.id, label: group.name}
            options.push(item)
        })

    } 

    const onChange = (newValue) => {
        const group_id = newValue.value
        showGroup({setClassrooms, group_id, classrooms}) 
    }

    const onChangeHandler = (newValue) => {
        console.log('classes', newValue.label)
    }

    return (

        <AppLayout>

            <Head>
                <title>Scolarships - Feeess</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="py-6 border-b border-gray-200">

                            <div className="grid sm:grid-cols-1 sm:gap-4 grid-cols-1 gap-4">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="md:flex md:items-center mb-6 md:w-1/2 w-full">
                                        <div className="md:w-1/3">
                                            <Label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                Selectionner le groupe
                                            </Label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <Select 
                                                options={options} 
                                                onChange={onChange}
                                             
                                            />
                                        </div>
                                    </div>

                                    <div className="md:flex md:items-center mb-6 md:w-1/2 w-full">
                                        <div className="md:w-1/3">
                                            <Label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                Selectionner la classe
                                            </Label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <Select 
                                                options={classrooms} 
                                                onChange={onChangeHandler}
                                              
                                            />
                                        </div>
                                    </div>

                                    <div className="md:flex md:items-center mb-6 md:w-1/2 w-full">
                                        <div className="md:w-1/3">
                                            <Label htmlFor="amount" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                Renseigner le montant
                                            </Label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <Input 
                                                type="number" 
                                                onChange={ () => setAmount(e.target.value)}
                                                id="amount"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>

        </AppLayout>
    )
}

export default Fees;