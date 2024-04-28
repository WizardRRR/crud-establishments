import styles from './form.module.css'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import Field from '../Field'
import ButtonBusiness from '../ButtonBusiness'
export default function FormBusiness({
  handleSubmit,
  handleCancel,
  business,
  errors,
  changeName,
  changeAddress,
  changeCity,
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
        value={business?.name}
        onChange={changeName}
        error={errors.name}
      />
      <Field
        label='Dirección'
        type='text'
        value={business?.address}
        onChange={changeAddress}
        error={errors?.address}
      />
      <Field
        label='Ciudad'
        type='text'
        value={business?.city}
        onChange={changeCity}
        error={errors?.city}
      />
      <div className={styles.containerButtons}>
        {componentButtons ? (
          componentButtons
        ) : (
          <>
            <ButtonBusiness title='Añadir' type='submit' />
            <ButtonBusiness
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

FormBusiness.propTypes = {
  business: PropTypes.shape({
    uuid: PropTypes.string,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }),
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
  }),
  changeName: PropTypes.func,
  changeAddress: PropTypes.func,
  changeCity: PropTypes.func,
  componentButtons: PropTypes.node,
}
