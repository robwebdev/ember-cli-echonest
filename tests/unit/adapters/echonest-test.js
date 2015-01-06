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
var stubGet;

function returnPromise () {
  return new Ember.RSVP.Promise(function () {});
}

function stubAjax () {
  return sandbox.stub(adapter, 'ajax', returnPromise);
}

function stubGet() {
  return sandbox.stub(adapter, 'get', returnPromise);
}

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

test('when calling adapter.get', function() {
  var stub = stubAjax();
  var result = adapter.get(testType, 'testURL', {testProperty: 'testValue'});
  ok(stub.called, 'adapter.ajax is be called');

  var arg = stub.getCall(0).args[0];
  equal(arg.url, 'testURL', 'adpater.ajax is called with the correct URL');
  equal(arg.data.testProperty, 'testValue', 'adpater.ajax is called with the correct data');
  equal(arg.data.api_key, 'testAPIKey', 'adpater.ajax is called with the correct api key');
  equal(arg.data.format, 'json', 'adpater.ajax is called with data.format as json');
  equal(arg.data.bucket[0], 'testBucket1', 'adpater.ajax is called with correct buckets');
  equal(arg.data.bucket[1], 'testBucket2', 'adpater.ajax is called with correct buckets');
  ok(result instanceof Ember.RSVP.Promise, 'a promise is returned');
});

test('when calling adapter.pathForType with a prefixed type', function () {
  equal(adapter.pathForType('echonestArtist'), 'artist', 'the type is returned without echonest prefix');
});

test('when calling adapter.pathForType with a non prefixed type', function () {
  equal(adapter.pathForType('playlist'), 'playlist', 'the type is returned untouched');
});

test('when calling adapter.find', function () {
  var stub = stubGet();
  var result = adapter.find(testType, {typeKey: 'echonestArtist'}, 999);
  ok(stub.called, 'adapter.get is called');

  var args = stub.getCall(0).args;
  equal(args[1], 'http://developer.echonest.com/api/v4/artist/profile', 'adapter.get is called with the correct URL');
  equal(args[2].id, 999, 'adapter.get is called with a query object containing the correct id');
  ok(result instanceof Ember.RSVP.Promise, 'a promise is returned');
});

test('when calling adapter.findQuery', function () {
  var stub = stubGet();
  var result = adapter.findQuery(testType, {typeKey: 'echonestArtist'}, {name: 'nofx'});
  ok(stub.called, 'adapter.get is called');

  var args = stub.getCall(0).args;
  equal(args[1], 'http://developer.echonest.com/api/v4/artist/search', 'adapter.get is called with the correct URL');
  equal(args[2].name, 'nofx', 'adapter.get is called with a query object containing the correct name');
  ok(result instanceof Ember.RSVP.Promise, 'a promise is returned');
});

test('when calling adapter.findHasMany', function () {
  var stub = stubGet();
  var result = adapter.findHasMany({}, Ember.Object.create({id: 999}), 'artist/similar');
  ok(stub.called, 'adapter.get is called');

  var args = stub.getCall(0).args;
  equal(args[1], 'http://developer.echonest.com/api/v4/artist/similar', 'adapter.get is called with the correct URL');
  equal(args[2].id, 999, 'adapter.get is called with a query object containing the correct id');
  ok(result instanceof Ember.RSVP.Promise, 'a promise is returned');
});

test('when calling adapter.createRecord', function () {
  throws(function () {
    adapter.createRecord({}, {typeKey: 'echonestArtist'});
  }, function( err ) {
    return err.toString() === 'You cannot create an echonestArtist';
  },'an error is thrown');
});

test('when calling adapter.deleteRecord', function () {
  throws(function () {
    adapter.deleteRecord({}, {typeKey: 'echonestArtist'}, Ember.Object.create({id: 999}));
  }, function( err ) {
    return err.toString() === 'You cannot delete an echonestArtist';
  },'an error is thrown');
});

test('when calling adapter.updateRecord', function () {
  throws(function () {
    adapter.updateRecord({}, {typeKey: 'echonestArtist'}, Ember.Object.create({id: 999}));
  }, function( err ) {
    return err.toString() === 'You cannot update an echonestArtist';
  },'an error is thrown');
});

test('the property defaultSerializer', function () {
  equal(adapter.defaultSerializer, 'echonest', 'is should be set to "echonest"');
});
