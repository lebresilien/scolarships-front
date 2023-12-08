import { Fragment, useState } from 'react'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import { Dialog, Transition } from '@headlessui/react'
import Button from './Button'
import Label from './Label'
import Input from './Input'
import Textarea from './Textarea'
import Select from 'react-select'

const ModalSection = ({
    type, 
    setSelectedGroup, 
    setGroup_id, 
    group_id, 
    open, 
    setOpen, 
    title, 
    update, 
    state, 
    setState, 
    name, 
    description, 
    setName, 
    setDescription, 
    id, 
    loading, 
    setLoading, 
    setPending, 
    save, 
    edit, 
    additional, 
    selectedGroup, 
    coeff, 
    setCoeff, 
    setUnit_id, 
    unit_id, 
    fees, 
    setFees, 
    section_id, 
    setSection_id, 
    other, 
    selectedOther,
    building_id, 
    setBuilding_id, 
    setSelectedOther,
    lname,
    fname,
    sexe,
    born_place,
    born_at,
    father_name,
    mother_name,
    fphone,
    mphone,
    quarter,
    comming,
    allergy,
    setLname,
    setFname,
    setSexe,
    setBornPlace,
    setBornAt,
    setFatherName,
    setMotherName,
    setFphone,
    setMphone,
    setQuarter,
    setComming,
    setAllergy,
    classroom_id,
    setClassroom_id,
    amount, 
    setAmount,
    options,
    status,
    setStatus,
    selectedStatus,
    setSelectedStatus
 }) => {

    const [errors, setErrors] = useState([])

    const submitForm = (e) => {

        e.preventDefault();

        {update ? 
            edit({
                id, 
                type, 
                name, 
                fees, 
                description, 
                setLoading, 
                setPending, 
                setErrors, 
                setState, 
                setOpen, 
                state, 
                group_id, 
                additional, 
                setUnit_id, 
                coeff, 
                setCoeff, 
                unit_id, 
                setSection_id, 
                section_id, 
                building_id, 
                setBuilding_id, 
                other,
                allergy,
                comming,
                quarter,
                mphone,
                fphone,
                mother_name,
                father_name,
                born_at,
                born_place,
                sexe,
                fname,
                lname,
                status
            }) :
            save({ 
                fees, 
                setFees, 
                name, 
                description, 
                setName, 
                setDescription, 
                setLoading, 
                setPending, 
                setErrors, 
                setState, 
                state, 
                group_id, 
                additional, 
                type, 
                coeff, 
                setCoeff, 
                setUnit_id, 
                unit_id, 
                setSection_id, 
                section_id, 
                building_id, 
                setBuilding_id, 
                other,
                allergy,
                comming,
                quarter,
                mphone,
                fphone,
                mother_name,
                father_name,
                born_at,
                born_place,
                sexe,
                fname,
                lname,
                classroom_id,
                amount,
                setLname,
                setFname,
                setSexe,
                setBornPlace,
                setBornAt,
                setFatherName,
                setMotherName,
                setFphone,
                setMphone,
                setQuarter,
                setComming,
                setAllergy
             })
        }
    }

    const handleChange = (newValue) => {
        if(type === "units") setGroup_id(newValue.value) 
        else if(type === "courses") setUnit_id(newValue.value)
        else if(type === "groups") setSection_id(newValue.value)
        else if(type === "classrooms") setGroup_id(newValue.value)
        else if(type === "students") setClassroom_id(newValue.value)
        else setSection_id('')
        update && setSelectedGroup(newValue)
    }

    const handleChangeOther = (newValue) => {
        setBuilding_id && setBuilding_id(newValue.value)
        update && setSelectedOther(newValue)
    }

    const handleChangeStatus = (newValue) => {
        setStatus(newValue.value)
        setSelectedStatus(newValue)
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

                                            {type !== "students" && ((
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
                                            ))}

                                            {type == "sequences" && update && ((
                                                <div className="mt-2 pt-3">
                                                    <Label htmlFor="state">Etat </Label>
                                                    <div>
                                                        <Select options={options} onChange={handleChangeStatus} value={selectedStatus} />
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            {additional && type !== 'students' && ((
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

                                            {type === "students" && ((

                                                <div>
                                                    <fieldset className="px-2 my-3 border-2 border-gray-100">

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
                                                                    value={fname}
                                                                    onChange={(e) => setFname(e.target.value)}
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
                                                                    value={lname}
                                                                    onChange={(e) => setLname(e.target.value)}
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
                                                                    value={born_at}
                                                                    onChange={(e) => setBornAt(e.target.value)}
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
                                                                    value={born_place}
                                                                    onChange={(e) => setBornPlace(e.target.value)}
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
                                                                            checked={sexe === "M" ? true : false}
                                                                            value={sexe}
                                                                            onChange={() => setSexe('M')}
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
                                                                            checked={sexe === "F" ? true : false}
                                                                            value={sexe}
                                                                            onChange={() => setSexe('F')}
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
                                                                    value={quarter}
                                                                    onChange={(e) => setQuarter(e.target.value)}
                                                                />
                                                            </div>

                                                            <div className="mt-3 pt-3 col-span-6">
                                                                <div>
                                                                    <Label htmlFor="name">Etablissement de provenance </Label>
                                                                    <Input
                                                                        id="comming"
                                                                        type="text"
                                                                        value={comming}
                                                                        className="block mt-1 w-full bg-gray-50"
                                                                        onChange={(e) => setComming(e.target.value)}
                                                                    />
                                                                </div>
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
                                                                    value={allergy}
                                                                    onChange={(e) => setAllergy(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </fieldset>

                                                    <fieldset className="px-2 my-3 border-2 border-gray-100">

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
                                                                    value={father_name}
                                                                    onChange={(e) => setFatherName(e.target.value)}
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
                                                                    value={fphone}
                                                                    onChange={(e) => setFphone(e.target.value)}
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
                                                                    value={mother_name}
                                                                    onChange={(e) => setMotherName(e.target.value)}
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
                                                                    value={mphone}
                                                                    onChange={(e) => setMphone(e.target.value)}
                                                                />
                                                            </div>

                                                        </div>
                                                    </fieldset>

                                                    {!update && ((
                                                        <fieldset className="px-2 my-3 border-2 border-gray-100">
                                                            
                                                            <legend className="text-medium font-medium text-gray-900">Informations relative à la salle de classe</legend>
                                                            
                                                            <div className="grid grid-cols-6 gap-6 my-3">

                                                                <div className="col-span-6 sm:col-span-3">

                                                                    <Label htmlFor="classroom" className="block text-sm font-medium text-gray-700">
                                                                        Selectionner la salle de classe <span className="text-red-500">*</span>
                                                                    </Label>
                                                                    <Select options={additional}  onChange={handleChange} />

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
                                                                        onChange={(e) => setAmount(e.target.value)}
                                                                    />

                                                                </div>

                                                            </div>
                                                        
                                                        </fieldset>
                                                    ))}
                                                </div>
                                            ))}

                                            {type !== "students" && ((
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
                                            ))}

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