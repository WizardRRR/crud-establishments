import PropTypes from 'prop-types'
import styles from './establishment.module.css'
import Button from '../Button'

import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md'
export default function Establihsment({
  establishment,
  handleDelete,
  onClickEdit
}) {

  const { uuid, name, address, city, business} = establishment

  return (
    <div className={styles.establishment}>
        <div>
        <p>{name}</p>
        <p>{address}</p>
        <p>{city}</p>
        <p>{business}</p>
        </div>
        <div>
        <Button onClick={() => handleDelete(uuid)} backgroundColor='red'>
          <MdDeleteOutline size={20} />
        </Button>
        <Button onClick={() => onClickEdit(uuid)} backgroundColor='blue'>
          <MdOutlineModeEdit size={20} />
        </Button>
        </div>
      </div>

  )
}

Establihsment.propTypes = {
  establishment: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    business: PropTypes.string.isRequired
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired
}