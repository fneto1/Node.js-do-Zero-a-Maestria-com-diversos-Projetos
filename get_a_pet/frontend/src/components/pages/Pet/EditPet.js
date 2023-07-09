import React, {useState, useEffect} from 'react'
import api from '../../../utils/api'
import styles from './AddPet.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage'
import PetForm from '../../form/PetForm'
import { useParams } from 'react-router-dom'

const EditPet = () => {
    const [pet, setPet] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const {id} = useParams()

    useEffect(() => {
        api.get(`/pets/${id}`, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPet(response.data.pet)
        })
    }, [token, id])

    async function updatePet(pet){
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                for(let i = 0; i < pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`/pets/${pet._id}`, formData, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            return response.data
        }).catch((error) => {
            msgType = 'error'
            return error.response.data
        })

        setFlashMessage(data.message, msgType)
    }

  return (
    <div>
        <div className={styles.addpet_header}>
            <h1>Editando o pet: {pet.name}</h1>
            <p>Depois da edição os dados serão atualizados no sistema</p>
        </div>
        {pet.name && (
            <PetForm handleSubmit={updatePet} btnText="Atualizar" petData={pet} />
        )}
    </div>
  )
}

export default EditPet