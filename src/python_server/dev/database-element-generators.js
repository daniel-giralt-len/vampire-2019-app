function getRandomString(length, chars) {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const getAlphanumeric = length => getRandomString(length, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
const getPlayerPassword = () => getRandomString(8, 'ABCDEFGHIJ')

const int = {
  generate: () => parseInt(Math.random()*100)
}
const string = type => ({
  generate: () => {
    switch(type){
      case 'utid1':
        return `${getAlphanumeric(8)}-${getAlphanumeric(4)}-${getAlphanumeric(4)}-${getAlphanumeric(4)}-${getAlphanumeric(12)}`
      case '/^[A-J]{8}$/':
        return getPlayerPassword()
      default:
        return getRandomString(parseInt(Math.random()*30), 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ')
    }
  }
})
const stringFromList = list => ({
  generate: () => list[Math.floor(Math.random()*list.length)]
})
const float = type => ({
  generate: () => {
    switch(type){
      case 'epoch':
        return Date.now() + Math.random()*10000
      case 'latitude':
        return Math.random()*180-90
      case 'longitude':
        return Math.random()*260-180
      default:
        return Math.random()*100
    }
  }
})
const intRange = (min, max) => ({
  generate: () => parseInt(Math.random()*max-min)
})
const boolean = {
  generate: () => Math.random > 0.5 ? true : false
}
const url = type => ({
  generate: () => {
    switch(type){
      case 'hurt':
        return 'doomslayer_hurt.png'
      case 'letargy':
        return 'doomslayer_letargy.png'
      default:
        return 'doomslayer_ok.png'
    }
  }
})
module.exports = {
  int,
  string,
  stringFromList,
  float,
  intRange,
  boolean,
  url
}