function fetchEquipmentsState(token, target, placeId, valueVariator) {
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
}

export default fetchEquipmentsState
