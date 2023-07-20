async function fetchStatistics() {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/voltage`)
    .then((response) => response.json())
    .then((data) => data)
}

export default fetchStatistics
