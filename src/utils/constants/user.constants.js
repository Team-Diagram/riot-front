import jwtDecode from 'jwt-decode'

function getUserData() {
  const token = localStorage.getItem('token')
  const tokenDecode = token && jwtDecode(token)

  return tokenDecode
}

export default getUserData
