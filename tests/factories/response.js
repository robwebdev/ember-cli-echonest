export default Factory.define('response')
  .attr('status', function () {
    return {
      "version": "4.2",
      "code": 0,
      "message": "Success"
    };
  });
