/**
 *	index.js: @org.slashlib/jsbatchrun-git
 *
 *  @module jsbatchrun-git
 *
 *//*
 *  © 2021, slashlib.org.
 *
 *  index.js is distributed WITHOUT ANY WARRANTY; without even the implied
 *  warranty  of  MERCHANTABILITY  or  FITNESS  FOR  A PARTICULAR  PURPOSE.
 *
 */
"use strict";

/**
 *  Moduletable
 *  @ignore
 */
const _m = {
  // import 'lang' helpers from jsbatchrun
  lang:     require( "jsbatch-lang" ),
  // import command 'add' from its own module
  add:      require( "./add"        ),
  // import command 'commit' from its own module
  commit:   require( "./commit"     ),
  // import command 'push' from its own module
  push:     require( "./push"       )
};

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS =  {
  EXPORTS:    "exports",  // module "mount point" for plugin command registry
  PLUGIN_ID:  "git"       // plugin id aka "command name"
};

/**
 *  Registry for npm commands
 *  @ignore
 */
const _REGISTRY = _m.lang.registry( _STRINGS.PLUGIN_ID );

// add
Object.defineProperty( _REGISTRY.cmd, _m.add.id,         {
  value:    _m.add.invoke,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( _REGISTRY.help, _m.add.id,        {
  value:    _m.add.help,
  writable: false, enumerable: true, configurable: false });

// commit
Object.defineProperty( _REGISTRY.cmd, _m.commit.id,      {
  value:    _m.commit.invoke,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( _REGISTRY.help, _m.commit.id,     {
  value:    _m.commit.help,
  writable: false, enumerable: true, configurable: false });

// push
Object.defineProperty( _REGISTRY.cmd, _m.push.id,        {
  value:    _m.push.invoke,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( _REGISTRY.help, _m.push.id,       {
  value:    _m.push.help,
  writable: false, enumerable: true, configurable: false });

// Module exports:
Object.defineProperty( module, _STRINGS.EXPORTS,         {
  value:    _REGISTRY,
  writable: false, enumerable: true, configurable: false });
