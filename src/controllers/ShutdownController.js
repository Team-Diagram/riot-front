/* eslint-disable arrow-body-style */

const shutDownPlace = (action, id, token) => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/switchAll/${action}`
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(
      {
        place_id: id,
      },
    ),
  })
    .then((response) => response.json())
}

export default shutDownPlace
