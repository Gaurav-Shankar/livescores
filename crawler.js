var Crawler = require("crawler");
var clc = require("cli-color");

var c = new Crawler({
    maxConnections : 10,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            var matchHeaders = [];
            var scoreCards;
            var liveCommentary;
            var matchDecision;
            var _parent = $('.cb-lv-main');
            Object.keys(_parent).forEach((each) => {
                if(each.length === 1){
                let Heading = _parent[each];
                Heading.children[0].name === "h2" ? matchHeaders.push(Heading.children[0].attribs.title) : null
                }
            });
            scoreCard = $(".cb-lv-main").first().find(".cb-scr-wll-chvrn").children().first().text();
            scoreCard = scoreCard.split("•")
            liveCommentary = $(".cb-lv-main").first().find(".cb-scr-wll-chvrn").children(".cb-text-live").text();
            matchDecision = $(".cb-lv-main").first().find(".cb-scr-wll-chvrn").children(".cb-text-complete").text();
            console.log("\n")
            console.log(clc.greenBright("LIVE 🏏  SCORES  and SCHEDULE"))
                console.log("\n")
                console.log(clc.redBright(matchHeaders[0]))
                if(!scoreCard[0] & !scoreCard[1]){
                    console.log(("🍋  "+clc.blackBright("Match not Started Yet !!")+" 🍋"));
                }
                else{
                    console.log(clc.cyanBright(scoreCard[0]));
                    console.log(clc.cyanBright(scoreCard[1].trim()));
                }
                if(liveCommentary){
                    console.log(clc.yellowBright(liveCommentary));
                }
                if(matchDecision){
                    console.log("😸 " +clc.greenBright(matchDecision)+" 😸");
                }
            }
            console.log("\n");
        done();
    }
});


c.queue('https://www.cricbuzz.com/cricket-match/live-scores');

module.exports = {c};