import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useUser } from '@/hooks/user'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Input from '@/components/Input'
import Label from '@/components/Label'
import settings from '../assets/images/settings.jpg'
import Image from 'next/image'
import Button from '@/components/Button'
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs"
import { AiOutlineSetting, AiFillExclamationCircle } from "react-icons/ai"
/* import { firstCharacter } from '@/hooks/utils'
import { useSelector } from 'react-redux' */

export default function ModalProfile({showModal, setShowModal, user })  {
 
  const { updateProfile } = useUser({
    middleware: 'auth',
  })

 // const user = useSelector((state) => state.userReducer.user)

 const [errors, setErrors] = useState([])
 const [name, setName] = useState(user?.name)
 const [surname, setSurname] = useState(user?.surname)
 const [phone, setPhone] = useState(user?.phone)
 const [password, setPassword] = useState('')
 const [email, setEmail] = useState(user?.email)
 const [loading, setLoading] = useState(false)
 const [eye, setEye] = useState(false)

 const submitForm = event => {
    event.preventDefault()
    updateProfile({ name, surname, password, phone, setLoading, setErrors}) 
 }


  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto"  onClose={setShowModal}>
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

          {/* This element is to trick the browser into centering the modal contents. */}
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-y-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-2/3">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex flex-col">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left divide-y w-full">
                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 font-extrabold">
                                Configurer votre compte 
                            </Dialog.Title>
                            <div className="mt-2 pt-3">
                                <div className="md:flex md:flex-row">
                                    <div className="flex-1 flex-col w-full md:w-1/2">

                                        <div className="flex flex-row justify-center">
                                            <Image 
                                                src={settings} 
                                                className="rounded-full"
                                                placeholder="Paramètres" 
                                                alt="Paramètres"
                                                width={150}
                                                height={150}
                                            />
                                        </div>

                                        <div className="flex justify-center">

                                            <AuthValidationErrors className="mb-4 mt-5" errors={errors} />

                                            <form onSubmit={submitForm} className="my-4 w-full mx-5">

                                                <div className="mt-2 pt-3">
                                                    <div>
                                                        <Label htmlFor="name">Nom</Label>

                                                        <Input
                                                            id="name"
                                                            type="text"
                                                            value={user?.name}
                                                            className="block mt-1 w-full"
                                                            onChange={event => setName(event.target.value)}
                                                            required
                                                            autoFocus
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2 pt-3">
                                                    <div>
                                                        <Label htmlFor="surname">Prénoms</Label>

                                                        <Input
                                                            id="surname"
                                                            type="text"
                                                            value={surname}
                                                            className="block mt-1 w-full"
                                                            onChange={event => setSurname(event.target.value)}
                                                            autoFocus
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2 pt-3">
                                                    <div>
                                                        <Label htmlFor="phone">Téléphone</Label>

                                                        <Input
                                                            id="phone"
                                                            type="text"
                                                            value={phone}
                                                            className="block mt-1 w-full"
                                                            onChange={event => setPhone(event.target.value)}
                                                            autoFocus
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2 pt-3">
                                                    <div>
                                                        <Label htmlFor="email">Email</Label>

                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={email}
                                                            className="block mt-1 w-full"
                                                            onChange={event => setEmail(event.target.value)}
                                                            required
                                                            readOnly
                                                            disabled
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-2 pt-3">
                                                    <div>
                                                        <Label htmlFor="password">Nouveau Mot de passe</Label>
                                                        <div className="relative">
                                                            <Input
                                                                id="password"
                                                                type={eye ? "text" : "password"}
                                                                value={password}
                                                                className="block mt-1 w-full"
                                                                onChange={event => setPassword(event.target.value)}
                                                                autoFocus
                                                            />
                                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer" onClick={() => setEye(eye => !eye)}>
                                                                {eye ? <BsEyeFill color="#3b82f6" /> : <BsEyeSlashFill color="#3b82f6" /> }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                                

                                                <div className="flex items-center justify-end mt-4">
                                                    <Button className="ml-4 bg-blue-500 hover:bg-blue-400">
                                                        {!loading ? "Modifier" : "Modification" }
                                                    </Button>
                                                </div>

                                            </form>

                                        </div>

                                    </div>

                                    <div className="flex-1 flex-col md:w-50 w-full p-5">

                                        <div className="">
                                            <h6 className="text-md leading-4 font-medium text-gray-900 font-semibold">
                                                Mon compte
                                            </h6>
                                        </div>

                                        <div className="flex flex-row justify-between rounded-md my-3 py-3 px-2" style={{border: '1px solid #eee'}}>

                                            <div className="">
                                                <span className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                                   
                                                </span>
                                                <span className="ml-2"> {user?.name} (role) </span>
                                            </div>

                                            <div className="">
                                                <AiOutlineSetting className="cursor-pointer hover-icon" size={22} title="Paramètres" id="test_hover" />
                                            </div>

                                        </div>

                                        <div className="flex flex-col my-5">
                                           
                                            <span className="text-red-500 text-lg font-bold">
                                                    Suppression compte
                                            </span>

                                            <span className="font-bold mt-1">
                                                Faites attention à cette zone!
                                            </span>

                                            <div className="flex flex-row justify-between rounded-md border-2 border-red-500 mt-5">
                                                 
                                                <div className="flex w-1/4 mt-5 justify-center">
                                                    <AiFillExclamationCircle size={35} color="red" />
                                                </div>

                                                <div className="flex flex-col w-3/4 px-1 pb-3">
                                                    
                                                    <span className="mt-2">
                                                        As an account owner, deleting your user will result in the projects, inboxes, domains and data collected to no longer be accessible by anyone.  
                                                    </span>

                                                    <span className="mt-2">
                                                        To delete your user and all information associated with it, please press the 'Delete user' btn
                                                    </span>

                                                    <span className="mt-2">
                                                        <b>Note:</b> this action is irreversible.
                                                    </span>

                                                    <span className="mt-2">
                                                        Further steps are necessary to reassure that this user belongs to you, as well as to inform you about the types of data which will be erased as part of the process.
                                                    </span>

                                                    <Button type="button" cancel={true} className="mt-2" >Supprimer mon compte</Button>

                                                    
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
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

