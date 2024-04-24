import styles from "./app.module.css";
import { useState } from "react";
import { toast } from "sonner";
import { Form, FormBusines, Establishment, Business, Button, ButtonBusiness } from "./components";
import validateEstablishmentFields from "./form-establishment.validate";
import validateBusinessFields from "./form-business.validation";
import useCrud from "./hooks/use-crud.hook";
import useCrudBusiness from "./hooks/use-crud-business";

const INITIAL_ESTABLISHMENT_VALUES = {
  name: "",
  address: "",
  city: "",
  business: "",
};

const INITIAL_BUSINESS_VALUES = {
  name: "",
  address: "",
  city: "",
};

export default function App() {
  const {
    addEstablishment,
    deleteEstablishment,
    updateEstablishment,
    findEstablishment,
    establishments,
  } = useCrud();

  const {
    addBusiness,
    deleteBusiness,
    updateBusiness,
    findBusiness,
    businesses,
  } = useCrudBusiness(); // Uso del hook de negocios

  const [establishment, setEstablishment] = useState(INITIAL_ESTABLISHMENT_VALUES);
  const [business, setBusiness] = useState(INITIAL_BUSINESS_VALUES);
  const [errors, setErrors] = useState({});

  const [establishmentModeForm, setEstablishmentModeForm] = useState("create");
  const [businessModeForm, setBusinessModeForm] = useState("create");

  const handleEstablishmentSubmit = (e, refName) => {
    e.preventDefault();
    const [isValid, errors] = validateEstablishmentFields(establishment);
    if (!isValid) {
      setErrors(errors);
    } else {
      if (establishmentModeForm === "create") {
        handleEstablishmentSave();
      } else if (establishmentModeForm === "update") {
        handleEstablishmentUpdate(establishment.uuid, establishment);
      }
      clearEstablishmentFields();
      clearErrors();
      refName?.current.focus();
      setEstablishmentModeForm("create");
    }
  };

  const handleEstablishmentSave = () => {
    addEstablishment(establishment);
    toast.success("Establecimiento guardado correctamente!");
  };

  const handleEstablishmentUpdate = (uuid, establishment) => {
    updateEstablishment(uuid, establishment);
    toast.success("Establecimiento actualizado con éxito!");
  };

  const handleEstablishmentDelete = (uuid) => {
    deleteEstablishment(uuid);
    toast.error("Establecimiento eliminado");
  };

  const handleBusinessSubmit = (e, refName) => {
    e.preventDefault();
    const [isValid, errors] = validateBusinessFields(business);
    if (!isValid) {
      setErrors(errors);
    } else {
      if (businessModeForm === "create") {
        handleBusinessSave();
      } else if (businessModeForm === "update") {
        handleBusinessUpdate(business.uuid, business);
      }
      clearBusinessFields();
      clearErrors();
      refName?.current.focus();
      setBusinessModeForm("create");
    }
  };

  const handleBusinessSave = () => {
    addBusiness(business);
    toast.success("Negocio guardado correctamente!");
  };

  const handleBusinessUpdate = (uuid, business) => {
    updateBusiness(uuid, business);
    toast.success("Negocio actualizado con éxito!");
  };

  const handleBusinessDelete = (uuid) => {
    deleteBusiness(uuid);
    toast.error("Negocio eliminado");
  };

  const clearEstablishmentFields = () => setEstablishment(INITIAL_ESTABLISHMENT_VALUES);
  const clearBusinessFields = () => setBusiness(INITIAL_BUSINESS_VALUES);
  const clearErrors = () => setErrors({});

  const handleEstablishmentEdit = (uuid) => {
    const establishment = findEstablishment(uuid);
    setEstablishment(establishment);
    setEstablishmentModeForm("update");
  };

  const handleBusinessEdit = (uuid) => {
    const business = findBusiness(uuid);
    setBusiness(business);
    setBusinessModeForm("update");
  };

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>Establecimientos y Negocios</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.containerForm}>
          <h2>Establecimientos</h2>
          <Form
            establishment={establishment}
            handleSubmit={handleEstablishmentSubmit}
            errors={errors}
            changeAddress={(e) =>
              setEstablishment({ ...establishment, address: e.target.value })
            }
            changeCity={(e) =>
              setEstablishment({ ...establishment, city: e.target.value })
            }
            changeName={(e) =>
              setEstablishment({ ...establishment, name: e.target.value })
            }
            changeBusiness={(e) =>
              setEstablishment({ ...establishment, business: e.target.value })
            }
            componentButtons={
              <>
                <Button
                  title={establishmentModeForm === "create" ? "Guardar" : "Actualizar"}
                  type="submit"
                />
                <Button
                  textColor="#000"
                  backgroundColor="#fff"
                  title="Cancelar"
                  onClick={clearEstablishmentFields}
                />
              </>
            }
          />
        </div>
        <div>
          {establishments.length === 0 && <p>No hay establecimientos</p>}
          {establishments.map((establishment) => (
            <Establishment
              key={establishment.uuid}
              establishment={establishment}
              handleDelete={() => handleEstablishmentDelete(establishment.uuid)}
              onClickEdit={() => handleEstablishmentEdit(establishment.uuid)}
            />
          ))}
        </div>
        <div className={styles.containerForm}>
          <h2>Negocios</h2>
          <FormBusines
            business={business}
            handleSubmit={handleBusinessSubmit}
            errors={errors}
            changeAddress={(e) =>
              setBusiness({ ...business, address: e.target.value })
            }
            changeCity={(e) =>
              setBusiness({ ...business, city: e.target.value })
            }
            changeName={(e) =>
              setBusiness({ ...business, name: e.target.value })
            }
            componentButtons={
              <>
                <ButtonBusiness
                  title={businessModeForm === "create" ? "Guardar" : "Actualizar"}
                  type="submit"
                />
                <ButtonBusiness
                  textColor="#000"
                  backgroundColor="#fff"
                  title="Cancelar"
                  onClick={clearBusinessFields}
                />
              </>
            }
          />
        </div>
        <div>
          {businesses.length === 0 && <p>No hay negocios</p>}
          {businesses.map((business) => (
            <Business
              key={business.uuid}
              business={business}
              handleDelete={() => handleBusinessDelete(business.uuid)}
              onClickEdit={() => handleBusinessEdit(business.uuid)}
            />
          ))}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
