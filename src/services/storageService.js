export const storageService = {
  save,
  load,
  remove,
};

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function load(key) {
  return JSON.parse(localStorage.getItem(key));
}

function remove(key) {
  localStorage.removeItem(key);
}
