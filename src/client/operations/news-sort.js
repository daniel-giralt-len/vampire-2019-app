const sortNewsById = (a,b) => {
  if(a.id > b.id) return 1
  if(a.id < b.id) return -1
  return 0
}

const chronologicalDescendSort = news => news.sort(sortNewsById).reverse()

export default chronologicalDescendSort