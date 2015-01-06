import {
  moduleFor,
  test
} from 'ember-qunit';

import Ember from 'ember';
import DS from 'ember-data';

var sandbox;
var adapter;
var resolvedPromise = new Ember.RSVP.Promise(function (resolve) {resolve();});

var Model = DS.Model.extend({
  bucket: ['testBucket1', 'testBucket2']
});

var testType = Model.extend();

function stubSuper () {
  return sandbox.stub(adapter, '_super', function () {
    return resolvedPromise;
  });
}

moduleFor('adapter:echonest-song', 'EchonestSongAdapter', {
  needs: ['adapter:echonest'],

  setup: function () {
    sandbox = sinon.sandbox.create();
    adapter = this.subject();
  },

  teardown: function () {
    sandbox.restore();
  }
});

test('when calling adpater.findQuery with a traditional query', function() {
  var stub = stubSuper();
  var store = {};
  var query = {
    artist_name: 'Radiohead'
  };
  var result = adapter.findQuery(store, testType, query);

  ok(stub.called, 'adapter._super is called');
  equal(stub.args[0][0], store, 'adapter._super is called with \'store\' as first argument');
  equal(stub.args[0][1], testType, 'adapter._super is called with \'testType\' as second argument');
  equal(stub.args[0][2], query, 'adapter._super is called with \'query\' as third argument');
  ok(result instanceof Ember.RSVP.Promise, 'it returns a promise');
});

test('when calling adpater.findQuery with playlist = "basic"', function() {
  var stub = sandbox.stub(adapter, '_super', function () {
    return resolvedPromise;
  });
  var getPlayliststub = sandbox.stub(adapter, 'getPlaylist', function () {
    return resolvedPromise;
  });
  var store = {};
  var query = {};
  var result = adapter.findQuery({}, testType, {
    playlist: 'basic'
  });

  ok(!stub.called, 'adapter._super is not called');
  ok(getPlayliststub.called, 'adapter.getPlaylist is called');
  ok(result instanceof Ember.RSVP.Promise, 'it returns a promise');
});

test('when calling adapter.bucketForPlaylist', function () {
  equal(adapter.bucketForPlaylist('basic').length, 0, 'it returns an empty array' );
});

test('when calling adapter.getPlaylist', function() {
  var store = {};
  var query = {
    playlist: 'basic',
    artist_id: [1]
  };
  var stub = sandbox.stub(adapter, 'get', function () {
    return resolvedPromise;
  });
  var builURLStub = sandbox.stub(adapter, 'buildURL', function () {
    return 'testURL';
  });
  var bucketForPlaylistStub = sandbox.stub(adapter, 'bucketForPlaylist', function () {
    return ['tracks'];
  });
  var result = adapter.getPlaylist(store, testType, query);

  ok(builURLStub.called, 'adpater.buildURL is called');
  equal(builURLStub.args[0][0], 'playlist', 'adpater.buildURL is called with \'playlist\'');
  ok(stub.called, 'adpater.get is called');

  var typeArg = stub.args[0][0];
  var URLArg = stub.args[0][1];
  var dataArg = stub.args[0][2];
  var bucketArg = stub.args[0][3];

  equal(typeArg, testType, 'adpater.get is called with type');
  equal(URLArg, 'testURL/basic', 'adpater.get is called with the URL returned by buildURL');
  ok(!dataArg.playlist, 'the playlist attribute is removed from the query object');
  equal(dataArg.artist_id[0], 1, 'the data argument contains artist_id');
  equal(bucketArg.length, 1, 'the bucket argument is an array of length 1');
  equal(bucketArg[0], 'tracks', 'the bucket argument contain "tracks"');
});
