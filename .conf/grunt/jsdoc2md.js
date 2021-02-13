/**
 *  © 2020, db-developer.
 *  Licensed under the MIT license.
 */

module.exports = function ( grunt, options ) {
  return {
    api: {
      src:      `${ options.LIBDIR }/**/*.js`,
      dest:     `${ options.APIDIR }.md/`,
      options: {
        index: {
          dest: `${ options.APIDIR }/../api.index.md`
        }
      }
    }
  };
};
