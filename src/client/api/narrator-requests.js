import { get, post, put } from './fetch-wrappers'

const narratorRequests = {
  isAdminPasswordSet: () => get('admin-password-set'),
  setAdminPassword: password => post('admin-password-set', {password}),
  checkAdminPassword: password => post('admin/password', {password}),
  verifyAdminToken: token => post('admin/verify-token', {token}),
  setDate: epoch => post('date', {epoch}),
  setWeather: weather => post('weather', {weather}),
  addNewsArticle: ({header, body, archived}) => put('news', {header, body, archived}),
  updateNewsArticles: articles => post('news', articles)
}

export default narratorRequests