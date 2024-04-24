import styles from './button.module.css'
import PropTypes from 'prop-types'

export default function Buton({
  title = 'default button',
  onClick,
  type = 'button',
  children
}) {
  return (
    <button
      style={{}}
      className={`${styles.button} flex`}
      type={type}
      onClick={onClick}
    >
      {children}
      {!children && title}
    </button>
  )
}

Buton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node
}