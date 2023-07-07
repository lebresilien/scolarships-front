import { TextField } from '@/components/Styled'
import Button from '@/components/Button' 

const TitleComponent = ({ save, title, name, handleChange, loading, setShowModal, setUpdate, setName, setUpdateName, setUpdateDescription, setDescription, setFees }) => {
     
    const show = () => {
        setShowModal(true)
        setUpdate  && setUpdate(false)
        setName && setName('') 
        setUpdateDescription && setUpdateDescription('')
        setUpdateName && setUpdateName('')
        setDescription && setDescription('')
        setFees && setFees('')
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