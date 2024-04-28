import styles from './form-business.module.css'
import PropTypes from 'prop-types'
import { useState } from 'react'
import ButtonBusiness from '../ButtonBusiness'
import useCrudBusiness from '../../hooks/use-crud-business.jsx'
import validateFieldsBusiness from '../../form-business.validation.js'
import { toast } from 'sonner'
import Business from '../Business/Business.jsx'
import FormBusiness from '../Form/FormBusiness.jsx'

const INITIAL_BUSINESS_VALUES = {
  name: '',
  address: '',
  city: '',
}

export default function BusinessForm() {
  const [businessData, setBusinessData] = useState(INITIAL_BUSINESS_VALUES)
  const [errorsBusiness, setErrorsBusiness] = useState(INITIAL_BUSINESS_VALUES)
  const [businessModeForm, setBusinessModeForm] = useState('create')

  const handleBusinessSubmit = (e, refName) => {
    e.preventDefault()
    const [isValid, errors] = validateFieldsBusiness(businessData)
    if (!isValid) {
      setErrorsBusiness(errors)
    } else {
      if (businessModeForm === 'create') {
        handleBusinessSave()
      } else if (businessModeForm === 'update') {
        handleBusinessUpdate(businessData.uuid, businessData)
      }
      clearBusinessFields()
      clearErrors()
      refName?.current.focus()
      setBusinessModeForm('create')
    }
  }

  const clearErrors = () => setErrorsBusiness(INITIAL_BUSINESS_VALUES)

  const handleBusinessSave = () => {
    addBusiness(businessData)
    toast.success('Negocio guardado correctamente!')
  }

  const handleBusinessUpdate = (uuid, business) => {
    updateBusiness(uuid, business)
    toast.success('Negocio actualizado con éxito!')
  }

  const handleBusinessDelete = (uuid) => {
    deleteBusiness(uuid)
    toast.error('Negocio eliminado')
  }

  const clearBusinessFields = () => setBusinessData(INITIAL_BUSINESS_VALUES)

  const handleBusinessEdit = (uuid) => {
    const business = findBusiness(uuid)
    setBusinessData(business)
    setBusinessModeForm('update')
  }

  const { business, deleteBusiness, addBusiness, updateBusiness, findBusiness } = useCrudBusiness()

  return (
    <div style={{ display: 'flex' }}>
      <div className={styles.containerForm}>
        <h2>Negocios</h2>
        <FormBusiness
          business={businessData}
          handleSubmit={handleBusinessSubmit}
          errors={errorsBusiness}
          changeAddress={(e) => setBusinessData({ ...businessData, address: e.target.value })}
          changeCity={(e) => setBusinessData({ ...businessData, city: e.target.value })}
          changeName={(e) => setBusinessData({ ...businessData, name: e.target.value })}
          componentButtons={
            <>
              <ButtonBusiness
                title={businessModeForm === 'create' ? 'Guardar' : 'Actualizar'}
                type='submit'
              />
              <ButtonBusiness
                textColor='#000'
                backgroundColor='#fff'
                title='Cancelar'
                onClick={clearBusinessFields}
              />
            </>
          }
        />
      </div>
      <div>
        {business.length === 0 && <p>No hay negocios</p>}
        {business.map((business) => (
          <Business
            key={business.uuid}
            business={business}
            handleDelete={() => handleBusinessDelete(business.uuid)}
            onClickEdit={() => handleBusinessEdit(business.uuid)}
          />
        ))}
      </div>
    </div>
  )
}

BusinessForm.propTypes = {
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
