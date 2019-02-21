#!/usr/bin/env node

const program = require('commander');
var crawler = require('./crawler');
var clc = require("cli-color");


program
    .version('1.0.1')
    .option('-feed', 'Get Complete Cricket Feed')
    .option('-news', 'Get Latest Cricket News')


program
    .command("feed")
    .alias("fe")
    .action(() => {
        crawler.f;
    });

program
    .command("news")
    .alias("ne")
    .action(function() {
        console.log("\n");
        console.log(clc.yellow("Cricket News coming soon! "));
        console.log("\n");
        process.exit(1);
    });

program.on('command:*', function() {
    console.log("\n");
    console.error(clc.redBright('Invalid command: %s\nSee --help for the list of available commands.'), program.args.join(' '));
    console.log("\n");
    process.exit(1);
});
program.parse(process.argv);