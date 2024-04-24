import { useState } from "react";
import createUUID from "../utils/generate-uuid";

export default function useCrud() {
  const [businesses, setBusinesses] = useState(() => {
    const storedBusinesses = localStorage.getItem("businesses");
    if (!storedBusinesses)
      localStorage.setItem("businesses", JSON.stringify([]));
    return storedBusinesses ? JSON.parse(storedBusinesses) : [];
  });

  // Operations CRUD
  const deleteBusiness = (uuid) => {
    setBusinesses((prev) => {
      const updatedBusinesses = prev.filter(
        (item) => item.uuid !== uuid
      );
      localStorage.setItem("businesses", JSON.stringify(updatedBusinesses));
      return updatedBusinesses;
    });
  };

  const addBusiness = (newBusiness) => {
    setBusinesses((prev) => {
      const updatedBusinesses = [
        ...prev,
        { ...newBusiness, uuid: createUUID() },
      ];
      localStorage.setItem("businesses", JSON.stringify(updatedBusinesses));
      return updatedBusinesses;
    });
  };

  const updateBusiness = (uuid, updatedBusiness) => {
    setBusinesses((prev) => {
      const updatedBusinesses = prev.map((item) => {
        if (item.uuid === uuid) {
          return { ...item, ...updatedBusiness };
        }
        return item;
      });
      localStorage.setItem("businesses", JSON.stringify(updatedBusinesses));
      return updatedBusinesses;
    });
  };

  const findBusiness = (uuid) => {
    return businesses.find((item) => item.uuid === uuid);
  };

  return {
    businesses,
    deleteBusiness,
    addBusiness,
    updateBusiness,
    findBusiness,
  };
}
