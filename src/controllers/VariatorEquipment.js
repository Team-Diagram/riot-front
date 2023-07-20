/* eslint-disable arrow-body-style */

const fetchEquipmentsState = (token, target, placeId,valueVariator) => {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/api/switch/${target}`, {
    method: 'POST',
    body: JSON.stringify({
      place_id: placeId,
      value: valueVariator,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      //window.location.reload()
    })
    .catch((error) => {
      console.error(error)
    })
}

export default fetchEquipmentsState
