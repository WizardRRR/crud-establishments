import styles from './app.module.css'

import { useState } from 'react'
import { toast } from 'sonner'

import { Form, Establishment, Button } from './components'
import validateFields from './form-establishment.validate'

import useCrud from './use-crud.hook'

const INITIAL_VALUES = {
  name: '',
  address: '',
  city: ''
}

export default function App() {

  const {
    addEstablishment,
    deleteEstablishment,
    updateEstablishment,
    findEstablishment,
    establishments,
    restoreDeletedEstablishments
  } = useCrud()

  const [establishment, setEstablishment] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState(INITIAL_VALUES)
  const [modeForm, setModeForm] = useState('create')

  const handleSubmit = (e, refName) => {
    e.preventDefault()
    const [isValid, errors] = validateFields(establishment)
    if (!isValid) setErrors(errors)
    else {
      if (modeForm === 'create') handleSave(establishment)
      if (modeForm === 'update') handleUpdate(establishment.uuid, establishment)
      clearFields()
      clearErrors()
      refName?.current.focus()
      setModeForm('create')
    }
  }

  const handleSave = (establishment) => {
    addEstablishment(establishment)
    toast.success('Establecimiento guardado correctamente!')
  }

  const handleCancel = () => {
    clearFields()
    setModeForm('create')
  }

  const handleUpdate = (establishmentUuid, establishment) => {
    updateEstablishment(establishmentUuid, establishment)
    toast.success('Actualizado con exito!')
  }

  const handleDelete = (establishmentUuid) => {
    deleteEstablishment(establishmentUuid)
    toast.error('Eliminado')
  }

  // Reset Fields
  const clearFields = () => setEstablishment(INITIAL_VALUES)
  const clearErrors = () => setErrors(INITIAL_VALUES)

  const onClickEdit = (uuid) => {
    const establishment = findEstablishment(uuid)
    setEstablishment(establishment)
    setModeForm('update')
  }

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>Establecimientos</h1>
        <p>Establecimientos registrados en Lima</p>
      </header>
      <main className={styles.main}>
        <div className={styles.containerForm}>
          <h2>Nuevos establecimientos</h2>
          <Form
            establishment={establishment}
            handleSubmit={handleSubmit}
            errors={errors}
            changeAddress={(e) => setEstablishment({ ...establishment, address: e.target.value })}
            changeCity={(e) => setEstablishment({ ...establishment, city: e.target.value })}
            changeName={(e) => setEstablishment({ ...establishment, name: e.target.value })}
            componentButtons={
              <>
                <Button title={modeForm === 'create' ? 'Guardar' : 'Actualizar'} type='submit' />
                <Button
                  textColor='#000'
                  backgroundColor='#fff'
                  title='Cancelar'
                  onClick={handleCancel}
                />
              </>
            }
          />
        </div>
        <div>
          <button onClick={restoreDeletedEstablishments}>Restaurar</button>
          {establishments.length === 0 && <p>No hay establecimientos</p>}
          {establishments.map(establishment => (
            <Establishment
              key={establishment.uuid}
              establishment={establishment}
              handleDelete={handleDelete}
              onClickEdit={onClickEdit}
            />
          ))}
        </div>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  )
} 
