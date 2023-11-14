import Button from './Button'
import Label from './Label'
import Input from './Input'
import { Fragment, } from 'react'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import { Dialog, Transition } from '@headlessui/react'
import Select from 'react-select'

function ModalPay ({
    setState,
    state, 
    open, 
    setOpen, 
    title,  
    surname, 
    setName,
    name, 
    setLoading,
    amount, 
    setAmount, 
    loading, 
    errors, 
    save, 
    update, 
    edit, 
    setErrors, 
    type, 
    id, 
    selectedStatus, 
    setClassroom_id, 
    selectedGroup, 
    setSelectedGroup, 
    additional, 
    options,
    setStatus,
    setSelectedStatus
    }) {


    const submitForm = (e) => {
       
        e.preventDefault();

        {update ?
            type === "transactions" ?  edit({setState, state, setErrors, setOpen, name, amount, type, setLoading, id}): edit() :
            save()
        }
    }
    
    const handleChange = (newValue) => {
        setClassroom_id(newValue.value) 
        setSelectedGroup && setSelectedGroup(newValue)
    }

    const handleChangeStatus = (newValue) => {
        setStatus(newValue.value)
        setSelectedStatus(newValue)
    }

    return (
        
        <Transition.Root show={open} as={Fragment}>

            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto"  onClose={setOpen}>

                <div className="flex items-end justify-center min-h-screen py-4 px-4 text-center sm:block sm:p-0">
                    
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

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-3 sm:align-middle sm:max-w-lg sm:w-full">
                            
                            <Dialog.Title as="h3" className="text-center py-3 text-lg leading-6 font-medium text-gray-900 border-b-2">
                                    { title }
                            </Dialog.Title>

                            <div className="bg-white my-6">
                            
                                <div className="grid sm:grid-cols-1 sm:gap-4 grid-cols-1">
                                    
                                    <div className="my-3">

                                        <div className="flex flex-col items-center">
                                                <AuthValidationErrors className="mb-4 mt-5" errors={errors} />
                                        </div>

                                        <form onSubmit={submitForm} className="px-5"> 
                                            
                                            <div className='mb-3'>
                                                <div>
                                                    <Label htmlFor="surnname">Noms && Prénoms </Label>
                                                    <Input
                                                        disabled={true}
                                                        id="surname"
                                                        type="text"
                                                        value={surname}
                                                        className="block mt-1 w-full bg-gray-50"
                                                    />
                                                </div>
                                            </div>

                                            {type == "transactions" && ((
                                                <div>
                                                    <div className='mb-3'>
                                                        <div>
                                                            <Label htmlFor="name">Libellé </Label>
                                                            <Input
                                                                id="name"
                                                                type="text"
                                                                value={name}
                                                                className="block mt-1 w-full bg-gray-50"
                                                                onChange={event => setName(event.target.value)}
                                                                required
                                                                autoFocus
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <div>
                                                            <Label htmlFor="amount">Montant </Label>
                                                            <Input
                                                                id="amount"
                                                                type="number"
                                                                value={amount}
                                                                className="block mt-1 w-full bg-gray-50"
                                                                onChange={event => setAmount(event.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {type == "policies" && ((
                                                <div>
                                                    <div className="mb-2">
                                                        <Label htmlFor="description">Selectioner le groupe </Label>
                                                        <div>
                                                            <Select options={additional}  onChange={handleChange} value={selectedGroup} />
                                                        </div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <Label htmlFor="description">Status </Label>
                                                        <div>
                                                            <Select options={options}  onChange={handleChangeStatus} value={selectedStatus} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {type == "policies/2" && ((
                                                <div>
                                                    
                                                    <div className="mb-2">
                                                        <Label htmlFor="description">Selectioner la salle de classe </Label>
                                                        <div>
                                                            <Select options={additional}  onChange={handleChange} />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <div>
                                                            <Label htmlFor="amount">Montant </Label>
                                                            <Input
                                                                id="amount"
                                                                type="number"
                                                                value={amount}
                                                                className="block mt-1 w-full bg-gray-50"
                                                                onChange={event => setAmount(event.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                            ))}


                                            <div className="my-3 sm:flex sm:flex-row justify-between">
                                           
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

export default ModalPay;