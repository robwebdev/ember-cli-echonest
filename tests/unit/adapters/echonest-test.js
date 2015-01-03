import {
  moduleFor,
  test
} from 'ember-qunit';
import Ember from 'ember';
import DS from 'ember-data';

var adapter;
var sandbox;
var Model = DS.Model.extend({
  bucket: ['testBucket1', 'testBucket2']
});

var testType = Model.extend();

moduleFor('adapter:echonest', 'EchonestAdapter', {
  setup: function () {
    sandbox = sinon.sandbox.create();
    adapter = this.subject({
      api_key: 'testAPIKey'
    });
  },

  teardown: function () {
    sandbox.restore();
  }
});

test('get', function() {
  var stub = sandbox.stub(adapter, 'ajax', function () {
    return new Ember.RSVP.Promise(function () {});
  });
  var result = adapter.get(testType, 'testURL', {testProperty: 'testValue'});
  ok(adapter.get, 'should have a method get');
  ok(stub.called, 'adapter.ajax should be called');

  var arg = stub.getCall(0).args[0];
  equal(arg.url, 'testURL', 'should call adpater.ajax with correct URL');
  equal(arg.data.testProperty, 'testValue', 'should call adpater.ajax with correct data');
  equal(arg.data.api_key, 'testAPIKey', 'should call adpater.ajax with correct api key');
  equal(arg.data.format, 'json', 'should call adpater.ajax with data.format as jsonp');
  equal(arg.data.bucket[0], 'testBucket1', 'should call adpater.ajax with correct buckets');
  equal(arg.data.bucket[1], 'testBucket2', 'should call adpater.ajax with correct buckets');
  ok(result instanceof Ember.RSVP.Promise, 'should return a promise');
});

test('pathForType', function () {
  equal(adapter.pathForType('echonestArtist'), 'artist', 'should return the type without echonest prefix');
  equal(adapter.pathForType('playlist'), 'playlist', 'should return the type untouched if no echonest prefix');
});

test('find', function () {
  var stub = sandbox.stub(adapter, 'get', function () {
    return new Ember.RSVP.Promise(function () {});
  });
  var result = adapter.find(testType, {typeKey: 'echonestArtist'}, 999);
  ok(stub.called, 'should have called the "get" method');

  var args = stub.getCall(0).args;
  equal(args[1], 'http://developer.echonest.com/api/v4/artist/profile', 'should call "get" with a url');
  equal(args[2].id, 999, 'should pass the required record id in the data object');
  ok(result instanceof Ember.RSVP.Promise, 'should return a promise');
});

test('findQuery', function () {
  var stub = sandbox.stub(adapter, 'get', function () {
    return new Ember.RSVP.Promise(function () {});
  });
  var result = adapter.findQuery(testType, {typeKey: 'echonestArtist'}, {name: 'nofx'});
  ok(stub.called, 'should have called the "get" method');

  var args = stub.getCall(0).args;
  equal(args[1], 'http://developer.echonest.com/api/v4/artist/search', 'should call "get" with a url with "/search" appended');
  equal(args[2].name, 'nofx', 'should have query present in data object');
  ok(result instanceof Ember.RSVP.Promise, 'should return a promise');
});

test('findHasMany', function () {
  var stub = sandbox.stub(adapter, 'get', function () {
    return new Ember.RSVP.Promise(function () {});
  });
  var result = adapter.findHasMany({}, Ember.Object.create({id: 999}), 'artist/similar');
  ok(stub.called, 'should have called the "get" method');

  var args = stub.getCall(0).args;
  equal(args[1], 'http://developer.echonest.com/api/v4/artist/similar', 'should call "get" with a url with "/search" appended');
  equal(args[2].id, 999, 'should have id present in query');
  ok(result instanceof Ember.RSVP.Promise, 'should return a promise');
});

test('unsupported methods', function () {
  throws(function () {
    adapter.createRecord({}, {typeKey: 'echonestArtist'});
  }, function( err ) {
    return err.toString() === 'You cannot create an echonestArtist';
  },'should throw an error when createRecord is called');

  throws(function () {
    adapter.deleteRecord({}, {typeKey: 'echonestArtist'}, Ember.Object.create({id: 999}));
  }, function( err ) {
    return err.toString() === 'You cannot delete an echonestArtist';
  },'should throw an error when deleteRecord is called');

  throws(function () {
    adapter.updateRecord({}, {typeKey: 'echonestArtist'}, Ember.Object.create({id: 999}));
  }, function( err ) {
    return err.toString() === 'You cannot update an echonestArtist';
  },'should throw an error when updateRecord is called');
});

test('defaultSerializer', function () {
  equal(adapter.defaultSerializer, 'echonest', 'defaultSerializer should be set to echonest');
});
