/* eslint-disable arrow-body-style */

const fetchErrors = () => {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/notification`)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}

export default fetchErrors
