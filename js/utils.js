const utils = {
  debounce,
  sortFromAge,
  sortFromName
};

export default utils;

function debounce(f, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      f.call(this, ...args);
    }, delay);
  };
}
function sortFromAge(arr) {
    arr.sort((a,b) => {
        if(a.age > b.age) return 1;
        if(a.age < b.age) return -1;
        return 0
    })
}

function sortFromName(arr) {
    arr.sort((a,b) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;
        return 0
    })
 }
 