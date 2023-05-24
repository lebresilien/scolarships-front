import { Fragment, useState } from 'react'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import { Dialog, Transition } from '@headlessui/react'
import Select from 'react-select'
import Button from './Button'
import Label from './Label'
import Input from './Input'
import Textarea from './Textarea'
import { useUser } from '@/hooks/user'

const ModalClasse = ({open, setOpen, title, update, buildings, groups, groupValue, buildingValue}) => {

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [group_id, setGroup_id] = useState('')
    const [building_id, setBuilding_id] = useState('')

    const { addClassroom } = useUser({
        middleware: 'auth',
    })

    const submitForm = (e) => {
        e.preventDefault();
        addClassroom({ name, description, building_id, group_id, setName, setDescription, setLoading, setErrors, groupValue, buildingValue })
    }

    let groupOptions = []
    let buildingOptions = []

    if(buildings.length != 0 ) {
        buildings.map((unit) => {
            buildingOptions.push({ value: unit.id, label: unit.name })
        })
    }

    if(groups.length != 0 ) {
        groups.map((unit) => {
            groupOptions.push({ value: unit.id, label: unit.name })
        })
    }

    const handleGroupChange = (newValue) => {
        setGroup_id(newValue.value)
    }

    const handleBuildingChange = (newValue) => {
        setBuilding_id(newValue.value)
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

                            <div className="bg-white">
                            
                                <div className="grid grid-cols-1 gap-3 sm:px-3">
                                    
                                    <div className="px-2">
                                        <AuthValidationErrors className="mb-4 mt-5" errors={errors} />
                                    </div>

                                    <div className="">

                                        <form onSubmit={submitForm}>

                                            <div className="mt-3 pt-3">
                                                <div>
                                                    <Label htmlFor="name">Libellé de la salle </Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        value={name}
                                                        className="block mt-1 w-full bg-gray-50"
                                                        onChange={(e) => setName(e.target.value)}
                                                        required
                                                        autoFocus
                                                        //readOnly={update ? true : false}  
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-3">
                                                <div>
                                                    <Label>Sélectionner le groupe</Label>
                                                    {update ? 
                                                        <Select options={groupOptions}  onChange={handleGroupChange} value={groupValue} />:
                                                        <Select options={groupOptions}  onChange={handleGroupChange} />
                                                    }
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-3">
                                                <div>
                                                    <Label>Sélectionner le batiment</Label>
                                                    {update ?
                                                        <Select options={buildingOptions}  onChange={handleBuildingChange} value={buildingValue} />:
                                                        <Select options={buildingOptions}  onChange={handleBuildingChange} />
                                                    }
                                                </div>
                                            </div>

                                            <div className="mt-2 pt-3">
                                                <div>
                                                    <Label htmlFor="description">Description </Label>

                                                    <Textarea
                                                        id="description"
                                                        value={description}
                                                        className="block mt-1 w-full"
                                                        onChange={e => setDescription(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="my-5 sm:flex sm:flex-row justify-between">
                                                <Button
                                                    type="button"
                                                    passed
                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                                                    onClick={() => setOpen(false)}
                                                    cancel="true"
                                                >
                                                    Annuler
                                                </Button>

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

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalClasse;