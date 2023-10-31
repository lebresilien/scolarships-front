import { Fragment, useState } from 'react'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import { Dialog, Transition } from '@headlessui/react'
import Button from './Button'
import Label from './Label'
import Input from './Input'
import Textarea from './Textarea'
import Select from 'react-select'

const ModalSection = ({type, setSelectedGroup, setGroup_id, group_id, open, setOpen, title, update, state, setState, name, description, setName, setDescription, id, loading, setLoading, setPending, save, edit, additional, selectedGroup, coeff, setCoeff, setUnit_id, unit_id, fees, setFees, section_id, setSection_id, other, selectedOther,building_id, setBuilding_id, setSelectedOther }) => {

    const [errors, setErrors] = useState([])

    const submitForm = (e) => {

        e.preventDefault();
        console.log('see', id)

        {update ? 
            edit({id, name, fees, description, setLoading, setPending, setErrors, setState, setOpen, state, group_id, additional, setUnit_id, coeff, setCoeff, unit_id, setSection_id, section_id, building_id, setBuilding_id, other}) :
            save({ fees, setFees, name, description, setName, setDescription, setLoading, setPending, setErrors, setState, state, group_id, additional, type, coeff, setCoeff, setUnit_id, unit_id, setSection_id, section_id, building_id, setBuilding_id, other })
        }
    }

    const handleChange = (newValue) => {
        if(type === "units") setGroup_id(newValue.value) 
        else if(type === "courses") setUnit_id(newValue.value)
        else if(type === "groups") setSection_id(newValue.value)
        else if(type === "classrooms") setGroup_id(newValue.value)
        else setSection_id('')
        update && setSelectedGroup(newValue)
    }

    const handleChangeOther = (newValue) => {
        setBuilding_id(newValue.value)
        update && setSelectedOther(newValue)
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
                                                    <Label htmlFor="name">Libellé </Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        value={name}
                                                        className="block mt-1 w-full bg-gray-50"
                                                        onChange={(e) => setName(e.target.value)}
                                                        required
                                                        autoFocus 
                                                    />
                                                </div>
                                            </div>

                                            {additional && ((
                                                <div className="mt-2 pt-3">
                                                    <Label htmlFor="description">Selectioner le groupe </Label>
                                                    <div>
                                                        {update ?
                                                            <Select options={additional}  onChange={handleChange} value={selectedGroup} />:
                                                            <Select options={additional}  onChange={handleChange} />
                                                        }
                                                    </div>
                                                </div>
                                            ))}

                                            {other && ((
                                                <div className="mt-2 pt-3">
                                                    <Label htmlFor="description">Selectioner le groupe </Label>
                                                    <div>
                                                        {update ?
                                                            <Select options={other}  onChange={handleChangeOther} value={selectedOther} />:
                                                            <Select options={other}  onChange={handleChangeOther} />
                                                        }
                                                    </div>
                                                </div>
                                            ))}

                                            {type === "courses" && ((
                                                <div className="mt-3 pt-3">
                                                    <div>
                                                        <Label htmlFor="name">Coefficient </Label>
                                                        <Input
                                                            id="coeff"
                                                            type="number"
                                                            value={coeff}
                                                            className="block mt-1 w-full bg-gray-50"
                                                            onChange={(e) => setCoeff(e.target.value)}
                                                            required 
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            {type === "groups" && ((
                                                <div className="mt-3 pt-3">
                                                    <div>
                                                        <Label htmlFor="name">Pension </Label>
                                                        <Input
                                                            id="fees"
                                                            type="number"
                                                            value={fees}
                                                            className="block mt-1 w-full bg-gray-50"
                                                            onChange={(e) => setFees(e.target.value)}
                                                            required 
                                                        />
                                                    </div>
                                                </div>
                                            ))}

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

export default ModalSection;