const saveToken = (token, name = 'token') => localStorage.setItem(name, token)
const getToken = (name = 'token') => localStorage.getItem(name)
const removeToken = (name = 'token') => localStorage.removeItem(name)

export {
  saveToken,
  getToken,
  removeToken,
}