# jsbatchrun-git #

do filesystem tasks with this [jsbatchrun](https://www.npmjs.com/package/jsbatchrun) plugin.

[![npm version](https://img.shields.io/npm/v/jsbatchrun-git?color=blue)](https://www.npmjs.com/package/jsbatchrun-git)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![jsdoc](https://img.shields.io/static/v1?label=jsdoc&message=%20api%20&color=blue)](https://jsdoc.app/)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)
[![codecov](https://codecov.io/gh/db-developer/jsbatchrun-git/branch/master/graph/badge.svg)](https://codecov.io/gh/db-developer/jsbatchrun-git)
[![Build Status](https://travis-ci.com/db-developer/jsbatchrun-git.svg?branch=master)](https://travis-ci.com/db-developer/jsbatchrun-git)
[![dependencies](https://david-dm.org/db-developer/jsbatchrun-git.svg)](https://david-dm.org/)

jsbatchrun-git uses [grunt](https://gruntjs.com/) for accessing files in a platform independent manner.

## content ##

* Usage (see further down this page)
  * [Getting started guide](#getting-started)
  * [Usage and examples](#usage)
  * [jsbr git add](docs/git.add.md) (staging)
  * [jsbr git commit](docs/git.commit.md)
  * [jsbr git push](docs/git.push.md)

* Developers
  * [Testing jsbatchrun-git](docs/grunt.md#testing)
  * [Code coverage of tests for jsbatchrun-git](docs/grunt.md#code-coverage)
  * [Build jsbatchrun-git from scratch](docs/grunt.md#building)
  * [NPM integration of jsbatchrun-git](docs/grunt.md#npm_integration)
  * [Frameworks used for testing, building, etc.](docs/frameworks.md)
  * [API of package jsbatchrun-git](docs/api.index.md) (self generated with jsbatchrun-git)

## getting started ##

### install ###

This guide assumes, that you are familiar with the use of [npm](https://npmjs.com "Homepage of npm").  

<code>npm install jsbatchrun-git --save</code>

### prerequisites ###

This plugin requires [jsbatchrun](https://www.npmjs.com/package/jsbatchrun).  

Install [jsbatchrun-git]() in your [jsbatchrun](https://www.npmjs.com/package/jsbatchrun)
project. Check jsbatchrun for loading and configuring plugins.

## usage ##

This plugin provides you with the following commands

* <code>&gt; jsbr git add ...</code> [for staging changes in a list of target directories.
  (Help)](docs/git.add.md)

* <code>&gt; jsbr git commit ...</code> [for committing changes in a list of target directories.
  (Help)](docs/git.commit.md)

* <code>&gt; jsbr git push ...</code> [for pushing changes in a list of target directories.
  (Help)](docs/git.add.md)
