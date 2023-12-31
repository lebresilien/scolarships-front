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

    const showClassroom = async ({ id, setLoading, setClassroom, setErrors }) => {
        setLoading(true)
        await csrf()

        axios.get('/api/v1/classrooms/'+id)
         .then(res => {
            setClassroom(res.data.data)
        })
        .catch(error => {
            setErrors(Object.values(error.response.data.errors).flat())
        })
        setLoading(false)
    }

    const showClassroomCourses = async ({ id, setLoading, setCourses, setSequences, setErrors }) => {
        setLoading(true)
        await csrf()
        axios.get('/api/v1/classrooms/'+id+'/courses')
        .then(res => {
            setCourses(res.data.courses)
            setSequences(res.data.sequences)
        })
        .catch(error => {
            setErrors(Object.values(error.response.data.errors).flat())
        })
        setLoading(false)
    }

    const showClassroomStudents = async ({ id, courseId, sequenceId, setLoading, setData, setErrors }) => {
        setLoading(true)
        await csrf()

        axios.get('/api/v1/classrooms/'+id+'/courses/'+courseId+'/sequences/'+sequenceId+'/students')
        .then(res => {
            setData(res.data.data)
        })
        .catch(error => {
            setErrors(Object.values(error.response.data.errors).flat())
        })
        setLoading(false)
    }

    const getClasse = async ({ setClassrooms, setPending }) => {
        await csrf()
        
        axios.get('/api/v1/classrooms')
         .then(res => {
            setClassrooms(res.data)
            setPending && setPending(false)
         })
             
    }

    const getPrimaryStatistics = async ({ setData , setLoading}) => {
        await csrf()
        axios.get('/api/v1/statistics')
        .then(res => {
            setData(res.data.data)
            setLoading(false)
        })   
    }


    const addAcademy = async ({ setErrors, setLoading, setState, state, setActive, setName, ...props }) => {

        setLoading(true)

        await csrf()

        setErrors([])

        axios
            .post('/api/v1/academies', props)
            .then(() => {
                const date = new Date()
                const newAcademy = {
                    id: parseInt(state.slice(-1)[0].id + 1),
                    name: props.name,
                    slug: props.name,
                    created_at: date.getFullYear() + '-' + parseInt(date.getMonth() + 1 ) + '-' + date.getDate(),
                    status: 1
                }
                setActive(true)
                setState([
                    newAcademy,
                    ...state
                ])
                setName('')
                toast('L\'annné academique a été rajoutée avec succés.')
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
            
        setLoading(false)
    }

    const updateAcademy = async ({ setActive, onClose, setWaiting, setLoading, state, setState, ...props }) => {
        
        setWaiting(true)
        await csrf()
     
        axios
            .put('/api/v1/academies/'+props.academy_id)
            .then(() => {
                setActive(false)
                const index = academies.findIndex(item => item.id == props.academy_id)
                const academiesCopy = [...state]
                academiesCopy[index] = {...academiesCopy[index], status: 0}
                setState(academiesCopy)
                onClose(true)
            })
           
        setWaiting(false)  
    }

    const remove = async({ setErrors, setWaiting, ids, state, setState, type}) => {
        setWaiting(true)
        await csrf()

        axios.delete('/api/v1/'+type+'/'+ids)
            .then(() => {
                
                const myArray = ids.split(';')
                let newArr = [];
                
                for(const i in myArray) {
                    newArr.push(parseInt(myArray[i]))
                }
                
                setState(
                    state.filter(item =>
                    !newArr.includes(item.id)
                ))
                
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
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

    const show = async ({id, setValue, setName, setLoading, type, setErrors}) => {
        await csrf()
        axios.get(`/api/v1/${type}/${id}`)
         .then(res => {
            const data = res.data.data
            setValue(data.data)
            setName && setName(data.name)
        })
        .catch(error => {
            setErrors(Object.values(error.response.data.errors).flat())
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

    const list = async ({ setState, setPending, type, setAdditionals, setOthers }) => {
        
        await csrf()
        setPending(true)
        
        axios.get('/api/v1/'+type)
         .then(res => {
            const data = res.data
            setState(data.state)
            setAdditionals && setAdditionals(data.additional)
            setOthers && setOthers(data.other)
        })
         
        setPending(false) 
    }

    const index = async (url) => {
        await csrf()
        return axios.get(url)
    }

    const indexWithParams = async (url, params) => {
        await csrf()
        return axios.get(url, {
            params: params
        })
    }

    const create = async (url, data) => {
        await csrf()
        return axios.post(url, data)
    }

    const change = async (url, id,  data) => {
        await csrf()
        return axios.put(`${url}/${id}`, data)
    }

    const getClassroom = async ({ setClassrooms, setClassroomValue }) => {
        await csrf()
        
        axios.get('/api/v1/classrooms')
         .then(res => {
            setClassrooms(res.data)
            if(setClassroomValue) setClassroomValue(res.data[0].id)
         })
            
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

    const edit = async ({ type, additional, id, setState, setErrors, setLoading, setOpen, setPending, other, ...props }) => {

        setLoading(true)

        await csrf()

        setErrors([])

        axios
            .put('/api/v1/'+type+'/'+id, props)
            .then(() => {
                
                toast(type + ' modifiée avec succés.')
                
                if(additional) {
                    
                    if(type === "courses") {

                        const item = additional.find(group => group.value == props.unit_id)
                        const copySection = [...props.state]
                        const currentItem = copySection.find(item => item.id === id)
                        
                        currentItem.name = props.name
                        currentItem.description = props.description
                        currentItem.coeff = props.coeff
                        currentItem.group = item
            
                        setState(copySection)

                    } else if(type === "groups") {

                        const item = additional.find(group => group.value == props.section_id)
                        const copySection = [...props.state]
                        const currentItem = copySection.find(item => item.id === id)
                    
                        currentItem.name = props.name
                        currentItem.description = props.description
                        currentItem.fees = props.fees
                        currentItem.group = item
    
                        setState(copySection)

                    } else if(type === "classrooms") {
                        
                        const item = additional.find(group => group.value == props.group_id)
                        const search = other.find(el => el.value == props.building_id)
                        const copySection = [...props.state]
                        const currentItem = copySection.find(item => item.id === id)
                    
                        currentItem.name = props.name
                        currentItem.description = props.description
                        currentItem.building = search
                        currentItem.group = item
            
                        setState(copySection)

                    } else {
                        
                        const item = additional.find(group => group.value == props.group_id)
                        const copySection = [...props.state]
                        const currentItem = copySection.find(item => item.id === id)
                       
                        currentItem.name = props.name
                        currentItem.description = props.description
                        currentItem.group = item
            
                        setState(copySection)
                    }

                } else {
                    const copySection = [...props.state]
                    const currentItem = copySection.find(item => item.id === id)
                    if(type !== "transactions") currentItem.name = props.name
                    if(type === "transactions") currentItem.title = props.name
                    if(type === "sequences") currentItem.status = props.status
                    if(props.amount) currentItem.amount = props.amount
                    if(props.description) currentItem.description = props.description
                    if(props.day) currentItem.day = props.day
                    if(props.hour) currentItem.hour = props.hour
                    setState(copySection)
                }
             
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

    const getSequence = async ({ setSequences, setPending, setErrors }) => {
        await csrf()
      
        axios.get('/api/v1/sequences')
        .then(res => {
            setSequences(res.data)
        })
        .catch(error => {
            setErrors(Object.values(error.response.data.errors).flat())
        })
        
        setPending(false)
    }

    const getSequenceSectionStats = async ({ id, setStatistics, setPending, setTitle }) => {
        await csrf()
        
        axios.get('/api/v1/sequences/'+id+'/sections')
         .then(res => {
            setStatistics(res.data.data)
            setTitle(res.data.title)
            setPending(true)
         })   
    }

    const getSequenceGroupStats = async ({ id, sectionId, setStatistics, setPending }) => {
        await csrf()
        
        axios.get('/api/v1/sequences/'+id+'/groups/'+sectionId)
         .then(res => {
            setStatistics(res.data)
            setPending(true)
         })   
    }

    const getSequenceClassroomStats = async ({ slug, classroomId, setStatistics, setPending }) => {
        await csrf()
        
        axios.get('/api/v1/sequences/'+slug+'/classrooms/'+classroomId)
         .then(res => {
            setStatistics(res.data)
            setPending(true)
         })   
    }

    const addNote = async ({ setErrors, setPending, ...props }) => {

        setPending(true)

        await csrf()

        setErrors([])

        const data = {
            students: props.students,
            sequence_id: props.sequenceId,
            classroom_id: props.id,
            course_id: props.courseId
        }

        axios
            .post('/api/v1/notes', data)
            .then(() => {
                toast('Notes mises à jour avec succés.')
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
            
        setPending(false)
    }

    const add = async ({ additional, setErrors, setName, setDescription, setCoeff, setLoading, setState, state, type, other, ...props }) => {
        setLoading(true)
        await csrf()
        setErrors([])

        axios
            .post('/api/v1/'+type, props)
            .then((res) => {

                toast('Operation effectuée avec succés.')
                setName && setName('')
                setDescription && setDescription('')
                setCoeff && setCoeff('')
                props.setLname && props.setLname('')
                props.setFname && props.setFname('')
                props.setSexe && props.setSexe('M')
                props.setBornPlace && props.setBornPlace('')
                props.setBornAt && props.setBornAt('')
                props.setFatherName && props.setFatherName('')
                props.setMotherName && props.setMotherName('')
                props.setFphone && props.setFphone('')
                props.setMphone && props.setMphone('')
                props.setQuarter && props.setQuarter('')
                props.setComming && props.setComming('')
                props.setAllergy && props.setAllergy('')
                props.setAmount && props.setAmount('')
                const d = new Date()
                const data = res.data.data

                if(additional) {
                    
                    if(type === "courses") {

                        const item = additional.find(group => group.value == props.unit_id)
                        
                        const newItem = {
                            id: data.id,
                            name: props.name,
                            coeff: props.coeff,
                            group: item,
                            description: props.description,
                            created_at: d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-'+ d.getDate()
                        }
                        setState([
                            newItem,
                            ...state
                        ])
                    } else if(type === "groups") {

                        const item = additional.find(group => group.value == props.section_id)

                        const newItem = {
                            id: data.id,
                            name: props.name,
                            fees: props.fees,
                            group: item,
                            description: props.description,
                            created_at: d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-'+ d.getDate()
                        }
                        setState([
                            newItem,
                            ...state
                        ])
                    } else if(type === "classrooms") {

                        const item = additional.find(group => group.value == props.group_id)
                        const search = other.find(el => el.value == props.building_id)

                        const newItem = {
                            id: data.id,
                            name: props.name,
                            group: item,
                            building: search,
                            description: props.description,
                            created_at: d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-'+ d.getDate()
                        }

                        setState([
                            newItem,
                            ...state
                        ])
                        
                    } else if(type === "students") { 

                        const newItem = {
                            id: data.id,
                            matricule: data.matricule,
                            fname: props.fname,
                            lname: props.lname,
                            sexe: props.sexe,
                            comming: props.comming,
                            created_at: d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-'+ d.getDate()
                        }

                        setState([
                            newItem,
                            ...state
                        ])

                    } else {

                        const item = additional.find(group => group.value == props.group_id)

                        const newItem = {
                            id: res.data.id,
                            name: props.name,
                            group: item,
                            description: props.description,
                            created_at: d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-'+ d.getDate()
                        }
                        setState([
                            newItem,
                            ...state
                        ])
                    }

                } else {
                    const newItem = {
                        id: res.data.id,
                        name: props.name,
                        description: props.description,
                        created_at: d.getFullYear() + '-' + parseInt(d.getMonth() + 1) + '-'+ d.getDate()
                    }
                    setState([
                        newItem,
                        ...state
                    ])
                }
                
            })
            .catch(error => {
                setErrors(Object.values(error.response.data.errors).flat())
            })
        setLoading(false)
    }

    return {
        sendInvitation,
        updateProfile,
        getPrimaryStatistics,
        addAcademy,
        updateAcademy,
        getStudents,
        addStudent,
        show,
        updateStudent,
        list,
        showCourse,
        edit,
        addTransaction,
        addExtended,
        getStudentTransactionsAndExtensions,
        deleteStudentAccount,
        signaturePad,
        showGroup,
        getClasse,
        showClassroom,
        showClassroomCourses,
        showClassroomStudents,
        getSequence,
        addNote,
        getSequenceSectionStats,
        getSequenceGroupStats,
        getSequenceClassroomStats,
        add,
        remove,
        getClassroom,
        index,
        create,
        change,
        indexWithParams
    }
}