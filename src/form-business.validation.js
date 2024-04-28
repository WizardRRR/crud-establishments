const validateFieldsBusiness = (business) => {
  let errors = {}
  let isValid = true

  if (business.name.trim() === '') {
    isValid = false
    errors.name = 'El nombre es obligatorio'
  }
  if (business.address.trim() === '') {
    isValid = false
    errors.address = 'La dirección es obligatoria'
  }
  if (business.city.trim() === '') {
    isValid = false
    errors.city = 'La ciudad es obligatoria'
  }
  return [isValid, errors]
}

export default validateFieldsBusiness
