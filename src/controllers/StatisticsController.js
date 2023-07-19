/* eslint-disable arrow-body-style */

const fetchStatistics = () => {
  return fetch('http://localhost:8787/voltage')
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}

export default fetchStatistics
