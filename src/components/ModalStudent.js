import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useUser } from '@/hooks/user'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import Textarea from '@/components/Textarea'
import Select from 'react-select'

export default function ModalStudent({ open, setOpen, title, classrooms, setStudents, setPending })  {

    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [student, setStudent] = useState(
        { 
           lname: '',
           fname: '',
           born_at: '',
           born_place: '',
           sexe: 'M',
           quarter: '',
           allergy: '',
           father_name: '',
           fphone: '',
           mother_name: '',
           mphone: '',
           classroom_id: '',
           amount: '',
           type: 'new'
        }
    )

    let options = []

    const { addStudent } = useUser({
        middleware: 'auth',
    })

    const handleInputChange = (newValue) => {
        setStudent({
            ...student,
            classroom_id: newValue.value
        })
    };
    
    const onChangeHandler = (e) => {

        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value
        })
        
    }
    
    const submitForm = event => {

        event.preventDefault()
        
        addStudent({ student, setErrors, setLoading, setOpen, setStudents, setPending })
    }

    if(classrooms.length != 0 ) {

        classrooms.map((classroom) => {
            const temp = { value: classroom.id, label: classroom.name}
            options.push(temp)
        })

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
                        
                            <form onSubmit={submitForm} className="my-4">

                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                  
                                    <div className="sm:flex flex-col">

                                        <AuthValidationErrors className="mb-4 mt-5" errors={errors} />

                                        <div className="mt-3 text-center sm:mt-0 sm:text-left divide-y w-full">

                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                { title }
                                            </Dialog.Title>

                                            <fieldset className="px-2 my-3 border-gray-600">

                                                <legend className="text-medium font-medium text-gray-900">Informations relatives à l'eleve</legend>

                                                <div className="grid grid-cols-6 gap-6 my-3">

                                                    <div className="col-span-6 sm:col-span-3">
                                                       
                                                        <Label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                            Nom(s) <span className="text-red-500">*</span>
                                                        </Label>

                                                        <Input
                                                            type="text"
                                                            name="fname"
                                                            id="first-name"
                                                            autoComplete="given-name"
                                                            onChange={onChangeHandler}
                                                        />

                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        
                                                        <Label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                            Prénom(s)
                                                        </Label>
                                                        
                                                        <Input
                                                            type="text"
                                                            name="lname"
                                                            id="last-name"
                                                            autoComplete="family-name"
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        
                                                        <Label htmlFor="bornAt" className="block text-sm font-medium text-gray-700">
                                                            Né le <span className="text-red-500">*</span>
                                                        </Label>
                                                        
                                                        <Input
                                                            required
                                                            type="date"
                                                            name="born_at"
                                                            id="bornAt"
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        
                                                        <Label htmlFor="bornPlace" className="block text-sm font-medium text-gray-700">
                                                            A <span className="text-red-500">*</span>
                                                        </Label>
                                                        
                                                        <Input
                                                            required
                                                            type="text"
                                                            name="born_place"
                                                            id="bornPlace"
                                                            autoComplete
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3 pt-3">
                                                        <div className="flex flex-row mt-5">

                                                            <Label  className="block text-sm font-medium text-gray-700">
                                                                Sexe<span className="text-red-500">*</span>
                                                            </Label>

                                                            <div className="flex items-center ml-2">
                                                                <input
                                                                    id="man-radio"
                                                                    name="sexe"
                                                                    type="radio"
                                                                    checked
                                                                    value="M"
                                                                    onChange={onChangeHandler}
                                                                />
                                                                <Label htmlFor="man-radio" className="ml-2 block text-sm font-medium text-gray-700">
                                                                    Masculin
                                                                </Label>
                                                            </div>

                                                            <div className="flex items-center ml-3">
                                                                <input
                                                                    id="woman-radio"
                                                                    name="sexe"
                                                                    type="radio"
                                                                    value="F"
                                                                    onChange={onChangeHandler}
                                                                />
                                                                <Label htmlFor="woman-radio" className="ml-2 block text-sm font-medium text-gray-700">
                                                                    Feminin
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        
                                                        <Label htmlFor="quarter" className="block text-sm font-medium text-gray-700">
                                                            Zone de residence <span className="text-red-500">*</span>
                                                        </Label>
                                                        
                                                        <Input
                                                            type="text"
                                                            name="quarter"
                                                            id="quarter"
                                                            required
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>

                                                    <div className="col-span-6">
                                                        
                                                        <Label htmlFor="allergy" className="block text-sm font-medium text-gray-700">
                                                            Allergies
                                                        </Label>
                                                        
                                                        <Textarea
                                                            type="text"
                                                            name="allergy"
                                                            id="allergy"
                                                            className="w-full"
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>


                                                </div>
                                            </fieldset>

                                            <fieldset className="px-2 my-3 border-gray-600">

                                                <legend className="text-medium font-medium text-gray-900">Informations relatives au parent</legend>
                                                
                                                <div className="grid grid-cols-6 gap-6 my-3">
                                                
                                                    <div className="col-span-6 sm:col-span-3">
                                                        
                                                        <Label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
                                                            Nom du pere
                                                        </Label>
                                                        
                                                        <Input
                                                            type="text"
                                                            name="father_name"
                                                            id="fatherName"
                                                            autoComplete
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        
                                                        <Label htmlFor="fatherPhone" className="block text-sm font-medium text-gray-700">
                                                            Téléphone
                                                        </Label>
                                                        
                                                        <Input
                                                            type="text"
                                                            name="fphone"
                                                            id="fatherPhone"
                                                            autoComplete
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        
                                                        <Label htmlFor="motherName" className="block text-sm font-medium text-gray-700">
                                                            Nom de la mère <span className="text-red-500">*</span>
                                                        </Label>
                                                        
                                                        <Input
                                                            required
                                                            type="text"
                                                            name="mother_name"
                                                            id="motherName"
                                                            autoComplete
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        
                                                        <Label htmlFor="motherPhone" className="block text-sm font-medium text-gray-700">
                                                            Téléphone <span className="text-red-500">*</span>
                                                        </Label>
                                                        
                                                        <Input
                                                            required
                                                            type="text"
                                                            name="mphone"
                                                            id="motherPhone"
                                                            autoComplete
                                                            onChange={onChangeHandler}
                                                        />
                                                    </div>

                                                </div>
                                            </fieldset>


                                            <fieldset className="px-2 my-3 border-gray-600">
                                                
                                                <legend className="text-medium font-medium text-gray-900">Informations relative à la salle de classe</legend>
                                                
                                                <div className="grid grid-cols-6 gap-6 my-3">

                                                    <div className="col-span-6 sm:col-span-3">

                                                        <Label htmlFor="classroom" className="block text-sm font-medium text-gray-700">
                                                            Selectionner la salle de classe <span className="text-red-500">*</span>
                                                        </Label>

                                                        <Select 
                                                            id="classroom_id"
                                                            options={options} 
                                                            className="mt-1" 
                                                            onChange={handleInputChange} 
                                                            name="classroom_id" 
                                                            defaultValue={options[0]}
                                                            required
                                                        />

                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                            
                                                        <Label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                                            Montant de l'inscription <span className="text-red-500">*</span>
                                                        </Label>
                                                        
                                                        <Input
                                                            required
                                                            type="number"
                                                            name="amount"
                                                            id="amount"
                                                            onChange={onChangeHandler}
                                                        />

                                                    </div>

                                                </div>
                                               
                                            </fieldset>

                                        </div>

                                    </div>

                                </div>

                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                   
                                    <Button
                                        type="button"
                                        className=""
                                        onClick={() => setOpen(false)}
                                        cancel="true"
                                    >
                                        Annuler
                                    </Button>

                                    <Button
                                        type="submit"
                                        className=""
                                        disabled={loading}
                                    >
                                        { !loading ? 'Enregistrer' : 'Enregistrement ...' }
                                    </Button>

                                </div>
                            </form>

                        </div>

                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}