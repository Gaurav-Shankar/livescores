#!/usr/bin/env node
'use strict;'

const program = require('commander');
var crawler = require('./crawler');
var clc = require("cli-color");



program
  .version('0.1.0')
  .option('-score','Get Live Score')
  .option('-sch','Get Upcoming Schedule')
  .option('-news','Get Latest Cricket News')

program
    .command("score")
    .action(()=>{
        crawler
    });

program
    .command("sch")
    .action(()=>{
        listFunction
    });

program
    .command("news")
    .action(function(){
        console.log("\n");
        console.log(clc.redBright("Cricket News coming soon. 😢"))
    });

program.parse(process.argv);