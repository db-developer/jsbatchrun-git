/**
 *	push.js: @org.slashlib/jsbatchrun-git
 *
 *  @module jsbatchrun-git/push
 *
 *//*
 *  © 2021, slashlib.org.
 *
 *  push.js  is distributed WITHOUT ANY WARRANTY; without even the implied
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
  const push = "push";
  const usage = `${ _m.strings.TAB3 } jsbr git ${ push } <options> [directories]`;

  const strings = {
    CONFIG:                   "config",
    CMDUSAGE:                 usage,
    GRUNT_PLUGIN_GIT:         "grunt-git",
    GRUNT_TASK_GIT_PUSH:      "gitpush",
    ID_VALUE:                 push
  };
  return Object.assign( strings, _m.strings );
}

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = _init_STRINGS();

/**
 *  Run 'git push' with validated arguments.
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

    const dirs    = Array.isArray( args.args ) ? args.args : [ ];
    const failed  = [ ];
    const promise = dirs.reduce(( promise, dir, index ) => {
      // reset errorcount & warncount
      _m.grunt.fail.errorcount = 0;
      _m.grunt.fail.warncount  = 0;

      return promise.then(() => {
        return new Promise(( resolve /*, reject */) => {
          const tasks = [ _STRINGS.GRUNT_TASK_GIT_PUSH ];
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
    }, Promise.resolve())

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
 *  Returns a grunt configuration for npm clean
 *  @param  {string}  projectdir
 *  @return {object}  grunt configuration
 */
function config( projectdir, args ) {
        projectdir  = projectdir ? projectdir : ".";
        args        = args       ? args       : { };
  const options     = { cwd: projectdir };
  if ( args.remote ) {
       options.remote = args.remote;
  }
  if ( args.branch ) {
       options.branch = args.branch;
  }
  if ( args.all ) {
       options.all = args.all;
  }
  if ( args.tags ) {
       options.tags = args.tags;
  }
  if (( args.upstream ) || ( args.u )) {
        options.upstream = args.upstream;
  }
  if ( args.force ) {
       options.force = args.force;
  }
  return { gitpush: { target: { options }}};
}

/**
 *  Help string for 'npm clean' command
 *
 *//* eslint-disable-next-line no-unused-vars */
function help( cmdstr, args ) {
  return `${ _STRINGS.USAGE }\n\r${ _STRINGS.CMDUSAGE }

options:
  --u                 set upstream flag
  --remote <string>   where to push. Defaults to 'origin'
  --branch <string>   remote branch. No default
  --all               set flag '--all' to the push command
  --tag               set flag '--tag' to the push command
  --force             set flag '--force' to the push command

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
