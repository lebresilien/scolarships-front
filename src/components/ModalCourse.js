import Button from './Button'
import Label from './Label'
import Input from './Input'
import { Fragment, useState } from 'react'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import { useUser } from '@/hooks/user'
import { Dialog, Transition } from '@headlessui/react'
import Select from 'react-select'

function ModalCourse ({ classrooms, open, setOpen, title, setPending, setCourses, update, groups, name, setName, slug, units }) {

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const[unit_id, setUnit_id] = useState()

    const { addCourse, updateCourse } = useUser({
        middleware: 'auth',
    })

    const selectDiselectAll = (slug) => {

        const el = document.querySelectorAll('[name="'+slug+'"]')

        if(document.querySelector('[name="'+slug+'"]').parentElement.children[0].checked == true) {
            
            for (var i = 0, len = el.length; i < len; i++) {
                el[i].checked = false
            }

        }
        else {

            for (var i = 0, len = el.length; i < len; i++) {
                el[i].checked = true
            }

        }
        
    }

    const submitForm = (e) => {
       
        e.preventDefault();

        let selectedCheckbox = [];
        
        const checkboxes = document.querySelectorAll(".checkboxes") 

        for (var i = 0, len = checkboxes.length; i < len; i++) {

            if(checkboxes[i].checked == true) {

                selectedCheckbox.push(parseInt(checkboxes[i].value))
                
            }
            
        }

        {!update ? 
            addCourse({ name, unit_id, selectedCheckbox, setCourses, setLoading, setPending, setErrors }) : 
            updateCourse({ name, slug, selectedCheckbox, setCourses, setLoading, setPending, setOpen, setErrors })
        } 
    }

    let options = []

    if(units.length != 0 ) {

        units.map((unit) => {
            options.push({ value: unit.id, label: unit.name })
        })

    }
    const handleInputChange = (newValue) => {
       setUnit_id(newValue.value)
    }

    return (
        
        <Transition.Root show={open} as={Fragment}>

            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto"  onClose={setOpen}>

                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            
                            <Dialog.Title as="h3" className="text-center py-3 text-lg leading-6 font-medium text-gray-900 border-b-2">
                                    { title }
                            </Dialog.Title>

                            <div className="bg-white my-6">
                            
                                <div className="grid sm:grid-cols-2 sm:gap-4 grid-cols-1 gap-3 sm:px-3">
                                    
                                    <div className="my-5">

                                        <form onSubmit={submitForm}>

                                            <div className="mt-3 pt-3">
                                                <div>
                                                    <Label htmlFor="name">Libellé de la matiere </Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        value={name}
                                                        className="block mt-1 w-full bg-gray-50 cursor-not-allowed"
                                                        onChange={event => setName(event.target.value)}
                                                        required
                                                        autoFocus
                                                        readOnly={update ? true : false}  
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-3">
                                                <Label>Sélectionner la catégorie</Label>
                                                <Select options={options}  onChange={handleInputChange} />
                                            </div>

                                            <div className="px-4 py-3 sm:px-1 sm:flex sm:flex-row justify-end">
                                                
                                                {update ? 
                                                    <Button
                                                        type="submit"
                                                        className="" 
                                                        disabled={loading}  
                                                    >   
                                                        { !loading ? 'Mettre à jour' : 'Mise à jour ...' }
                                                    </Button>
                                                :

                                                    <Button
                                                        type="submit"
                                                        className="" 
                                                        disabled={loading}  
                                                    >   
                                                        { !loading ? 'Enregistrez' : 'Enregistrement ...' }
                                                    </Button>
                                                }
                                            </div>

                                        </form>
                                    </div>

                                    <div className="flex flex-col my-5 items-center">
                                        
                                        <h5 className="text-md text-gray-700 font-semibold  leading-tight">Ajouter des groupes</h5>
                                        
                                        <div className="px-2">
                                                <AuthValidationErrors className="mb-4 mt-5" errors={errors} />
                                        </div>

                                        <div className="my-4">

                                            {classrooms.map((classroom, index) => (

                                            <div className="flex flex-col" key={index}>

                                                    <div className="flex flex-col my-3">

                                                        <Label htmlFor={"radio" + index} className="cursor-pointer">
                                                            <input 
                                                                type="checkbox"
                                                                id={"radio" + index}
                                                                onChange={() => selectDiselectAll(classroom.slug)}
                                                            />
                                                            <span className="text-gray-900"> { classroom.name } </span>
                                                        </Label>

                                                        {update ? classroom.groups.map((item, index) => (
                    
                                                            groups.includes(item.id) ?
                                                                
                                                                <Label htmlFor={"radio-item" + item.id} className="ml-4 my-1 cursor-pointer" key={index}>
                                                                    <input 
                                                                        className="checkboxes"
                                                                        type="checkbox"
                                                                        id={"radio-item" + item.id}
                                                                        name={classroom.slug}
                                                                        value={item.id}
                                                                        defaultChecked="true"
                                                                    />
                                                                    <span className="text-gray-800"> { item.name } </span>
                                                                </Label>
                                                                     
                                                                :

                                                                <Label htmlFor={"radio-item" + item.id} className="ml-4 my-1 cursor-pointer" key={index}>
                                                                    <input 
                                                                        className="checkboxes"
                                                                        type="checkbox"
                                                                        id={"radio-item" + item.id}
                                                                        name={classroom.slug}
                                                                        value={item.id}
                                                                    />
                                                                    <span className="text-gray-800"> { item.name } </span>
                                                                </Label> 
                                                        ))

                                                        :

                                                        classroom.groups.map((item, index) => (
                    
                                                            <Label htmlFor={"radio-item" + item.id} className="ml-4 my-1 cursor-pointer" key={index}>
                                                                <input 
                                                                    className="checkboxes"
                                                                    type="checkbox"
                                                                    id={"radio-item" + item.id}
                                                                    name={classroom.slug}
                                                                    value={item.id}
                                                                />
                                                                <span className="text-gray-800"> { item.name } </span>
                                                            </Label>
                                                        ))
                                                    }
                                                    </div>

                                            </div>

                                            ))}

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>

    )
}

export default ModalCourse;