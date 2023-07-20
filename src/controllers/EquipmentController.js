async function fetchEquipments() {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/states`)
    .then((response) => response.json())
    .then((data) => data)
}

export default fetchEquipments
