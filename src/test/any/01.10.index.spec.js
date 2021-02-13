/**
 *  © 2021, slashlib.org.
 *
 */ // use nodes default assertions
"use strict";
const expect  = require( "expect.js"    );
const lang    = require( "jsbatch-lang" );

describe( "01.10.index.spec.js - Testing module 'lib/index.js'", () => {
  const git = require( "../../lib" );

  describe( "Testing exports of module 'git'", () => {
    it( "Module export should be a function", () => {
        expect( git ).not.to.be( undefined );
        expect( git ).not.to.be( null      );
        expect( git ).to.be.an(  "object"  );
    });
  });
  describe( "Testing module 'git'", () => {
    it( "should return an 'object' which is a valid registry", () => {
        expect( lang.isRegistry( git )).to.be.ok();
    });
  });
});
