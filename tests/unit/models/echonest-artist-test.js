import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('echonest-artist', 'EchonestArtist', {
});

test('has buckets', function() {
  var model = this.subject();
  var bucket = model.get('bucket');
  ok(bucket.indexOf('biographies') >= 0, 'should have biographies bucket');
  ok(bucket.indexOf('blogs') >= 0, 'should have blogs bucket');
  ok(bucket.indexOf('discovery') >= 0, 'should have discovery bucket');
  ok(bucket.indexOf('doc_counts') >= 0, 'should have doc_counts bucket');
  ok(bucket.indexOf('familiarity') >= 0, 'should have familiarity bucket');
  ok(bucket.indexOf('genre') >= 0, 'should have genre bucket');
  ok(bucket.indexOf('hotttnesss') >= 0, 'should have hotttnesss bucket');
  ok(bucket.indexOf('images') >= 0, 'should have images bucket');
  ok(bucket.indexOf('artist_location') >= 0, 'should have artist_location bucket');
  ok(bucket.indexOf('news') >= 0, 'should have news bucket');
  ok(bucket.indexOf('reviews') >= 0, 'should have reviews bucket');
  ok(bucket.indexOf('songs') >= 0, 'should have songs bucket');
  ok(bucket.indexOf('urls') >= 0, 'should have urls bucket');
  ok(bucket.indexOf('video') >= 0, 'should have video bucket');
  ok(bucket.indexOf('years_active') >= 0, 'should have years_active bucket');
});
