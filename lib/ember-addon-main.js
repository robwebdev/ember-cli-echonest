'use strict';

var path = require('path');
var fs   = require('fs');

function EmberCLIEchonest(project) {
  this.project = project;
  this.name    = 'Ember CLI Echonest';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberCLIEchonest.prototype.treeFor = function treeFor(name) {
  var treePath =  path.join('node_modules', 'ember-cli-echonest', name);

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

module.exports = EmberCLIEchonest;
