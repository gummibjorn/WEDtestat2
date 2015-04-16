var links = {};
var linkId = 0;

function add(link){
  links[linkId++] = link;
};

function remove(id){
  delete links[id];
};

function get(id){
  return links[id];
}

function getAll(){
  return links;
}

module.exports = {
  add: add,
  remove: remove,
  get: get,
  getAll: getAll
}
