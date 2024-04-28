import styles from './button.module.css'
import PropTypes from 'prop-types'

export default function ButtonBusiness({
  title = 'default button',
  onClick,
  type = 'button',
  backgroundColor = 'var(--primary-color)',
  textColor = 'var(--color-white)',
  children,
}) {
  return (
    <button
      style={{ backgroundColor, color: textColor }}
      className={`${styles.button} flex red`}
      type={type}
      onClick={onClick}
    >
      {children}
      {!children && title}
    </button>
  )
}

ButtonBusiness.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  children: PropTypes.node,
}
