/* eslint-disable arrow-body-style */

const fetchEquipments = () => {
  return fetch('http://localhost:8787/states')
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}

export default fetchEquipments
