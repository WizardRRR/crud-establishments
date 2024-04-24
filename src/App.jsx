import styles from "./app.module.css";
import FormBusiness from "./components/FormBusiness/FormBusiness";
import FormEstablishment from "./components/FormEstablishment/FormEstablishment";


// const INITIAL_BUSINESS_VALUES = {
//   name: "",
//   address: "",
//   city: "",
// };

export default function App() {

  // const {
  //   addBusiness,
  //   deleteBusiness,
  //   updateBusiness,
  //   findBusiness,
  //   businesses,
  // } = useCrudBusiness(); // Uso del hook de negocios

  // const [business, setBusiness] = useState(INITIAL_BUSINESS_VALUES);
  // const [errorsBusiness, setErrorsBusiness] = useState(INITIAL_BUSINESS_VALUES);

  // const [businessModeForm, setBusinessModeForm] = useState("create");


  // const handleBusinessSubmit = (e, refName) => {
  //   e.preventDefault();
  //   const [isValid, errors] = validateBusinessFields(business);
  //   if (!isValid) {
  //     setErrorsBusiness(errors)
  //   } else {
  //     if (businessModeForm === "create") {
  //       handleBusinessSave();
  //     } else if (businessModeForm === "update") {
  //       handleBusinessUpdate(business.uuid, business);
  //     }
  //     clearBusinessFields();
  //     clearErrors();
  //     refName?.current.focus();
  //     setBusinessModeForm("create");
  //   }
  // };

  // const clearErrors = () => setErrorsBusiness(INITIAL_BUSINESS_VALUES)

  // const handleBusinessSave = () => {
  //   addBusiness(business);
  //   toast.success("Negocio guardado correctamente!");
  // };

  // const handleBusinessUpdate = (uuid, business) => {
  //   updateBusiness(uuid, business);
  //   toast.success("Negocio actualizado con éxito!");
  // };

  // const handleBusinessDelete = (uuid) => {
  //   deleteBusiness(uuid);
  //   toast.error("Negocio eliminado");
  // };

  // const clearBusinessFields = () => setBusiness(INITIAL_BUSINESS_VALUES);

  // const handleBusinessEdit = (uuid) => {
  //   const business = findBusiness(uuid);
  //   setBusiness(business);
  //   setBusinessModeForm("update");
  // };

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
  );
}
