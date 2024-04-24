import { useState } from "react";
import createUUID from "../utils/generate-uuid";

export default function useCrudBusiness() {
  const [establishments, setEstablishments] = useState(() => {
    const storedEstablishments = localStorage.getItem("establishments");
    if (!storedEstablishments)
      localStorage.setItem("establishments", JSON.stringify([]));
    return storedEstablishments ? JSON.parse(storedEstablishments) : [];
  });

  // Operations CRUD
  const deleteEstablishment = (uuid) => {
    setEstablishments((prev) => {
      const updateEstablishment = prev.filter(
        (establishment) => establishment.uuid !== uuid
      );
      localStorage.setItem(
        "establishments",
        JSON.stringify(updateEstablishment)
      );
      return updateEstablishment;
    });
  };

  const addEstablishment = (establishment) => {
    setEstablishments((prev) => {
      const updateEstablishments = [
        ...prev,
        { ...establishment, uuid: createUUID() },
      ];
      localStorage.setItem(
        "establishments",
        JSON.stringify(updateEstablishments)
      );
      return updateEstablishments;
    });
  };

  const updateEstablishment = (uuid, establishmentUpdate) => {
    setEstablishments((prev) => {
      const establishmentsUpdate = prev.map((establishment) => {
        if (establishment.uuid === uuid) {
          return { ...establishment, ...establishmentUpdate };
        }
        return establishment;
      });
      localStorage.setItem(
        "establishments",
        JSON.stringify(establishmentsUpdate)
      );
      return establishmentsUpdate;
    });
  };

  const findEstablishment = (uuid) => {
    return establishments.find((establishment) => establishment.uuid === uuid);
  };

  return {
    establishments,
    deleteEstablishment,
    addEstablishment,
    updateEstablishment,
    findEstablishment,
  };
}
