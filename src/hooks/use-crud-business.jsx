import { useState } from 'react'
import createUUID from '../utils/generate-uuid'

export default function useCrud() {
  const [business, setBusiness] = useState(() => {
    const storedBusiness = localStorage.getItem('business')
    if (!storedBusiness) localStorage.setItem('business', JSON.stringify([]))
    return storedBusiness ? JSON.parse(storedBusiness) : []
  })

  // Operations CRUD
  const deleteBusiness = (uuid) => {
    setBusiness((prev) => {
      const updatedBusiness = prev.filter((item) => item.uuid !== uuid)
      localStorage.setItem('business', JSON.stringify(updatedBusiness))
      return updatedBusiness
    })
  }

  const addBusiness = (newBusiness) => {
    setBusiness((prev) => {
      const updatedBusiness = [...prev, { ...newBusiness, uuid: createUUID() }]
      localStorage.setItem('business', JSON.stringify(updatedBusiness))
      return updatedBusiness
    })
  }

  const updateBusiness = (uuid, updatedBusiness) => {
    setBusiness((prev) => {
      const businessUpdate = prev.map((business) => {
        if (business.uuid === uuid) {
          return { ...business, ...updatedBusiness }
        }
        return business
      })
      localStorage.setItem('business', JSON.stringify(businessUpdate))
      return businessUpdate
    })
  }

  const findBusiness = (uuid) => {
    return business.find((item) => item.uuid === uuid)
  }

  return {
    business,
    deleteBusiness,
    addBusiness,
    updateBusiness,
    findBusiness,
  }
}
