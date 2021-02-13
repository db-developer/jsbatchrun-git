/**
 *  © 2021, slashlib.org.
 *
 */ // use nodes default assertions
"use strict";
const expect  = require( "expect.js" );
const path    = require( "path" );

describe( "01.02.commit.spec.js - Testing module 'lib/commit.js'", () => {
  const commit = require( "../../lib/commit" );

  describe( "Testing exports of module 'commit'", () => {
    it( "Identifier 'id' {string} (interface) should exist", () => {
        expect( commit.id     ).not.to.be( undefined  );
        expect( commit.id     ).not.to.be( null       );
        expect( commit.id     ).to.be.a(   "string"   );
    });
    it( "Function 'help' (interface) should exist", () => {
        expect( commit.help   ).not.to.be( undefined  );
        expect( commit.help   ).not.to.be( null       );
        expect( commit.help   ).to.be.a(   "function" );
    });
    it( "Function 'invoke' (interface) should exist", () => {
        expect( commit.invoke ).not.to.be( undefined  );
        expect( commit.invoke ).not.to.be( null       );
        expect( commit.invoke ).to.be.a(   "function" );
    });
    it( "Function 'config' should exist", () => {
        expect( commit.config ).not.to.be( undefined  );
        expect( commit.config ).not.to.be( null       );
        expect( commit.config ).to.be.a(   "function" );
    });
  });
  describe( "Testing 'id' of module 'commit'", () => {
    it( "should be equal to 'commit'", () => {
        expect( commit.id === "commit" ).to.be.ok();
    });
  });
  describe( "Testing function 'help' of module 'commit'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { commit.help(); }).not.to.throwException();
        expect( commit.help()).to.be.a( "string" );
    });
  });
  describe( "Testing function 'config' of module 'commit'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { commit.config(); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string}", () => {
        const projectdir  = "";
        expect(() => { commit.config( projectdir ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'args' {object}", () => {
        const projectdir  = "somedir";
        const args        = { };
        expect(() => { commit.config( projectdir, args ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'args' { file: {string}}", () => {
        const projectdir = "";
        const args       = { file: "first" };
        expect(() => { commit.config( projectdir, args ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'args' { file: []}", () => {
        const projectdir = "";
        const args       = { file: [ "first", "second" ]};
        expect(() => { commit.config( projectdir, args ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'args' { file: [], nowrite: true}", () => {
        const projectdir = "";
        const args       = { allowempty: true };
        expect(() => { commit.config( projectdir, args ); }).not.to.throwException();
    });
  });
  describe( "Testing function 'invoke' of module 'commit'", () => {
    it( "should be callable without arguments but get rejected", ( done ) => {
        const errmsg = "Missing parameter 'args'.";
        expect(() => { commit.invoke()
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
        const errmsg   = "Command git commit requires '--message {string}'";
        expect(() => { commit.invoke({ })
                             .then(( value ) => { done( new Error( "should get rejected" )); },
                                   ( error ) => {
                                     // console.log( error );
                                     expect( error ).to.be.an( Error );
                                     expect( error.message === errmsg ).to.be.ok();
                                     done();
                              })
                             .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve", ( done ) => {
        const args = { message: "commit message", file: "fun.txt" };
        expect(() => { commit.invoke( args )
                             .then((  value ) => { done(); })
                             .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve", ( done ) => {
        // args is empty to avoid calling git
        const args     = { args: [ ], message: "commit message", file: [ "dummy.txt", "fun.txt" ] };
        expect(() => { commit.invoke( args )
                             .then((  value ) => { done(); })
                             .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete but invalid directory) and resolve", ( done ) => {
        const projects = [ "does.not.exist" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs, message: "commit message" };
        expect(() => { commit.invoke( args )
                             .then((  value ) => { done(); })
                             .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
  });
});
