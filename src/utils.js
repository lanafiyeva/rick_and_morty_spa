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
  let Favorite
  if (localStorage.getItem(id)) {
    Favorite = true
  }
  return Favorite
}

export { setItem, getItems, removeItem, getIsFavoriteItem }
