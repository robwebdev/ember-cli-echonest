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

test('when calling store.find for an echonest-artist with an ID', function() {
  server.respondWith(/\/artist\/profile/, success(fixture));
  stop();

  Ember.run(function () {
    store.find('echonest-artist', 'ARH6W4X1187B99274F').then(function (record) {
      equal(record.get('name'), 'Radiohead', 'the resolved record has the name "Radiohead"');
      equal(record.get('biographies.length'), 1, 'the resolved record has an array of biographies');
      ok(record.get('terms.length'), 'the resolved record has an array of terms');
      ok(record.get('images.length'), 'the resolved record has an array of images');
      start();
    });
  });
});

test('when calling store.find for an echonest-artist with a query containg a name', function() {
  server.respondWith(/\/artist\/search/, success(searchFixture));
  stop();

  Ember.run(function () {
    store.find('echonest-artist', {name: 'Radiohead'}).then(function (records) {
      equal(records.get('content.0.name'), 'Radiohead', 'the first record should have the name Radiohead');
      start();
    });
  });
});

test('when accessing similar artists on an echonest-artist model', function() {
  server.respondWith(/\/artist\/profile/, success(fixture));
  server.respondWith(/\/artist\/similar/, success(similarFixture));
  stop();

  Ember.run(function () {
    store.find('echonest-artist', 'ARH6W4X1187B99274F').then(function (record) {
      record.get('similar').then(function (records) {
        equal(records.get('content.0.name'), 'Test', 'the first record returned should have name Test');
        start();
      });
    });
  });
});
