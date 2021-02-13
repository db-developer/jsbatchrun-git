/**
 *  © 2021, slashlib.org.
 *
 */ // use nodes default assertions
"use strict";
const expect  = require( "expect.js" );
const path    = require( "path" );

describe( "01.01.add.spec.js - Testing module 'lib/add.js'", () => {
  const add = require( "../../lib/add" );

  describe( "Testing exports of module 'add'", () => {
    it( "Identifier 'id' {string} (interface) should exist", () => {
        expect( add.id     ).not.to.be( undefined  );
        expect( add.id     ).not.to.be( null       );
        expect( add.id     ).to.be.a(   "string"   );
    });
    it( "Function 'help' (interface) should exist", () => {
        expect( add.help   ).not.to.be( undefined  );
        expect( add.help   ).not.to.be( null       );
        expect( add.help   ).to.be.a(   "function" );
    });
    it( "Function 'invoke' (interface) should exist", () => {
        expect( add.invoke ).not.to.be( undefined  );
        expect( add.invoke ).not.to.be( null       );
        expect( add.invoke ).to.be.a(   "function" );
    });
    it( "Function 'config' should exist", () => {
        expect( add.config ).not.to.be( undefined  );
        expect( add.config ).not.to.be( null       );
        expect( add.config ).to.be.a(   "function" );
    });
  });
  describe( "Testing 'id' of module 'add'", () => {
    it( "should be equal to 'add'", () => {
        expect( add.id === "add" ).to.be.ok();
    });
  });
  describe( "Testing function 'help' of module 'add'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { add.help(); }).not.to.throwException();
        expect( add.help()).to.be.a( "string" );
    });
  });
  describe( "Testing function 'config' of module 'add'", () => {
    it( "should be callable without arguments", () => {
        const errmsg = "Missing option. Command git add requires '--all' or '--file'";
        expect(() => { add.config(); }).to.throwException(( error ) => {
          expect( error ).to.be.an( Error );
          expect( error.message === errmsg ).to.be.ok();
        });
    });
    it( "should be callable with argument 'projectdir' {string}", () => {
        const projectdir  = "";
        const errmsg      = "Missing option. Command git add requires '--all' or '--file'";
        expect(() => { add.config( projectdir ); }).to.throwException(( error ) => {
          expect( error ).to.be.an( Error );
          expect( error.message === errmsg ).to.be.ok();
        });
    });
    it( "should be callable with argument 'projectdir' {string} and 'args' {object}", () => {
        const projectdir  = "somedir";
        const args        = { };
        const errmsg      = "Missing option. Command git add requires '--all' or '--file'";
        expect(() => { add.config( projectdir, args ); }).to.throwException(( error ) => {
          expect( error ).to.be.an( Error );
          expect( error.message === errmsg ).to.be.ok();
        });
    });
    it( "should be callable with argument 'projectdir' {string} and 'args' { file: []}", () => {
        const projectdir = "";
        const args       = { file: [ "first", "second" ]};
        expect(() => { add.config( projectdir, args ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'args' { file: [], nowrite: true}", () => {
        const projectdir = "";
        const args       = { file: [ "first", "second" ], all: true };
        expect(() => { add.config( projectdir, args ); }).not.to.throwException();
    });
  });
  describe( "Testing function 'invoke' of module 'add'", () => {
    it( "should be callable without arguments but get rejected", ( done ) => {
        const errmsg = "Missing parameter 'args'.";
        expect(() => { add.invoke()
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
        const errmsg = "Missing option. Command git add requires '--all' or '--file'";
        expect(() => { add.invoke({ })
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
        const args = { file: "fun.txt" };
        expect(() => { add.invoke( args )
                          .then((  value ) => { done(); })
                          .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve", ( done ) => {
        // args is empty to avoid calling git
        const args     = { args: [ ], file: [ "dummy.txt", "fun.txt" ] };
        expect(() => { add.invoke( args )
                          .then((  value ) => { done(); })
                          .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete but invalid directory) and resolve", ( done ) => {
        const projects = [ "does.not.exist" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs, file: "fun.txt" };
        expect(() => { add.invoke( args )
                          .then((  value ) => { done(); })
                          .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
  });
});
