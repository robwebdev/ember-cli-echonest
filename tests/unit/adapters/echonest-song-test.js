import {
  moduleFor,
  test
} from 'ember-qunit';

import Ember from 'ember';
import DS from 'ember-data';

var sandbox;
var resolvedPromise = new Ember.RSVP.Promise(function (resolve) {resolve();});

var Model = DS.Model.extend({
  bucket: ['testBucket1', 'testBucket2']
});

var testType = Model.extend();

moduleFor('adapter:echonest-song', 'EchonestSongAdapter', {
  needs: ['adapter:echonest'],

  setup: function () {
    sandbox = sinon.sandbox.create();
  },

  teardown: function () {
    sandbox.restore();
  }
});

test('findQuery', function() {
  var adapter = this.subject();
  var stub = sandbox.stub(adapter, '_super', function () {
    return resolvedPromise;
  });
  var getPlayliststub = sandbox.stub(adapter, 'getPlaylist', function () {
    return resolvedPromise;
  });
  var store = {};
  var query = {};
  var result = adapter.findQuery(store, testType, query);

  ok(stub.called, 'should have called the _super method if traditional query');
  equal(stub.args[0][0], store, 'should have been called with \'store\' as first argument');
  equal(stub.args[0][1], testType, 'should have been called with \'testType\' as seconds argument');
  equal(stub.args[0][2], query, 'should have been called with \'query\' as third argument');
  ok(result instanceof Ember.RSVP.Promise, 'should return a promise');
  stub.reset();

  var result1 = adapter.findQuery({}, testType, {
    playlist: 'basic'
  });

  ok(!stub.called, 'should not have called the _super method if \'playlist\' is present in query');
  ok(getPlayliststub.called, 'getPlaylist should have been called if \'playlist\' present in query');
  ok(result1 instanceof Ember.RSVP.Promise, 'should return a promise');
});

test('bucketForPlaylist', function () {
  var adapter = this.subject();
  equal(adapter.bucketForPlaylist('basic').length, 0, 'should return the expected bucket for a basic playlist' );
});

test('getPlaylist', function() {
  var adapter = this.subject();
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

  ok(builURLStub.called, 'buildURL should have been called');
  equal(builURLStub.args[0][0], 'playlist', 'should have called buildURL with \'playlist\'');
  ok(stub.called, 'get should have been called');

  var typeArg = stub.args[0][0];
  var URLArg = stub.args[0][1];
  var dataArg = stub.args[0][2];
  var bucketArg = stub.args[0][3];

  equal(typeArg, testType, 'should call get with type');
  equal(URLArg, 'testURL/basic', 'should call get with the URL returned by buildURL');
  ok(!dataArg.playlist, 'should have removed playlist from query');
  equal(dataArg.artist_id[0], 1, 'data argument should contain artist_id');
  equal(bucketArg.length, 1, 'bucket argument should be array of length 1');
  equal(bucketArg[0], 'tracks', 'bucket argument should contain tracks');
});
