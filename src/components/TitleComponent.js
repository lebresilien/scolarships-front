import { TextField } from '@/components/Styled'
import Button from '@/components/Button' 

const TitleComponent = ({ 
    save, 
    title, 
    name, 
    handleChange, 
    loading, 
    setShowModal, 
    setUpdate, 
    setName, 
    setUpdateName, 
    setUpdateDescription, 
    setDescription, 
    setFees,
    setSexe,
    setLname,
    setFname,
    setBornPlace,
    setBornAt,
    setFatherName,
    setMotherName,
    setFphone,
    setMphone,
    setQuarter,
    setComming,
    setAllergy,
    setAmount
}) => {
     
    const show = () => {
        setShowModal(true)
        setUpdate  && setUpdate(false)
        setName && setName('') 
        setUpdateDescription && setUpdateDescription('')
        setUpdateName && setUpdateName('')
        setDescription && setDescription('')
        setFees && setFees('')
        setSexe  && setSexe('M')
        setLname && setLname('') 
        setFname && setFname('')
        setBornPlace && setBornPlace('')
        setBornAt && setBornAt('')
        setFatherName && setFatherName('')
        setMotherName && setMotherName('')
        setFphone  && setFphone('')
        setMphone && setMphone('') 
        setQuarter && setQuarter('')
        setComming && setComming('')
        setAllergy && setAllergy('')
        setAmount && setAmount('')
    }
    
    return (

        <div className="flex flex-row pt-5">

            <h3 className="mr-4">{title}</h3>
            
            { save ?
                <form onSubmit={save}>

                    <TextField
                        id="input"
                        type="text"
                        required
                        className="bg-gray-50"
                        placeholder="Entrez le libelle"
                        aria-label="Libelle"
                        value={name}
                        onChange={handleChange}
                    />

                    <Button type="submit" className="ml-4 text-xs" >
                        { !loading ? 'Sauvegarder' : 'Sauvegarde ...' }
                    </Button>

                </form> :

                <Button type="button" className="text-xs" onClick={show} >
                    + Ajouter
                </Button>
            }
        
        </div>
    )
}

export default TitleComponent