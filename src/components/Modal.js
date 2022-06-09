import { Fragment, useState, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useUser } from '@/hooks/user'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Input from '@/components/Input'
import Label from '@/components/Label'
import data  from '@/hooks/mock'

export default function Modal({open, setOpen, text })  {
 
  const { sendInvitation } = useUser({
    middleware: 'auth',
  })

 const profileRef = useRef(null)

 const [classrooms, setClassrooms] = useState([])
 const [errors, setErrors] = useState([])
 const [email, setEmail] = useState('')
 const [loading, setLoading] = useState(false)
 const [selectedRoleValue, setSelectedRoleValue] = useState('Utilisateur')
 //const [selectedClassroomValue, setSelectedClassroomValue] = useState('')
 const [classroom_id, setClassroomValue] = useState('')

 const submitForm = event => {
  event.preventDefault()
  if(selectedRoleValue === "Utilisateur") setSelectedClassroomValue('')
  sendInvitation({ email, selectedRoleValue, classroom_id, setOpen, setLoading, setErrors })
}

const handleChange = (e) => setSelectedRoleValue(e.target.value)
const handleChangeClassroom = (e) => setClassroomValue(e.target.value)

const { getClassroom } = useUser({
  middleware: 'auth',
})

useEffect(() => {
  getClassroom({ setClassrooms, setClassroomValue })
}, [])

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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              
              <form onSubmit={submitForm} className="my-4">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex flex-col">
                  <AuthValidationErrors className="mb-4 mt-5" errors={errors} />
                    <div className="mt-3 text-center sm:mt-0 sm:text-left divide-y w-full">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        { text }
                      </Dialog.Title>

                      <div className="mt-2 pt-3">
                          <div>
                              <Label htmlFor="email">Type d'invitation</Label>
                              <select   
                                  className="block mt-1 w-full"
                                  value={selectedRoleValue}
                                  onChange={handleChange}
                                  ref={profileRef}
                              >
                                  {data.profiles.map((item, index) => (
                                          <option key={index} value={item.name}>
                                              { item.name }
                                          </option>
                                  ))}
                              </select>
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
                                  autoFocus
                              />
                          </div>
                      </div>

                      {selectedRoleValue === "Enseignant" && ((
                        <div className="mt-2 pt-3">
                            <div>
                                <Label htmlFor="classroom">Attribuez une salle de classe</Label>
                                <select   
                                    id="classroom"
                                    className="block mt-1 w-full"
                                    value={classroom_id}
                                    onChange={handleChangeClassroom}
                                >
                                    {classrooms.map((classrom, index) => (
                                            <option key={index} value={classrom.id}>
                                                { classrom.name }
                                            </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    { !loading ? 'Envoyer le lien' : 'Envoi en cours ...' }
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

