var Storage = function(){
  this.links = {};
  this.linkId = 0;
}

Storage.prototype.add = function(link){
  this.links[this.linkId++] = link;
};

Storage.prototype.get = function(id){
  this.links[id];
};

Storage.prototype.delete = function(id){
  this.links[id];
};

module.exports = Storage;
