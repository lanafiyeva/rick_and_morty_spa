function setItem(id, name) {
  localStorage.setItem(id, name)
}

function getItems() {
  let keys = Object.keys(localStorage)
  let list = []
  for (let key of keys) {
    list.push({ id: key, name: localStorage.getItem(key) })
    //console.log(`${key}: ${localStorage.getItem(key)}`)
  }
  return list
}

function removeItem(id) {
  localStorage.removeItem(id)
}

function getIsFavoriteItem(id) {
  return Boolean(localStorage.getItem(id))
}

function getFavorites() {
  return new Set(Object.keys(localStorage))
}

export { setItem, getItems, removeItem, getFavorites }
