import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('echonest-song', 'EchonestSong', {
  needs: ['model:echonest-artist']
});

test('it exists', function() {
  var model = this.subject();
  var bucket = model.get('bucket');
  ok(bucket.indexOf('audio_summary') >= 0, 'should have audio_summary bucket');
  ok(bucket.indexOf('artist_discovery') >= 0, 'should have artist_discovery bucket');
  ok(bucket.indexOf('artist_familiarity') >= 0, 'should have artist_familiarity bucket');
  ok(bucket.indexOf('artist_hotttnesss') >= 0, 'should have artist_hotttnesss bucket');
  ok(bucket.indexOf('artist_location') >= 0, 'should have artist_location bucket');
  ok(bucket.indexOf('song_currency') >= 0, 'should have song_currency bucket');
  ok(bucket.indexOf('song_discovery') >= 0, 'should have song_discovery bucket');
  ok(bucket.indexOf('song_hotttnesss') >= 0, 'should have song_hotttnesss bucket');
  ok(bucket.indexOf('tracks') >= 0, 'should have tracks bucket');
});
