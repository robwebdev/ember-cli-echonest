export default Factory.define('song')
  .sequence('id')
  .attr('artist_name', function () {
    return 'Radiohead';
  })
  .attr('artist_id', function () {
    return 'ARH6W4X1187B99274F';
  })
  .attr('title', function () {
    return 'Stay fly';
  });
