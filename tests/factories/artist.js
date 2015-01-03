export default Factory.define('artist')
  .sequence('id')
  .attr('name', function () {
    return 'Radiohead';
  })
  .attr('terms', function () {
    return [
        {
          "frequency": 1,
          "name": "rock",
          "weight": 1
        },
        {
          "frequency": 0.46207999113990994,
          "name": "electronic",
          "weight": 0.8550242674815747
        },
        {
          "frequency": 0.1913989137427816,
          "name": "alternative rock",
          "weight": 0.7011953981664569
        },
        {
          "frequency": 0.14264593713878726,
          "name": "experimental",
          "weight": 0.32877943555635447
        }
      ];
  })
  .attr('images', function () {
    return [
      {
        "url": "http://userserve-ak.last.fm/serve/_/102639.jpg",
        "tags": [],
        "verified": false,
        "license": {
          "type": "unknown",
          "attribution": "last.fm",
          "url": "http://userserve-ak.last.fm/serve/_/102639.jpg"
        }
      },
      {
        "url": "http://userserve-ak.last.fm/serve/_/174456.jpg",
        "tags": [],
        "verified": false,
        "license": {
          "type": "unknown",
          "attribution": "last.fm",
          "url": "http://userserve-ak.last.fm/serve/_/174456.jpg"
        }
      },
      {
        "url": "http://userserve-ak.last.fm/serve/_/2153194.jpg",
        "tags": [],
        "verified": false,
        "license": {
          "type": "unknown",
          "attribution": "last.fm",
          "url": "http://userserve-ak.last.fm/serve/_/2153194.jpg"
        }
      }
    ];
  })
  .attr('biographies', function () {
    return [
      {
        "text": "Radiohead was one of the few alternative bands of the ...",
        "site": "mtvmusic",
        "url": "http://www.mtvmusic.com/radiohead",
        "license": {
          "type": "unknown",
          "attribution": "n/a",
          "attribution-url": "http://www.mtvmusic.com/radiohead",
          "url": "n/a",
          "version": "n/a"
        },
        "truncated": true
      }
    ];
  });
