import styles from './app.module.css'
import FormBusiness from './components/FormBusiness/FormBusiness'
import FormEstablishment from './components/FormEstablishment/FormEstablishment'

export default function App() {
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>Establecimientos y Negocios</h1>
      </header>
      <main className={styles.main}>
        {/* Component form business */}

        <FormBusiness />
        {/* Component form establishment */}
        <FormEstablishment />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  )
}
