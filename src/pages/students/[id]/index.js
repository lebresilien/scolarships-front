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
import Select from 'react-select'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/user'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'

const StudentProfile = () => {

    const [loading, setLoading] = useState(true)
    const [student, setStudent] = useState({})
    const [classrooms, setClassrooms] = useState([])
    const [defaultValue, setDefaultValue] = useState({})
    const [errors, setErrors] = useState([])
    const [pending, setPending] = useState(false)

    const router = useRouter()
    const { slug } = router.query
    
    const { showStudent, updateStudent } = useUser({
        middleware: 'auth',
    })
    
    let options = []

    if(classrooms.length != 0 ) {

        classrooms.map((classroom) => {
            const temp = { value: classroom.id, label: classroom.name}
            options.push(temp)
        })

    }


    useEffect(() => {

        showStudent({ slug, setStudent, setLoading, setClassrooms, setDefaultValue })

    }, [slug]); 

    const handleInputChange = (newValue) => {
        setStudent({
            ...student,
            classroom_id: newValue.value
        })
    }

    const onChangeHandler = (e) => {

        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value
        })
        
    }

    const submitForm = event => {

        event.preventDefault()
        
        updateStudent({student, setErrors, setPending})
    }
    
    return (

        <>
            {!loading ?
                <AppLayout>

                    <Head>
                        <title>Scolarships - Eleves - Details</title>
                    </Head>

                    <div className="py-8">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow-sm sm:rounded-lg">

                                {student ? 

                                    <div className="py-3 sm-px-0 px-2 border-b border-gray-200">

                                        <nav className="bg-grey-light rounded-md w-full">
                                            <ol className="list-reset flex">
                                                <li>
                                                    <Link href="/inscription">
                                                        <a className="text-gray-800 hover:text-gray-900">Inscription</a>
                                                    </Link>
                                                </li>
                                                <li><span className="text-gray-800 mx-2">{'>'}</span></li>
                                                <li className="text-gray-800">{slug}</li>
                                            </ol>
                                        </nav>

                                        <AuthValidationErrors className="mb-4 mt-5" errors={errors} />

                                        <form onSubmit={submitForm} className="my-4">

                                            <div className="grid grid-cols-1 gap-12">

                                                <div className="flex flex-row items-center border-b sm:pb-3">
                                                    
                                                    <div className="flex flex-col w-1/2">
                                                        <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">Photo</h3>
                                                        <span className="text-sm text-gray-400 tracking-wide leading-10">Cette image vous ne pouvez pas la modifier</span>
                                                    </div>

                                                    <div className="w-1/2">
                                                        <Image 
                                                            src={student.sexe === "M" ? avatar : avatar_girl} 
                                                            priority={true}
                                                            className="rounded-full"
                                                            width={150}
                                                            height={150}
                                                        />
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 gap-12">

                                                <div className="flex sm:flex-row flex-col items-center mt-8">
                                                    
                                                    <div className="flex flex-col sm:w-1/2 w-full">
                                                        <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">Informations principale</h3>
                                                        <span className="text-sm text-gray-400 tracking-wide leading-10">Inforamtions de base sur l'eleve</span>
                                                    </div>

                                                    <div className="sm:w-1/2 w-full">
                                                        <div className="flex sm:flex-row flex-col">
                                                            
                                                            <div className="sm:w-2/3 w-full">
                                                                <div>
                                                                    <Label htmlFor="fname" className="block text-sm font-medium text-gray-700">
                                                                        Noms
                                                                    </Label>
                                                                    <div className="mt-1">
                                                                        <Input 
                                                                            id="fname"
                                                                            onChange={onChangeHandler}
                                                                            value={student.fname}
                                                                            type="text"
                                                                            name="fname"
                                                                            className="bg-gray-100"
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <p className="mt-2 text-sm text-gray-500">
                                                                        Entrez le nom de l'eleve.
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="sm:w-1/3 w-full">

                                                                <div className="sm:pl-4">
                                                                    <Label htmlFor="matricule" className="block text-sm font-medium text-gray-700">
                                                                        Matricule
                                                                    </Label>
                                                                
                                                                    <div className="mt-1">
                                                                        <Input 
                                                                            id="matricule"
                                                                            value={student.matricule}
                                                                            type="text"
                                                                            name="matricule"
                                                                            className="bg-gray-100 cursor-not-allowed"
                                                                            disabled
                                                                        />
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 gap-12">
                                                
                                                <div className="flex sm:flex-row flex-col items-center sm:pb-3 mt-8">
                                                    
                                                    <div className="sm:flex sm:flex-col sm:w-1/2 hidden">
                                                    
                                                    </div>

                                                    <div className="flex flex-col sm:w-1/2 w-full">
                                                        <div>
                                                            <Label htmlFor="lname" className="block text-sm font-medium text-gray-700">
                                                                Prenom(s)
                                                            </Label>
                                                            <div className="mt-1">
                                                                <Input 
                                                                    id="lname"
                                                                    onChange={onChangeHandler}
                                                                    value={student.lname}
                                                                    type="text"
                                                                    name="lname"
                                                                    className="bg-gray-100"
                                                                />
                                                            </div>
                                                            <p className="mt-2 text-sm text-gray-500">
                                                                Entrez le prenom de l'eleve.
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 gap-12">
                                                
                                                <div className="flex sm:flex-row flex-col items-center sm:pb-3 mt-8">
                                                    
                                                    <div className="sm:flex sm:flex-col sm:w-1/2 hidden">
                                                    
                                                    </div>

                                                    <div className="flex flex-col sm:w-1/2 w-full">
                                                        <div className="flex flex-row">

                                                            <Label htmlFor="sexe" className="block text-sm font-medium text-gray-700">
                                                                Sexe
                                                            </Label>

                                                            <div className="flex items-center ml-2">
                                                                <input 
                                                                    id="man"
                                                                    onChange={onChangeHandler}
                                                                    type="radio"
                                                                    name="sexe"
                                                                    value="M"
                                                                    checked={student.sexe === "M" ? true : false}
                                                                />
                                                                <Label htmlFor="man" className="ml-2 block text-sm font-medium text-gray-700">
                                                                    Masculin
                                                                </Label>
                                                            </div>

                                                            <div className="flex items-center ml-2">
                                                                <input 
                                                                    id="woman"
                                                                    onChange={onChangeHandler}
                                                                    type="radio"
                                                                    name="sexe"
                                                                    value="F"
                                                                    checked={student.sexe === "F" ? true : false}
                                                                />
                                                                <Label htmlFor="woman" className="ml-2 block text-sm font-medium text-gray-700">
                                                                            Feminin
                                                                </Label>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 gap-12">
                                                
                                                <div className="flex sm:flex-row flex-col items-center sm:pb-3 mt-8">
                                                    
                                                    <div className="sm:flex sm:flex-col sm:w-1/2 hidden">
                                                    
                                                    </div>

                                                    <div className="flex sm:flex-row flex-cols sm:w-1/2 w-full">
                                                        
                                                        <div className="sm:w-1/2 w-full">
                                                            <div>
                                                                <Label htmlFor="bornAt" className="block text-sm font-medium text-gray-700">
                                                                    Né le
                                                                </Label>
                                                                <div className="mt-1">
                                                                    <Input 
                                                                        id="bornAt"
                                                                        onChange={onChangeHandler}
                                                                        value={student.born_at}
                                                                        type="date"
                                                                        name="born_at"
                                                                        className="bg-gray-100"
                                                                        required
                                                                    />
                                                                </div>
                                                                <p className="mt-2 text-sm text-gray-500">
                                                                    Entrez le date de naissance.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="sm:w-1/2 w-full">
                                                            <div className="sm:pl-4">
                                                                <Label htmlFor="bornPlace" className="block text-sm font-medium text-gray-700">
                                                                    A
                                                                </Label>
                                                                
                                                                <div className="mt-1">
                                                                    <Input 
                                                                        id="bornPlace"
                                                                        onChange={onChangeHandler}
                                                                        value={student.born_place}
                                                                        type="text"
                                                                        name="born_place"
                                                                        className="bg-gray-100"
                                                                        required
                                                                    />
                                                                    <p className="mt-2 text-sm text-gray-500">
                                                                        Entrez le lieu de naissance.
                                                                    </p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 gap-12">
                                                
                                                <div className="flex sm:flex-row flex-col items-center sm:pb-3 mt-8">
                                                    
                                                    <div className="sm:flex sm:flex-col sm:w-1/2 hidden">
                                                    
                                                    </div>

                                                    <div className="flex flex-col sm:w-1/2 w-full">
                                                        <div>
                                                            <Label htmlFor="quarter" className="block text-sm font-medium text-gray-700">
                                                                Zone de residence
                                                            </Label>
                                                            <div className="mt-1">
                                                                <Input 
                                                                    id="quarter"
                                                                    onChange={onChangeHandler}
                                                                    value={student.quarter}
                                                                    type="text"
                                                                    name="quarter"
                                                                    className="bg-gray-100"
                                                                    required
                                                                />
                                                            </div>
                                                            <p className="mt-2 text-sm text-gray-500">
                                                                Entrez le quartier où vit l'eleve.
                                                            </p>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 gap-12">
                                                
                                                <div className="flex sm:flex-row flex-col items-center sm:pb-3 mt-8">
                                                    
                                                    <div className="sm:flex sm:flex-col sm:w-1/2 hidden">
                                                    
                                                    </div>

                                                    <div className="flex flex-col sm:w-1/2 w-full">
                                                        <div>
                                                            <Label htmlFor="allergy" className="block text-sm font-medium text-gray-700">
                                                                Allergies
                                                            </Label>
                                                            <div className="mt-1">
                                                                <Textarea 
                                                                    id="allergy"
                                                                    onChange={onChangeHandler}
                                                                    name="allergy"
                                                                    className="bg-gray-100"
                                                                    value={student.allergy}
                                                                />
                                                            </div>
                                                            <p className="mt-2 text-sm text-gray-500">
                                                                Entrez les informations relatives à son etat de santé.
                                                            </p>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 gap-12">
                                                
                                                <div className="flex sm:flex-row flex-col items-center sm:pb-3 mt-8">
                                                    
                                                    <div className="sm:flex sm:flex-col sm:w-1/2 hidden">
                                                    
                                                    </div>

                                                    <div className="flex sm:flex-row flex-cols sm:w-1/2 w-full">
                                                        
                                                        <div className="sm:w-1/2 w-full">
                                                            <div>
                                                                <Label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
                                                                    Nom du pere
                                                                </Label>
                                                                <div className="mt-1">
                                                                    <Input 
                                                                        id="fatherName"
                                                                        onChange={onChangeHandler}
                                                                        type="text"
                                                                        name="father_name"
                                                                        className="bg-gray-100"
                                                                        value={student.father_name}
                                                                    />
                                                                </div>
                                                                <p className="mt-2 text-sm text-gray-500">
                                                                    Entrez le nom du pere ou tuteur.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="sm:w-1/2 w-full">
                                                            <div className="sm:pl-4">
                                                                <Label htmlFor="fPhone" className="block text-sm font-medium text-gray-700">
                                                                    Telephone
                                                                </Label>
                                                                
                                                                <div className="mt-1">
                                                                    <Input 
                                                                        id="fPhone"
                                                                        onChange={onChangeHandler}
                                                                        type="text"
                                                                        name="fphone"
                                                                        className="bg-gray-100"
                                                                        value={student.fphone}
                                                                    />
                                                                    <p className="mt-2 text-sm text-gray-500">
                                                                        Entrez son numéro de téléphone.
                                                                    </p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>


                                            <div className="grid grid-cols-1 gap-12">
                                                
                                                <div className="flex sm:flex-row flex-col items-center sm:pb-3 mt-8">
                                                    
                                                    <div className="sm:flex sm:flex-col sm:w-1/2 hidden">
                                                    
                                                    </div>

                                                    <div className="flex sm:flex-row flex-cols sm:w-1/2 w-full">
                                                        
                                                        <div className="sm:w-1/2 w-full">
                                                            <div>
                                                                <Label htmlFor="motherName" className="block text-sm font-medium text-gray-700">
                                                                    Nom de la mere
                                                                </Label>
                                                                <div className="mt-1">
                                                                    <Input 
                                                                        id="motherName"
                                                                        onChange={onChangeHandler}
                                                                        type="text"
                                                                        name="mother_name"
                                                                        className="bg-gray-100"
                                                                        value={student.mother_name}
                                                                        required
                                                                    />
                                                                </div>
                                                                <p className="mt-2 text-sm text-gray-500">
                                                                    Entrez le nom de la mere ou tutrice.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="sm:w-1/2 w-full">
                                                            <div className="sm:pl-4">
                                                                <Label htmlFor="mPhone" className="block text-sm font-medium text-gray-700">
                                                                    Telephone
                                                                </Label>
                                                                
                                                                <div className="mt-1">
                                                                    <Input 
                                                                        id="mPhone"
                                                                        onChange={onChangeHandler}
                                                                        type="text"
                                                                        name="mphone"
                                                                        className="bg-gray-100"
                                                                        value={student.mphone}
                                                                        required
                                                                    />
                                                                    <p className="mt-2 text-sm text-gray-500">
                                                                        Entrez son  numéro de téléphone.
                                                                    </p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 gap-12">
                                                
                                                <div className="flex sm:flex-row flex-col items-center sm:pb-3 mt-8 border-b">
                                                    
                                                    <div className="sm:flex sm:flex-col sm:w-1/2 hidden">
                                                    
                                                    </div>

                                                    <div className="flex flex-col sm:w-1/2 w-full">
                                                        <div>
                                                            <Label htmlFor="classroom_id" className="block text-sm font-medium text-gray-700">
                                                                Salle de classe
                                                            </Label>
                                                            
                                                                <select 
                                                                    id="classroom_id"
                                                                    options={options} 
                                                                    className="mt-1 w-full bg-gray-100 " 
                                                                    onChange={onChangeHandler} 
                                                                    name="classroom_id" 
                                                                   /* defaultValue={defaultValue} */
                                                                    required
                                                                >
                                                                    {classrooms.map((classroom) => (
                                                                        <option value={classroom.id} selected={defaultValue.value == classroom.id ? true : false}>
                                                                            {classroom.name}
                                                                        </option>
                                                                    ))}
                                                                </select>

                                                            <p className="mt-2 text-sm text-gray-500">
                                                                Selectionnez la salle de classe.
                                                            </p>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>

                                            <div className="grid grid-cols-1 gap-12">

                                                <div className="flex flex-row justify-end pb-10 mt-8">

                                                    <Button
                                                        disabled={pending ? true : false}
                                                    >
                                                        {!pending ? "Enregistrer les modifications" : "Enregistrement..."}
                                                    </Button>

                                                    <span>&nbsp;</span>

                                                    <Button
                                                        cancel="true"
                                                        className=""
                                                        onClick={() => router.push('/inscription')}
                                                    >
                                                        Annuler
                                                    </Button>
                                                </div>

                                            </div>

                                        </form>
                                    </div>

                                : 
                                    <div className="flex justify-center my-6">
                                        <p className="text-2xl font-bold text-gray-900 tracking-wide leading-10">
                                            Oups! <br/>
                                            Nous n'avons trouvé aucun élément
                                        </p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <ToastContainer position="bottom-left"/>
                </AppLayout>

                :

                <LoadingScreen />

            }
        </>
    )

}

export default StudentProfile