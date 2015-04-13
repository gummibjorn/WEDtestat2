var Storage = function(){
  this.links = {};
  this.linkId = 0;
}

Storage.prototype.add = function(link){
  this.links[this.linkId++] = link;
};

Storage.prototype.get = function(id){
  return this.links[id];
};


module.exports = Storage;
