import Ember from 'ember';
import startApp from '../helpers/start-app';
import {success} from '../helpers/server';
import buildFixture from '../helpers/fixtures';

var App;
var store;
var server;

var fixture = buildFixture('artist');
var searchFixture = buildFixture('artists', 10);
var similarFixture = buildFixture('artists', 10);
similarFixture.response.artists[0].name = 'Test';
similarFixture.response.artists[0].id = 'JGJKGKD587587JHGHJ';

module('Acceptance: Artist', {
  setup: function() {
    App = startApp();
    store = App.__container__.lookup('store:main');
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.restore();
  }
});

asyncTest('find artist by id', function() {
  server.respondWith(/\/artist\/profile/, success(fixture));

  Ember.run(function () {
    store.find('echonest-artist', 'ARH6W4X1187B99274F').then(function (record) {
      equal(record.get('name'), 'Radiohead', 'record should have name Radiohead');
      equal(record.get('biographies.length'), 1, 'record should have an array of biographies');
      ok(record.get('terms.length'), 'record should have an array of terms');
      ok(record.get('images.length'), 'record should have an array of images');
      start();
    });
  });
});

asyncTest('find artist by name', function() {
  server.respondWith(/\/artist\/search/, success(searchFixture));

  Ember.run(function () {
    store.find('echonest-artist', {name: 'Radiohead'}).then(function (records) {
      equal(records.get('content.0.name'), 'Radiohead', 'first record should have name Radiohead');
      start();
    });
  });
});

asyncTest('find similar artists', function() {
  server.respondWith(/\/artist\/profile/, success(fixture));
  server.respondWith(/\/artist\/similar/, success(similarFixture));

  Ember.run(function () {
    store.find('echonest-artist', 'ARH6W4X1187B99274F').then(function (record) {
      record.get('similar').then(function (records) {
        equal(records.get('content.0.name'), 'Test', 'first record should have name Test');
        start();
      });
    });
  });
});
