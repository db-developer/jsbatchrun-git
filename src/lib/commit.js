/**
 *	commit.js: @org.slashlib/jsbatchrun-git
 *
 *  @module jsbatchrun-git/commit
 *
 *//*
 *  © 2021, slashlib.org.
 *
 *  commit.js  is  distributed WITHOUT ANY WARRANTY; without even the implied
 *  warranty of  MERCHANTABILITY  or  FITNESS  FOR  A PARTICULAR  PURPOSE.
 *
 *//* eslint-disable-next-line */
"use strict";

/**
 *  Moduletable
 *  @ignore
 */
const _m = {
  lang:     require( "jsbatch-lang"    ),
  strings:  require( "jsbatch-strings" ),
  grunt:    require( "grunt"           )
};

/**
 *  Stringtable initializer
 *  @ignore
 */
function _init_STRINGS() {
  const commit = "commit";
  const usage = `${ _m.strings.TAB3 } jsbr git ${ commit } <options> [directories]`;

  const strings = {
    CONFIG:                   "config",
    CMDUSAGE:                 usage,
    GRUNT_PLUGIN_GIT:         "grunt-git",
    GRUNT_TASK_GIT_COMMIT:    "gitcommit",
    ID_VALUE:                 commit
  };
  return Object.assign( strings, _m.strings );
}

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = _init_STRINGS();

/**
 *  Run 'git commit' with validated arguments.
 *
 *  @param  {object} args
 */
function invoke( args ) {
  if ( ! _m.lang.exists( args )) {
       return Promise.reject( new ReferenceError( "Missing parameter 'args'." ));
  }
  else return new Promise(( resolve, reject ) => {
    _m.grunt.task.init  = function() {};
    _m.grunt.loadNpmTasks( _STRINGS.GRUNT_PLUGIN_GIT );

    if (( ! args.message ) ||
        ( typeof( args.message ) !== "string" )) {
          const  errmsg = "Command git commit requires '--message {string}'";
          return reject( new Error( errmsg ));
    }

    const dirs    = Array.isArray( args.args ) ? args.args : [ ];
    const failed  = [ ];
    const promise = dirs.reduce(( promise, dir, index ) => {
      // reset errorcount & warncount
      _m.grunt.fail.errorcount = 0;
      _m.grunt.fail.warncount  = 0;

      return promise.then(() => {
        return new Promise(( resolve /*, reject */) => {
          const tasks = [ _STRINGS.GRUNT_TASK_GIT_COMMIT ];
          _m.grunt.config.init( config( dir, args ));
          _m.grunt.tasks( tasks, { force: true }, () => {
            /* istanbul ignore if */
            if ( _m.grunt.fail.errorcount > 1 ) {
                 failed.push({ index, dir })
                 _m.grunt.log.error( dir );
            }
            else _m.grunt.log.ok( dir );
            // always resolve!
            resolve();
          });
        });
      });
    }, Promise.resolve());

    // finally resolve or reject our promise ...
    promise.then(( /*v*/ ) => {
                   /* istanbul ignore if */
                   if ( failed.length > 0 ) { reject( failed ); }
                   else resolve(); },
                 /* istanbul ignore next */
                 ( error ) => { reject( error )});
  });
}

/**
 *  Returns a grunt configuration for git commit
 *
 *  @param  {string}  projectdir
 *  @return {object}  grunt configuration
 */
function config( projectdir, args ) {
  projectdir  = projectdir ? projectdir : ".";
  args        = args       ? args       : { };

  const options = { cwd: projectdir, message: args.message };
  if ( args.allowempty ) {
       options.allowEmpty = true;
  }

  const target  = { options };
  if ( args.file ) {
       const  src   = Array.isArray( args.file ) ? args.file : [ args.file ];
       target.files = { src };
  }

  return { gitcommit: { target }};
}

/**
 *  Help string for 'npm clean' command
 *
 *//* eslint-disable-next-line no-unused-vars */
function help( cmdstr, args ) {
  return `${ _STRINGS.USAGE }\n\r${ _STRINGS.CMDUSAGE }

options:
  --message <string>      commit message [required]
  --file <string>         commit file(s) to staging
  --allowempty <boolean>  don't fail on empty staging

${ _STRINGS.USAGEOPTS }

arguments:
  one or more directories, which hold package.json files.
  ${ _STRINGS.USAGEARGS }`;
}

// Module exports:
Object.defineProperty( module.exports, _STRINGS.CONFIG,  {
  value:    config,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.HELP,    {
  value:    help,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.ID,      {
  value:    _STRINGS.ID_VALUE,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.INVOKE,  {
  value:    invoke,
  writable: false, enumerable: true, configurable: false });
