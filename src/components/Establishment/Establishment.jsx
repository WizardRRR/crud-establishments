import PropTypes from 'prop-types'

import styles from './establishment.module.css'
import Button from '../Button'

import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md'
export default function Establihsment({
  establishment,
  handleDelete,
  handleUpdate
}) {

  const { uuid, name, address, city } = establishment

  return (
    <div className={styles.establishment}>
      <p >{name}</p>
      <p >{address}</p>
      <p >{city}</p>
      <Button onClick={() => handleDelete(uuid)} backgroundColor='red'>
        <MdDeleteOutline size={20} />
      </Button>
      <Button onClick={() => handleUpdate(uuid)} backgroundColor='blue'>
        <MdOutlineModeEdit size={20} />
      </Button>
    </div>
  )
}

Establihsment.propTypes = {
  establishment: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
}