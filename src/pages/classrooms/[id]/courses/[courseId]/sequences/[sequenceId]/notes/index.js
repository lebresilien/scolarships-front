import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useUser } from '@/hooks/user'
import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import LoadingScreen from '@/components/LoadingScreen'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Notes = () => {

    const [students, setStudents] = useState([
        {name: '', id: '', value: ''}
    ])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [pending, setPending] = useState(false)

    const { showClassroomStudents, addNote } = useUser({
        middleware: 'auth'
    })

    const router = useRouter()
    const { slug, id, sequenceId } = router.query

    useEffect(() => { 

        (slug && id && sequenceId) && showClassroomStudents({ slug, id, sequenceId, setLoading, setStudents, setErrors })

    }, [slug]);

    const handleFormChange = (index, event) => {
        let data = [...students];
        data[index][event.target.name] = event.target.value;
        setStudents(data)
    }

    const submitForm = (e) => {
        e.preventDefault()
        addNote({ setErrors, setPending, slug, id, sequenceId, students })
    }


    return (

        <>
        
            {!loading ?

                <AppLayout>

                    <Head>
                        <title>Scolarships - Salles</title>
                    </Head>

                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-xl leading-4 text-gray-900 leading-10">
                            Notes { slug } { sequenceId } matiere { id }
                        </h3>
                        <AuthValidationErrors className="" errors={errors} />
                    </div>

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow-sm sm:rounded-lg">
                                
                                <div className="py-6 border-b border-gray-200">

                                    <form onSubmit={submitForm}>
                                        <div class="flex mx-3 sm:mx-0 overflow-x-auto justify-center">
                                            <table class="w-full sm:w-2/3 text-sm text-left text-gray-500">
                                                
                                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                                    <tr>
                                                        <th scope="col" class="px-6 py-3">
                                                            Noms et Prénoms
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Note
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    {students?.map((student, index) => (
                                                        <tr class="bg-white border-b" key={student.id}>
                                                            <td class="px-6 py-4">
                                                                { student.name }
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <Input
                                                                    id={student.id}
                                                                    type="number"
                                                                    className="block mt-1 w-full"
                                                                    required
                                                                    min={0}
                                                                    name="value"
                                                                    value={student.value}
                                                                    onChange={event => handleFormChange(index, event)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>

                                            </table>
                                            
                                        </div>

                                        <div className='flex mt-3 justify-center md:justify-end md:mx-3'>
                                            <Button type='submit'>
                                                {pending ? 'Enregistrement...' : 'Enregistrer'} 
                                            </Button>
                                        </div>
                                    </form>

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

export default Notes;