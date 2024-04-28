import PropTypes from 'prop-types'
import styles from './business.module.css'
import Button from '../ButtonBusiness'
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md'

export default function Business({ business, handleDelete, onClickEdit }) {
  const { uuid, name, address, city } = business

  return (
    <div className={styles.establishment}>
      <p>{name}</p>
      <p>{address}</p>
      <p>{city}</p>
      <Button onClick={() => handleDelete(uuid)} backgroundColor='red'>
        <MdDeleteOutline size={20} />
      </Button>
      <Button onClick={() => onClickEdit(uuid)} backgroundColor='blue'>
        <MdOutlineModeEdit size={20} />
      </Button>
    </div>
  )
}

Business.propTypes = {
  business: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
}
