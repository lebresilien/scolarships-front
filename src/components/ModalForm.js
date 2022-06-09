import { Fragment, useState,useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useUser } from '@/hooks/user'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import Button from '@/components/Button'
import Label from '@/components/Label'
import data from '@/hooks/mock'

export default function Modal({open, setOpen, sections, setSections, buildings,setBuildings, groups, setGroups, defaultSection, defaultGroup, defaultBuilding })  {
 
  const { addSection, addGroup, addBuilding, addClassroom } = useUser({
    middleware: 'auth',
  })

 const [errors, setErrors] = useState([])
 const [name, setName] = useState('')
 const [description, setDescription] = useState('')
 const [loading, setLoading] = useState(false)
 const [content, setContent] = useState('section')
 const [fees, setFees] = useState('')
 const [section_id, setSectionValue] = useState('')
 const [group_id, setGroupValue] = useState('')
 const [building_id, setBuildingValue] = useState('')

useEffect(() => {
    setSectionValue(defaultSection)
    setGroupValue(defaultGroup)
    setBuildingValue(defaultBuilding)
},[])
 
 const submitForm = event => {
  event.preventDefault()

  { content === "section" && ((
    addSection({ name, description, content, setName, setDescription, setLoading, setSections, setErrors })
  ))}
  
  { content === "groupe" && ((
    addGroup({ name, description, section_id, fees, setName, setDescription, setGroups, setLoading, setErrors })
  ))}

  { content === "batiment" && ((
    addBuilding({ name, description, setLoading, setName,setDescription, setBuildings, setErrors })
  ))}

  { content === "classe" &&
    addClassroom({ name, description, building_id, group_id, setName, setDescription, setLoading, setErrors })
  }
  
}

const handleChange = (e) =>  setContent(e.target.value) 
const handleChangeSection = (e) =>  setSectionValue(e.target.value)
const handleChangeGroup = (e) => setGroupValue(e.target.value)
const handleChangeBuilding = (e) => setBuildingValue(e.target.value)

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
            <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white pt-3 pb-4 sm:py-4 sm:pb-4">
                  <div className="sm:flex flex-col">
                    <div className="mt-1 text-center sm:mt-0 sm:text-left divide-y w-full">
                      
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 px-2">
                            Ajouter du contenu
                        </Dialog.Title>

                        <div className="px-2">
                            <AuthValidationErrors className="mb-4 mt-5" errors={errors} />
                        </div>

                        <form onSubmit={submitForm} className="bg-gray-50 px-2">
                            <div className="mt-2 pt-3">
                                <div>
                                    <Label htmlFor="email">Type de contenu</Label>
                                    <select   
                                        className="block mt-1 w-full"
                                        value={content}
                                        onChange={handleChange}
                                    >
                                        {data.contents.map((content, index) => (
                                                <option key={index} value={content.name}>
                                                    { content.name }
                                                </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            { content === "section" && ((
                                
                                <div>
                                  <div className="mt-2 pt-3">
                                      <div>
                                          <Label htmlFor="name">Libellé </Label>

                                          <Input
                                              id="name"
                                              type="text"
                                              value={name}
                                              className="block mt-1 w-full"
                                              onChange={event => setName(event.target.value)}
                                              required
                                              autoFocus
                                          />
                                      </div>
                                  </div>

                                  <div className="mt-2 pt-3">
                                      <div>
                                          <Label htmlFor="description">Description </Label>

                                          <Textarea
                                              id="description"
                                              value={description}
                                              className="block mt-1 w-full"
                                              onChange={event => setDescription(event.target.value)}
                                          />
                                      </div>
                                  </div>

                                </div>

                            ))}

                            { content === "groupe"  && ((

                                <div className="">

                                  <div className="mt-2 pt-3">
                                      <div>
                                          <Label htmlFor="name">Libellé </Label>

                                          <Input
                                              id="name"
                                              type="text"
                                              value={name}
                                              className="block mt-1 w-full"
                                              onChange={event => setName(event.target.value)}
                                              required
                                              autoFocus
                                          />
                                      </div>
                                  </div>

                                  <div className="mt-2 pt-3">
                                      <div>
                                          <Label htmlFor="fees">Montant scolarité </Label>

                                          <Input
                                              id="fees"
                                              type="number"
                                              value={fees}
                                              className="block mt-1 w-full"
                                              onChange={event => setFees(event.target.value)}
                                              required
                                              autoFocus
                                          />
                                      </div>
                                  </div>

                                  <div className="mt-2 pt-3">
                                    <div>
                                        <Label htmlFor="email">Type de contenu</Label>
                                        <select   
                                            className="block mt-1 w-full"
                                            value={section_id}
                                            onChange={handleChangeSection}
                                        >
                                            {sections.map((section, index) => (
                                                    <option key={index} value={section.id}>
                                                        { section.name }
                                                    </option>
                                            ))}
                                        </select>
                                    </div>
                                  </div>

                                  <div className="mt-2 pt-3">
                                      <div>
                                          <Label htmlFor="description">Description </Label>

                                          <Textarea
                                              id="description"
                                              value={description}
                                              className="block mt-1 w-full"
                                              onChange={event => setDescription(event.target.value)}
                                          />
                                      </div>
                                  </div>
                                </div>
                            ))}

                            { content === "batiment" && ((
                              <div>
                                <div className="mt-2 pt-3">
                                    <div>
                                        <Label htmlFor="name">Libellé </Label>

                                        <Input
                                            id="name"
                                            type="text"
                                            value={name}
                                            className="block mt-1 w-full"
                                            onChange={event => setName(event.target.value)}
                                            required
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div className="mt-2 pt-3">
                                    <div>
                                        <Label htmlFor="description">Description </Label>

                                        <Textarea
                                            id="description"
                                            value={description}
                                            className="block mt-1 w-full"
                                            onChange={event => setDescription(event.target.value)}
                                        />
                                    </div>
                                </div>

                              </div>

                            ))}


                            { content === "classe"  && ((

                              <div className="">

                                <div className="mt-2 pt-3">
                                    <div>
                                        <Label htmlFor="name">Libellé </Label>

                                        <Input
                                            id="name"
                                            type="text"
                                            value={name}
                                            className="block mt-1 w-full"
                                            onChange={event => setName(event.target.value)}
                                            required
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div className="mt-2 pt-3">
                                    <div>
                                        <Label>Sélectionnez le groupe</Label>
                                        <select   
                                            className="block mt-1 w-full"
                                            value={group_id}
                                            onChange={handleChangeGroup}
                                        >
                                            {groups.map((group, index) => (
                                                    <option key={index} value={group.id}>
                                                        { group.name }
                                                    </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-2 pt-3">
                                    <div>
                                        <Label>Sélectionnez le batiment</Label>
                                        <select   
                                            className="block mt-1 w-full"
                                            value={building_id}
                                            onChange={handleChangeBuilding}
                                        >
                                            {buildings.map((building, index) => (
                                                    <option key={index} value={building.id}>
                                                        { building.name }
                                                    </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-2 pt-3">
                                    <div>
                                        <Label htmlFor="description">Description </Label>

                                        <Textarea
                                            id="description"
                                            value={description}
                                            className="block mt-1 w-full"
                                            onChange={event => setDescription(event.target.value)}
                                        />
                                    </div>
                                </div>

                              </div>

                            ))}
                            

                            <div className="px-4 py-3 sm:px-1 sm:flex sm:flex-row justify-between">
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


