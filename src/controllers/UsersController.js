/* eslint-disable arrow-body-style */

const fetchUsers = (token) => {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  }
  headers.Authorization = `Bearer ${token}`

  return fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/all`, { headers })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}

const deleteUser = async (id, token) => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/user/delete/${id}`

  await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
}

const addUser = async (user, token) => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/user`

  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      admin: user.admin === 'on',
    }),
  })
    .then((response) => response.json())
}

const changeRole = (selectedRole, uuid, token) => {
  fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/update/${uuid}`, {
    method: 'PUT',
    body: JSON.stringify({
      roles: selectedRole === 'Admin' ? ['ROLE_ADMIN'] : ['ROLE_USER'],
      admin: selectedRole === 'Admin',
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
}

export {
  fetchUsers, deleteUser, addUser, changeRole,
}
