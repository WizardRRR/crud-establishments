import styles from './form.module.css'
import PropTypes from 'prop-types'
import Field from '../Field'
import Buton from '../Button'
import { useRef } from 'react'

export default function Form({
  handleSubmit,
  handleCancel,
  establishment,
  errors,
  changeName,
  changeAddress,
  changeCity,
  changeBusiness,
  componentButtons,
}) {
  const refName = useRef(null)
  const onSubmit = (e) => {
    handleSubmit(e, refName)
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Field
        ref={refName}
        label='Nombre'
        type='text'
        value={establishment?.name}
        onChange={changeName}
        error={errors.name}
      />
      <Field
        label='Dirección'
        type='text'
        value={establishment?.address}
        onChange={changeAddress}
        error={errors?.address}
      />
      <Field
        label='Ciudad'
        type='text'
        value={establishment?.city}
        onChange={changeCity}
        error={errors?.city}
      />
      <Field
        label='Negocio'
        type='text'
        value={establishment?.business}
        onChange={changeBusiness}
        error={errors?.business}
      />
      <div className={styles.containerButtons}>
        {componentButtons ? (
          componentButtons
        ) : (
          <>
            <Buton title='Añadir' type='submit' />
            <Buton
              textColor='#000'
              backgroundColor='#fff'
              title='Cancelar'
              onClick={handleCancel}
            />
          </>
        )}
      </div>
    </form>
  )
}

Form.propTypes = {
  establishment: PropTypes.shape({
    uuid: PropTypes.string,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    business: PropTypes.string.isRequired,
  }),
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    business: PropTypes.string,
  }),
  changeName: PropTypes.func,
  changeAddress: PropTypes.func,
  changeCity: PropTypes.func,
  changeBusiness: PropTypes.func,
  componentButtons: PropTypes.node,
}
