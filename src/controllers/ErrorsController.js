async function fetchErrors() {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/notification`)
    .then((response) => response.json())
    .then((data) => data)
}

export default fetchErrors
