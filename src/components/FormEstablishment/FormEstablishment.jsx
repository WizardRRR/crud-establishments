import { useState } from 'react'
import useCrud from '../../hooks/use-crud.hook'
import styles from './form-establishment.module.css'
import Form from '../Form/Form'
import { toast } from 'sonner'
import Button from '../Button'
import Establishment from '../Establishment'
import validateEstablishmentFields from './validation'
const INITIAL_ESTABLISHMENT_VALUES = {
  name: '',
  address: '',
  city: '',
  business: '',
}

export default function FormEstablishment() {
  const [establishment, setEstablishment] = useState(INITIAL_ESTABLISHMENT_VALUES)
  const [errors, setErrors] = useState({})
  const [establishmentModeForm, setEstablishmentModeForm] = useState('create')

  const handleEstablishmentSubmit = (e, refName) => {
    e.preventDefault()
    const [isValid, errors] = validateEstablishmentFields(establishment)
    if (!isValid) {
      setErrors(errors)
    } else {
      if (establishmentModeForm === 'create') {
        handleEstablishmentSave()
      } else if (establishmentModeForm === 'update') {
        handleEstablishmentUpdate(establishment.uuid, establishment)
      }
      clearEstablishmentFields()
      clearErrors()
      refName?.current.focus()
      setEstablishmentModeForm('create')
    }
  }

  const handleEstablishmentSave = () => {
    addEstablishment(establishment)
    toast.success('Establecimiento guardado correctamente!')
  }

  const handleEstablishmentUpdate = (uuid, establishment) => {
    updateEstablishment(uuid, establishment)
    toast.success('Establecimiento actualizado con éxito!')
  }

  const clearErrors = () => setErrors({})

  const clearEstablishmentFields = () => setEstablishment(INITIAL_ESTABLISHMENT_VALUES)

  const handleEstablishmentDelete = (uuid) => {
    deleteEstablishment(uuid)
    toast.error('Establecimiento eliminado')
  }
  const handleEstablishmentEdit = (uuid) => {
    const establishment = findEstablishment(uuid)
    setEstablishment(establishment)
    setEstablishmentModeForm('update')
  }

  const {
    addEstablishment,
    deleteEstablishment,
    updateEstablishment,
    findEstablishment,
    establishments,
  } = useCrud()
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className={styles.containerForm}>
          <h2>Establecimientos</h2>
          <Form
            establishment={establishment}
            handleSubmit={handleEstablishmentSubmit}
            errors={errors}
            changeAddress={(e) => setEstablishment({ ...establishment, address: e.target.value })}
            changeCity={(e) => setEstablishment({ ...establishment, city: e.target.value })}
            changeName={(e) => setEstablishment({ ...establishment, name: e.target.value })}
            changeBusiness={(e) => setEstablishment({ ...establishment, business: e.target.value })}
            componentButtons={
              <>
                <Button
                  title={establishmentModeForm === 'create' ? 'Guardar' : 'Actualizar'}
                  type='submit'
                />
                <Button
                  textColor='#000'
                  backgroundColor='#fff'
                  title='Cancelar'
                  onClick={clearEstablishmentFields}
                />
              </>
            }
          />
        </div>
        <div className={styles.containerList}>
          {establishments.length === 0 && <p>No hay establecimientos</p>}
          {establishments.map((establishment) => (
            <Establishment
              key={establishment.uuid}
              establishment={establishment}
              handleDelete={() => handleEstablishmentDelete(establishment.uuid)}
              onClickEdit={() => handleEstablishmentEdit(establishment.uuid)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
