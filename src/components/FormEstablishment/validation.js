const validateFieldsBusiness = (establishment) => {
  let errors = {}
  let isValid = true

  if (establishment.name.trim() === '') {
    isValid = false
    errors.name = 'El nombre es obligatorio'
  }
  if (establishment.address.trim() === '') {
    isValid = false
    errors.address = 'La dirección es obligatoria'
  }
  if (establishment.city.trim() === '') {
    isValid = false
    errors.city = 'La ciudad es obligatoria'
  }
  if (establishment.business.trim() === '') {
    isValid = false
    errors.business = 'El negocio es obligatoria'
  }
  return [isValid, errors]
}

export default validateFieldsBusiness
