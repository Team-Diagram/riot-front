/* eslint-disable arrow-body-style */

const fetchStatistics = () => {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/voltage`)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}

export default fetchStatistics
