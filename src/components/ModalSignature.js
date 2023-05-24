import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useUser } from '@/hooks/user'
import SignatureCanvas from 'react-signature-canvas'
import Button from '@/Components/Button'
import {useState} from 'react'
import AuthValidationErrors from '@/components/AuthValidationErrors'

export default function ModalSignature({showModalSignature, setShowModalSignature })  {

    const { signaturePad } = useUser({
        middleware: 'auth',
    })

    const[loading, setLoading] = useState(false)
    const[trimmedDataURL, setTrimmedDataURL] = useState('')
    const[sigPad, setSigPad] = useState({})
    const[errors, setErrors] = useState([])
    
    const clear = () => {
        sigPad.clear()
    }

    const trim = () => {
        setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'))
        signaturePad({ trimmedDataURL, setLoading, setShowModalSignature, setErrors })
    }


    return (
        <Transition.Root show={showModalSignature} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto"  onClose={setShowModalSignature}>
                <div className="flex items-end justify-center max-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                </div>

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
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-y-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-1/2">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex flex-col">
                                
                                <div className="mt-3 text-center sm:mt-0 sm:text-left divide-y w-full">
                                    <Dialog.Title as="h3" className="text-lg text-center leading-6 font-medium text-gray-900 font-extrabold">
                                        Mettre à jour votre signature 
                                    </Dialog.Title>
                                </div>

                                <AuthValidationErrors className="mb-4 mt-5" errors={errors} />

                                <div className="mt-2 pt-3">
                                    <div className="md:flex md:flex-row">
                                        <div className="flex-1 flex-col w-full md:w-1/2">
                                            <div className="flex flex-row justify-center bg-gray-300">
                                                <SignatureCanvas 
                                                    penColor='black'
                                                    canvasProps={{
                                                        width: 500, 
                                                        height: 200, 
                                                        className: 'sigCanvas'
                                                    }} 
                                                    ref={(ref) => { setSigPad(ref) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row justify-end my-5">
                                    <Button 
                                        className=""
                                        onClick={trim}
                                        disabled={loading ? true : false}
                                    >
                                        {!loading ? 'Sauvegarder' : 'Sauvegarde ...' }
                                    </Button>
                                    <Button  
                                        className="mx-1" 
                                        cancel={true}
                                        onClick={clear}
                                    >
                                        Effacer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}