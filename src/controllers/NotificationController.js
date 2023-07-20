/* eslint-disable arrow-body-style */

const fetchNotifications = () => {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/notification`)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}

export default fetchNotifications
