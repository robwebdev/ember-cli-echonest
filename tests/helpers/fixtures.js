import Ember from 'ember';
import ResponseFactory from '../factories/response';
import ArtistFactory from '../factories/artist';
import SongFactory from '../factories/song';

export default function buildFixture (type, properties) {
  var responsePayload = {};
  var singlarType = Ember.Inflector.inflector.singularize(type);
  var isSingle = (singlarType === type);

  if (isSingle) {
    responsePayload[type] = Factory.build(type, properties);
  } else {
    responsePayload[type] = Factory.buildList(singlarType, properties);
  }

  return {
    "response": Factory.build('response', responsePayload)
  };
}
