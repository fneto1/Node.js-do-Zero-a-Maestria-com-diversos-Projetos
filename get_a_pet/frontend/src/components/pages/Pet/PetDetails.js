import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../../utils/api'
import styles from './PetDetails.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage'

const PetDetails = () => {
    const [pet, setPet] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    }, [id])

    async function schedule() {
        let msgType = 'success'
    
        const data = await api
          .patch(`pets/schedule/${pet._id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            console.log(response.data)
            return response.data
          })
          .catch((err) => {
            console.log(err)
            msgType = 'error'
            return err.response.data
          })
    
        setFlashMessage(data.message, msgType)
      }

    return (
        <>
            {pet.name && (
                <div className={styles.pet_details_container}>
                    <div className={styles.pet_details_header}>
                        <h1>Conhecendo o pet: {pet.name}</h1>
                        <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
                    </div>

                    <div className={styles.pet_images}>
                        {pet.images.map((image, index) => (
                            <img 
                            src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                            alt={pet.name}
                            key={index} />
                        ))}
                    </div>
                    <p>
                        <spam className="bold">Peso: </spam> {pet.weight}kg
                    </p>
                    <p>
                        <spam className="bold">Idade: </spam> {pet.age} {pet.age > 1 ? ('anos') : ('ano')}
                    </p>
                    {token ? (
                        <button onClick={schedule} >Solicitar uma visita</button>
                    ):(
                        <p> <Link to='/register'>Crie uma conta</Link> e solicite uma visita!</p>
                    )}
                </div>
            )}
        </>
    )
}

export default PetDetails