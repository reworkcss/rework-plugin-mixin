var rework = require('rework')
  , mixin = require('../')
  , fs = require('fs')
  , assert = require('assert')
  , read = fs.readFileSync;

function fixture (name) {
  return read('test/fixtures/' + name + '.css', 'utf8').trim();
}

describe('.mixin(obj)', function () {
  it('should apply properties', function () {
    rework(fixture('mixins'))
      .use(mixin({ overflow: ellipsis }))
      .toString().trim()
      .should.equal(fixture('mixins.out'));

    function ellipsis (type) {
      if ('ellipsis' == type) {
        return {
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis'
        }
      }

      return {
        'overflow': type
      };
    }
  })

  it('should apply array properties', function () {
    rework(fixture('mixins.array'))
      .use(mixin({ display: display }))
      .toString().trim()
      .should.equal(fixture('mixins.array.out'));

    function display (type) {
      if ('flex' == type) {
        return {
          display: [
            '-webkit-flex',
            '-moz-flex',
            '-webkit-flexbox',
            'flex'
          ]
        }
      }

      return {
        display: type
      }
    }
  })

  it('should allow multiple mixins to be used sequentially', function () {
    rework(fixture('mixins.multiple'))
      .use(mixin({
        display: display,
        overflow: ellipsis
      }))
      .toString().trim()
      .should.equal(fixture('mixins.multiple.out'));

    function display (type) {
      if ('flex' == type) {
        return {
          display: [
            '-webkit-flex',
            '-moz-flex',
            '-webkit-flexbox',
            'flex'
          ]
        }
      }

      return {
        display: type
      }
    }

    function ellipsis (type) {
      if ('ellipsis' == type) {
        return {
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis'
        }
      }

      return {
        'overflow': type
      };
    }
  });
})
