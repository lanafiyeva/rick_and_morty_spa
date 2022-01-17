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
export { setItem, getItems }
