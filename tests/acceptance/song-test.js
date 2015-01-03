import Ember from 'ember';
import startApp from '../helpers/start-app';
import buildFixture from '../helpers/fixtures';
import {success} from '../helpers/server';

var App;
var store;
var server;

module('Acceptance: Song', {
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

asyncTest('find song by id', function() {
  server.respondWith(/\/song\/profile/, success(buildFixture('song')));
  server.respondWith(/\/artist\/profile/, success(buildFixture('artist')));

  Ember.run(function () {
    store.find('echonest-song', 'ARH6W4X1187B99274F').then(function (record) {
      equal(record.get('artist_name'), 'Radiohead', 'record should have name Radiohead');
      equal(record.get('title'), 'Stay fly', 'record should have name Radiohead');
      record.get('artist').then(function (artist) {
        equal(artist.get('name'), 'Radiohead', 'record should have name Radiohead');
        start();
      });
    });
  });
});

asyncTest('find playlist of songs based on artist_id', function() {
  server.respondWith(/\/playlist\/basic/, success(buildFixture('songs', 10)));

  Ember.run(function () {
    store.find('echonest-song', {
      playlist: 'basic',
      artist_id: [1]
    }).then(function (records) {
      equal(records.get('length'), 10, 'should have 10 records');
      start();
    });
  });
});
