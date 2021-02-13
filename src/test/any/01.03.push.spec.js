/**
 *  © 2021, slashlib.org.
 *
 */ // use nodes default assertions
"use strict";
const expect  = require( "expect.js" );
const path    = require( "path" );

describe( "01.03.push.spec.js - Testing module 'lib/push.js'", () => {
  const push = require( "../../lib/push" );

  describe( "Testing exports of module 'push'", () => {
    it( "Identifier 'id' {string} (interface) should exist", () => {
        expect( push.id     ).not.to.be( undefined  );
        expect( push.id     ).not.to.be( null       );
        expect( push.id     ).to.be.a(   "string"   );
    });
    it( "Function 'help' (interface) should exist", () => {
        expect( push.help   ).not.to.be( undefined  );
        expect( push.help   ).not.to.be( null       );
        expect( push.help   ).to.be.a(   "function" );
    });
    it( "Function 'invoke' (interface) should exist", () => {
        expect( push.invoke ).not.to.be( undefined  );
        expect( push.invoke ).not.to.be( null       );
        expect( push.invoke ).to.be.a(   "function" );
    });
    it( "Function 'config' should exist", () => {
        expect( push.config ).not.to.be( undefined  );
        expect( push.config ).not.to.be( null       );
        expect( push.config ).to.be.a(   "function" );
    });
  });
  describe( "Testing 'id' of module 'push'", () => {
    it( "should be equal to 'push'", () => {
        expect( push.id === "push" ).to.be.ok();
    });
  });
  describe( "Testing function 'help' of module 'push'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { push.help(); }).not.to.throwException();
        expect( push.help()).to.be.a( "string" );
    });
  });
  describe( "Testing function 'config' of module 'push'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { push.config(); }).not.to.throwException(( error ) => { console.log( error )});
    });
    it( "should be callable with argument 'projectdir' {string}", () => {
        const projectdir  = "";
        expect(() => { push.config( projectdir ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'args' {object}", () => {
        const projectdir  = "somedir";
        const args        = { };
        expect(() => { push.config( projectdir, args ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'args' { file: {string}}", () => {
        const projectdir = "";
        const args       = { remote: "origin", branch: "master",
                             all: true, tags: true, upstream: true, force: true };
        expect(() => { push.config( projectdir, args ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'args' { file: {string}}", () => {
        const projectdir = "";
        const args       = { remote: "origin", branch: "master",
                             all: true, tags: true, u: true, force: true };
        expect(() => { push.config( projectdir, args ); }).not.to.throwException();
    });
  });
  describe( "Testing function 'invoke' of module 'push'", () => {
    it( "should be callable without arguments but get rejected", ( done ) => {
        const errmsg = "Missing parameter 'args'.";
        expect(() => { push.invoke()
                           .then(( value ) => { done( new Error( "Should get rejectd" ))},
                                 ( error ) => {
                                   // console.log( error );
                                   expect( error ).to.be.an( ReferenceError );
                                   expect( error.message === errmsg ).to.be.ok();
                                   done();
                            })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { } but get rejected", ( done ) => {
        expect(() => { push.invoke({ })
                           .then((  value ) => { done(); })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve", ( done ) => {
        const args = { u: true, remote: "origin", branch: "master" };
        expect(() => { push.invoke( args )
                           .then((  value ) => { done(); })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete but invalid directory) and resolve", ( done ) => {
        const projects = [ "does.not.exist" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs, u: true, remote: "origin", branch: "master" };
        expect(() => { push.invoke( args )
                           .then((  value ) => { done(); })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
  });
});
