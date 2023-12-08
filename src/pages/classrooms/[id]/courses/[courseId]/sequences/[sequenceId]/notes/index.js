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

    const [data, setData] = useState({
        status: null,
        sequence: '',
        classroom: '',
        course: '',
        students: [{name: '', id: '', value: ''}]
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [pending, setPending] = useState(false)

    const { showClassroomStudents, addNote } = useUser({
        middleware: 'auth'
    })

    const router = useRouter()
    const { id, courseId, sequenceId } = router.query

    useEffect(() => { 

        (id && courseId && sequenceId) && showClassroomStudents({ id, courseId, sequenceId, setLoading, setData, setErrors })

    }, [id, courseId, sequenceId]);

    const handleFormChange = (index, event) => {
        let updatedStudents = [...data.students];
        updatedStudents[index][event.target.name] = event.target.value;
        setData({ ...data, students: updatedStudents });
    }

    const submitForm = (e) => {
        e.preventDefault()
        const students = data.students
        addNote({ setErrors, setPending, id, courseId, sequenceId, students })
    }


    return (

        <>
        
            {!loading ?

                <AppLayout>

                    <Head>
                        <title>Scolarships - Notes</title>
                    </Head>

                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-xl text-gray-900 leading-10">
                            Notes Classe: { data?.classroom } Matiere: { data?.course } Sequence: { data?.sequence }
                        </h3>
                        <AuthValidationErrors className="" errors={errors} />
                    </div>

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                
                                <div className="flex flex-col text-center">

                                    {!data?.status &&
                                        <div
                                            className="mb-5 rounded-lg bg-red-100 px-6 py-5 text-base text-red-700"
                                            role="alert">
                                            La sequence a été desactivée.Impossible de modifier les notes
                                        </div>
                                    }

                                    <form onSubmit={submitForm}>
                                        <div className="flex mx-3 sm:mx-0 overflow-x-auto justify-center">
                                            <table class="w-full sm:w-2/3 text-sm text-left text-gray-500">
                                                
                                                <thead className="text-xs font-bold text-gray-700 uppercase bg-gray-50">
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

                                                    {data?.students.map((student, index) => (
                                                        <tr className="bg-white border-b" key={student.id}>
                                                            <td className="px-6 py-4">
                                                                { student.name }
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                <Input
                                                                    disabled={!data?.status}
                                                                    id={student.id}
                                                                    type="number"
                                                                    className="block mt-1 w-full"
                                                                    required
                                                                    min={0}
                                                                    max={20}
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
                                            <Button type='submit' disabled={!data.status}>
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