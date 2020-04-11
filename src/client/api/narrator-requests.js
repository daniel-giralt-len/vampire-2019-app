import { get, post } from './fetch-wrappers'

const narratorRequests = {
  isAdminPasswordSet: () => get('admin-password-set'),
  setAdminPassword: password => post('admin-password-set', {password}),
  checkAdminPassword: password => post('admin/password', {password}),
  verifyAdminToken: token => post('admin/verify-token', {token}),
  setDate: epoch => post('date', {epoch}),
  setWeather: weather => post('weather', {weather})
}

export default narratorRequests