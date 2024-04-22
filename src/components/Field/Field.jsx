import PropTypes from 'prop-types'
import styles from './field.module.css'

export default function Field({ label, type, value, onChange, error }) {
  return (
    <div className={styles.field}>
      <label htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={label}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
}