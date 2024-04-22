import styles from './app.module.css'
import { useState } from 'react'
import { Form } from './components'
import { toast } from 'sonner'
import Establihsment from './components/Establishment/Establishment'

export default function App() {

  const [establishments, setEstablishments] = useState([])

  const addEstablishment = (establishment) => {
    setEstablishments(prev => [...prev, establishment])
  }

  const handleDelete = (establishmentUuid) => {
    setEstablishments(prev => {
      const updateEstablishment = prev.filter(establishment => establishment.uuid !== establishmentUuid)
      return updateEstablishment
    })
    toast.error('Eliminado')
  }

  const handleUpdate = (establishmentUuid) => {
    console.log(establishmentUuid)
    // TODO: Implementar la actualización de un establecimiento
  }

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>Establicimientos</h1>
        <p>Establecimientos registrados en lima</p>
      </header>
      <main className={styles.main}>
        <Form onSubmit={addEstablishment} />
        <div>
          {establishments.length === 0 && <p>No hay establecimientos</p>}
          {establishments.map(establishment => (
            <Establihsment
              key={establishment.uuid}
              establishment={establishment}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  )
} 
