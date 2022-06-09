import Button from './Button'
import Label from './Label'
import Input from './Input'
import { Fragment, useState } from 'react'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import { useUser } from '@/hooks/user'
import { Dialog, Transition } from '@headlessui/react'

function ModalExtended ({ open, setOpen, title, student_id, name }) {

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [valid_until_at, setValidUntilAt] = useState()

    const { addExtended } = useUser({
        middleware: 'auth',
    })

   
    const submitForm = (e) => {
       
        e.preventDefault();

        addExtended({ valid_until_at, student_id, setLoading, setOpen, setErrors, setValidUntilAt })
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
                            
                                <div className="grid sm:grid-cols-1 sm:gap-4 grid-cols-1">
                                    
                                    <div className="my-3">

                                        <form onSubmit={submitForm} className="px-5">

                                            <div className="">
                                                <AuthValidationErrors className="mb-4" errors={errors} />
                                            </div>

                                            <div>
                                                <div>
                                                    <Label htmlFor="name">Nom de l'eleve </Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        onChange={() => {}}
                                                        value={name}
                                                        className="block mt-1 w-full bg-gray-50 cursor-not-allowed"
                                                        disabled
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-3">
                                                <div>
                                                    <Label htmlFor="valid_until_at">Valide jusqu'au </Label>
                                                    <Input
                                                        id="valid_until_at"
                                                        type="date"
                                                        value={valid_until_at}
                                                        className="block mt-1 w-full bg-gray-50"
                                                        onChange={event => setValidUntilAt(event.target.value)}
                                                        required
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-5 sm:px-1 sm:flex sm:flex-row justify-end">
                                           
                                               <Button
                                                    type="submit"
                                                    className="" 
                                                    disabled={loading}  
                                                >   
                                                        { !loading ? 'Enregistrez' : 'Enregistrement ...' }
                                                </Button>
                                                
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

export default ModalExtended;