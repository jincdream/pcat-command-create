'use strict'
const mkdirp = require('mkdirp')
const path = require('path')
const fse  = require('fs-extra')
const fs   = require('fs')

var tempFn = function(fn){
  return fn.toString().replace(/.*?\/\*(.*?)\*\//gmi,'$1')
}
var packContent = {
      "name": "{{temp}}",
      "version": "0.0.1",
      "private": true,
      "main": "page/index/index.html"
    }

exports.name = 'create <command> [options]'
// exports.usage = '<commad> [option]'
exports.desc = 'create dir or widget for deferant works'
exports.options = {
  '-w,--widget <widget name> ':'create widget'
};
exports.run = function(argv, cli, env) {
  
  if ((argv.h === true) || argv.help) {
    return cli.help(exports.name, exports.options);
  }
  var command = argv._
  var _name = argv.w || argv.widget
  var dirs = ['page','widget']
  var files = ['fis-conf.js','map.json','package.json']

  if(_name){
    let dir = path.join(env.cwd,_name)
    ;[_name+'.html',_name+'.css',_name+'.js'].forEach(function(name){
      fse.outputFile(path.join(dir,name),'')
      fis.log.info(path.join(dir,name).yellow.bold  + ' is created success!')
    })
  }else if(command[1]){
    // mkdirp([])
    let target = path.join(env.cwd,command[1])
    fse.copy(path.resolve(__dirname,'temp'),target, function (err) {
      if (err) return fis.log.error(err)
      fis.log.info(command[1].yellow.bold  + ' is created success!')
      packContent.name = command[1]
      fse.outputJson(path.resolve(target,'package.json'),packContent,function(err){
        if(err) return fis.log.error(path.resolve(target,'package.json').red.bold )
      })
    })
  }
  console.log(command)
}