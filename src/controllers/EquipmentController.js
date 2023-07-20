/* eslint-disable arrow-body-style */

const fetchEquipments = () => {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/states`)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}

export default fetchEquipments
