import styles from './form.module.css'
import { useState } from 'react'
import PropTypes from 'prop-types'

import Field from '../Field'
import Buton from '../Button'
import createUUID from '../../utils/generate-uuid'

const INITIAL_VALUES = {
  name: '',
  address: '',
  city: ''
}

export default function Form({ onSubmit }) {

  const [establishment, setEstablishment] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState(INITIAL_VALUES)

  const handleCancel = () => {
    clearFields()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateFields()) {
      onSubmit({ uuid: createUUID(), ...establishment })
      clearFields()
    }
  }

  const validateFields = () => {
    let isValid = true
    if (establishment.name.trim() === '') {
      isValid = false
      setErrors((prev) => ({ ...prev, name: 'El nombre es obligatorio' }))
    }
    if (establishment.address.trim() === '') {
      isValid = false
      setErrors((prev) => ({ ...prev, address: 'La dirección es obligatoria' }))
    }
    if (establishment.city.trim() === '') {
      isValid = false
      setErrors((prev) => ({ ...prev, city: 'La ciudad es obligatoria' }))
    }
    return isValid
  }

  const clearFields = () => setEstablishment(INITIAL_VALUES)

  return (
    <div className={styles.containerForm}>
      <h2>Añadir establecimiento</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Field
          label='Nombre'
          type='text'
          value={establishment.name}
          onChange={e => setEstablishment((prev) => ({ ...prev, name: e.target.value }))}
          error={errors.name}
        />
        <Field
          label='Dirección'
          type='text'
          value={establishment.address}
          onChange={e => setEstablishment((prev) => ({ ...prev, address: e.target.value }))}
          error={errors.address}
        />
        <Field
          label='Ciudad'
          type='text'
          value={establishment.city}
          onChange={e => setEstablishment((prev) => ({ ...prev, city: e.target.value }))}
          error={errors.city}
        />
        <div className={styles.containerButtons}>
          <Buton title='Añadir' type='submit' />
          <Buton
            textColor='#000'
            backgroundColor='#fff'
            title='Cancelar'
            onClick={handleCancel}
          />
        </div>
      </form>
    </div>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}