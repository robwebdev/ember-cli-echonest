import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('serializer:echonest', 'EchonestSerializer', {
});

test('normalizePayload', function() {
  var serializer = this.subject();
  var payload = {
    "response": {
      "status": {
        "version": "4.2",
        "code": 0,
        "message": "Success"
      },
      "songs": [{
        "title": "Karma Police",
        "artist_name": "Radiohead",
        "tracks": [{
          "catalog": "7digital-US",
          "foreign_id": "7digital-US:track:2748611",
          "release_image": "http://cdn.7static.com/static/img/sleeveart/00/002/577/0000257700_200.jpg",
          "id": "TRKGPQB128F4252E52",
          "preview_url": "http://previews.7digital.com/clips/34/2748611.clip.mp3"
        }]
      }]
    }
  };

  var normalized = serializer.normalizePayload(payload);
  ok(normalized.echonest_songs, 'should have echonest_songs property on top level of payload');
  ok(!normalized.songs, 'should not have songs property on top level of payload');
  ok(!normalized.status, 'should not have a status property on the payload');
});

test('normalizeHash', function () {
  var serializer = this.subject();
  var artist = {};
  var song = {
    artist_id: 1
  };

  var normalizedArtist = serializer.normalizeHash.echonest_artist(artist);
  var normalizedSong = serializer.normalizeHash.echonest_song(song);

  equal(normalizedArtist.links.similar, 'artist/similar', 'should have a links attribute on artist payload');
  equal(normalizedSong.artist, 1, 'should have artist attribute on song');
});
