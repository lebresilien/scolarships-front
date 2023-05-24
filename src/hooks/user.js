import axios from '@/lib/axios'

import { toast } from 'react-toastify';

export const useUser = ({ middleware  } = {}) => {
    
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const sendInvitation = async ({ setErrors, setOpen, setLoading, ...props }) => {
        setLoading(true)
        await csrf()

        setErrors([])

        axios
            .post('/api/v1/invitation', props)
            .then(() => {
                toast('un lien d\'invitation a été envoyé à cette adresse email')
                setOpen(false)
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
        setLoading(false)
    }

    const updateProfile = async ({ setErrors, setLoading, ...props }) => {
        
        await csrf()

        setErrors([])

        axios
            .put('/api/v1/users', props)
            .then(() => {
                toast('profil mis à jour')
                setLoading(false)
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const addSection = async ({ setErrors, setName, setDescription, setLoading, setSections, content, ...props }) => {
        setLoading(true)
        await csrf()

        setErrors([])

        axios
            .post('/api/v1/'+content+'s', props)
            .then(() => {
                toast('Section rajoutée avec succés.')
                setName('')
                setDescription('')
                getSection({ setSections })
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
        setLoading(false)
    }

    const getSection = async ({ setSections, setDefaultSection }) => {
        await csrf()
        
        axios.get('/api/v1/sections')
         .then(res => {
            setSections(res.data)
            if(setDefaultSection) setDefaultSection(res.data[0].id)
         })
            
    }

    const addGroup = async ({ setErrors, setName, setDescription, setGroups, setLoading, ...props }) => {
        setLoading(true)
        await csrf()

        setErrors([])

        axios
            .post('/api/v1/groups', props)
            .then(() => {
                toast('Groupe rajouté avec succés.')
                setName('')
                setDescription('')
                getGroup({ setGroups })
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
        setLoading(false)
    }

    const getGroup = async ({ setGroups, setDefaultGroup }) => {
        await csrf()
      
        axios.get('/api/v1/groups')
         .then(res => {
          
            setGroups(res.data.data)
            if(setDefaultGroup) setDefaultGroup(res.data.data[0].id)
         })
            
    }

    const getAcademies = async ({ setAcademies, setPending }) => {
        //setPending(true)
        await csrf()
        
        axios.get('/api/v1/academies')
         .then(res => {
            setAcademies(res.data)
         })
        setPending(false)   
    }

    const addBuilding = async ({ setErrors,setName, setDescription, setBuildings, setLoading, ...props }) => {
        setLoading(true)
        await csrf()

        setErrors([])

        axios
            .post('/api/v1/buildings', props)
            .then(() => {
                toast('Batiment rajouté avec succés.')
                setName('')
                setDescription('')
                getBuilding({ setBuildings })
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
        setLoading(false)
    }

    const getBuilding = async ({ setBuildings, setDefaultBuilding }) => {
        await csrf()
        
        axios.get('/api/v1/buildings')
         .then(res => {
            setBuildings(res.data)
            if(setDefaultBuilding) setDefaultBuilding(res.data[0].id)
         })
            
    }

    const addClassroom = async ({ setErrors, setName, setDescription, setLoading, ...props }) => {
        setLoading(true)
        await csrf()

        setErrors([])

        axios
            .post('/api/v1/classrooms', props)
            .then(() => {
                toast('Classe rajoutée avec succés.')
                setName('')
                setDescription('')
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
        setLoading(false)
    }

    const getClassroom = async ({ setClassrooms, setClassroomValue }) => {
        await csrf()
        
        axios.get('/api/v1/classrooms')
         .then(res => {
            setClassrooms(res.data)
            if(setClassroomValue) setClassroomValue(res.data[0].id)
         })
            
    }

    const getClasse = async ({ setClassrooms, setPending }) => {
        await csrf()
        
        axios.get('/api/v1/classrooms')
         .then(res => {
            setClassrooms(res.data)
            setPending(false)
         })
            
    }

    const getPrimaryStatistics = async ({ setData }) => {
        await csrf()
        
        axios.get('/api/v1/primary-statistics')
         .then(res => setData(res.data))
            
    }

    const getClassroomsWithGroups = async ({ setClassrooms, setLoading, setUnits }) => {
        setLoading(true)
        await csrf()
        
        axios.get('/api/v1/groups_classrooms')
            .then(res => {
                setClassrooms(res.data.classrooms)
                setUnits(res.data.units)
            })

        setLoading(false)
            
    }

    const addCourse = async ({ setErrors, setLoading, setCourses, setPending, ...props }) => {

        setLoading(true)

        await csrf()

        setErrors([])

        axios
            .post('/api/v1/courses', props)
            .then((res) => {
                getCourses({ setCourses, setPending })
                toast('Matiere rajoutée avec succés.')
                //console.log(res)
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
            
        setLoading(false)
    }

    const addAcademy = async ({ setErrors, setLoading, setAcademies, academies, setActive, setName, ...props }) => {

        setLoading(true)

        await csrf()

        setErrors([])

        axios
            .post('/api/v1/academies', props)
            .then((res) => {
                const date = new Date()
                const newAcademy = {
                    id: parseInt(academies.slice(-1)[0].id + 1),
                    name: props.name,
                    slug: props.name,
                    created_at: date.getFullYear() + '-' + parseInt(date.getMonth() + 1 ) + '-' + date.getDate(),
                    status: 1
                }
                setActive(true)
                setAcademies([newAcademy].concat(academies))
                setName('')
                toast('L\'annné academique a été rajoutée avec succés.')
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
            
        setLoading(false)
    }

    const updateAcademy = async ({ setActive, onClose, setWaiting, setLoading, academies, setAcademies, ...props }) => {
        
        setWaiting(true)
        await csrf()
     
        axios
            .put('/api/v1/academies/'+props.academy_id)
            .then(() => {
                setActive(false)
                const index = academies.findIndex(item => item.id == props.academy_id)
                const academiesCopy = [...academies]
                academiesCopy[index] = {...academiesCopy[index], status: 0}
                setAcademies(academiesCopy)
                onClose()
            })
           
        setWaiting(false)  
    }

    const getStudents = async ({ setStudents, setPending }) => {

        setPending(true)
        await csrf()
        
        axios.get('/api/v1/students')
         .then(res => {
            setStudents(res.data)
        })

        setPending(false) 
    }

    const showStudent = async ({ slug, setStudent, setLoading, setClassrooms, setDefaultValue }) => {

        await csrf()
        
        axios.get('/api/v1/students/'+ slug)
         .then(res => {
            setStudent(res.data.student)
            setClassrooms(res.data.classrooms.original)
            let defaultOption = { 
                value: res.data.student.classrooms[0].id, 
                label: res.data.student.classrooms[0].name
            }
            setDefaultValue(defaultOption)
        })

        setLoading(false)
    }

    const addStudent = async ({ setErrors, setLoading, setOpen, setStudents, setPending, ...props }) => {
        setLoading(true)

        await csrf()

        setErrors([])

        axios
            .post('/api/v1/students', {
                lname: props.student.lname,
                fname: props.student.fname,
                born_at: props.student.born_at,
                born_place: props.student.born_place,
                quarter: props.student.quarter,
                allergy: props.student.allergy,
                father_name: props.student.father_name,
                fphone: props.student.fphone,
                mother_name: props.student.mother_name,
                mphone: props.student.mphone,
                classroom_id: props.student.classroom_id,
                amount: props.student.amount,
                sexe: props.student.sexe,
                type: props.student.type
            })
            .then(() => {
                setOpen(false)
                toast('Inscription reussie')
                getStudents({ setStudents, setPending })
            })
            .catch(error => {
                toast.error('Une erreur est survenue. Veuillez verifier')
                setErrors(Object.values(error.response.data.errors).flat())
            })
            
        setLoading(false)
    }


    const updateStudent = async ({ setErrors, setPending, ...props }) => {
        setPending(true)

        await csrf()

        setErrors([])

        axios
            .put('/api/v1/students/'+props.student.slug, {
                lname: props.student.lname,
                fname: props.student.fname,
                born_at: props.student.born_at,
                born_place: props.student.born_place,
                quarter: props.student.quarter,
                allergy: props.student.allergy,
                father_name: props.student.father_name,
                fphone: props.student.fphone,
                mother_name: props.student.mother_name,
                mphone: props.student.mphone,
                classroom_id: props.student.classroom_id,
                amount: props.student.amount,
                sexe: props.student.sexe,
            })
            .then(() => {
                toast('Modification reussie')
            })
            .catch(error => {
                toast.error('Une erreur est survenue. Veuillez verifier')
                setErrors(Object.values(error.response.data.errors).flat())
            })
            
        setPending(false)
    }

    const getCourses = async ({ setCourses, setPending }) => {
        await csrf()
        setPending(true)
        
        axios.get('/api/v1/courses')
         .then(res => {
            setCourses(res.data)
            console.log(res.data)
         })
         
         setPending(false) 
    }

    const showCourse = async ({ slug, setShowModal, setUpdate, setGroups, setName, setSlug, setValue }) => {
        
        await csrf()
        
        axios.get('/api/v1/courses/'+slug)
         .then(res => {

            let myArray = []
            res.data.groups.map((item) => (
                myArray.push(item.id)
            ))
            
            setName(res.data.name)
            setSlug(res.data.slug)
            setGroups(myArray)
            setUpdate(true)
            setShowModal(true)
            setValue({
                value: res.data.unit.id,
                label: res.data.unit.name
            })
            
        })
            
    }

    const updateCourse = async ({ setErrors, setLoading, setCourses, setPending, setOpen, ...props }) => {

        setLoading(true)

        await csrf()

        setErrors([])

        axios
            .put('/api/v1/courses/'+props.slug, props)
            .then(() => {
                getCourses({ setCourses, setPending })
                toast('Matiere modifiée avec succés.')
                setOpen(false)
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
            
        setLoading(false)
    }

    const addTransaction = async ({ setErrors, setLoading, setOpen, setName, setAmount, ...props }) => {
   
        setLoading(true)

        await csrf()

        setErrors([])

        axios
            .post('/api/v1/transactions', props)
            .then(() => {
                toast('Operation effectueé avec succés')
                setAmount('')
                setName('')
                setOpen(false)
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
            
        setLoading(false)
    }

    const addExtended = async ({ setErrors, setLoading, setOpen, setValidUntilAt, ...props }) => {
   
        setLoading(true)

        await csrf()

        setErrors([])

        axios
            .post('/api/v1/extensions', props)
            .then((response) => {
            
                const extension_id = response.data.id
                console.log("geg", extension_id)
                download({extension_id})
               /*  const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
                console.log(link) */

                toast('Operation effectueé avec succés')
                setValidUntilAt('')
                setOpen(false)
            })
            .catch(error => {
                //console.log('errer', error)
                setErrors(Object.values(error.response.data.errors).flat())
            })
            
        setLoading(false)
    }

    const getStudentTransactionsAndExtensions = async ({ setCurrentYearTransactions, setCurrentYearExtensions, setOtherYearTransactions, setOtherYearExtensions, slug, setPending, setLoading }) => {
        await csrf()
        setPending(true)
        
        axios.get('/api/v1/students/'+slug+'/details')
         .then(res => {
            { res.data.current_year_transactions ? setCurrentYearTransactions(res.data.current_year_transactions) : setCurrentYearTransactions([]) }
            { res.data.other_year_transactions ? setOtherYearTransactions(res.data.other_year_transactions) : setOtherYearTransactions([]) }
            { res.data.current_year_extensions ? setCurrentYearExtensions(res.data.current_year_extensions) : setCurrentYearExtensions([]) }
            { res.data.other_year_extensions ? setOtherYearExtensions(res.data.other_year_extensions) : setOtherYearExtensions([]) }
         })

         setLoading(false)
         setPending(false) 
    }

    const deleteStudentAccount = async({ slug, setWaiting, onClose, router }) => {

        await csrf()
        setWaiting(true)

        axios.delete('/api/v1/students/'+slug)
        .then(() => router.push('inscription'))
        .catch(error => {
            setErrors(Object.values(error.response.data.errors).flat())
        })

        setWaiting(false)
        onClose()
    }

    const download = async({extension_id}) => {
        await csrf()
        axios.get('/api/v1/extensions/download/'+extension_id, {
            responseType: 'blob'
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
        }) 
    }

    const signaturePad = async ({trimmedDataURL, setLoading, setShowModalSignature, setErrors}) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('signature_base64', trimmedDataURL)
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
        }
        axios.post('api/v1/signature_pad', formData, config)
        .then((response) => {
            setShowModalSignature(false)
            toast('Opération effectueé avec succés')
        })
        .catch(error => {
            console.log('error', error)
            setErrors(Object.values(error.response.data.errors).flat())
        })
        setLoading(false)

    }

    const showGroup = async ({ setClassrooms, group_id, classrooms }) => {
        await csrf()
        axios.get('/api/v1/groups/'+group_id)
         .then(res => {
            setClassrooms(res.data)
        })
    }

    const searschForFees = async ({ class_id, amount,setStudents, setLoading }) => {
        await csrf()    
        axios.get('/api/v1//'+group_id)
         .then(res => {
            setStudents(res.data)
        })
    }

   

    return {
        sendInvitation,
        updateProfile,
        addSection,
        getSection,
        addGroup,
        getGroup,
        addBuilding,
        getBuilding,
        addClassroom,
        getClassroom,
        getPrimaryStatistics,
        addCourse,
        getClassroomsWithGroups,
        getAcademies,
        addAcademy,
        updateAcademy,
        getStudents,
        addStudent,
        showStudent,
        updateStudent,
        getCourses,
        showCourse,
        updateCourse,
        addTransaction,
        addExtended,
        getStudentTransactionsAndExtensions,
        deleteStudentAccount,
        signaturePad,
        showGroup,
        getClasse
    }
}