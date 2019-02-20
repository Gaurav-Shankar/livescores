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
            scores = $(".cb-lv-main").first().find(".cb-scr-wll-chvrn").children().first().text();
            scores = scores.split("•")
            live = $(".cb-lv-main").first().find(".cb-scr-wll-chvrn").children(".cb-text-live").text();
            matchRes = $(".cb-lv-main").first().find(".cb-scr-wll-chvrn").children(".cb-text-complete").text();
            console.log("\n")
            console.log(clc.greenBright("LIVE   🏏  SCORES"))
                console.log("\n")
                console.log(clc.magenta	(matchHeaders[0]))
                if(!scores[0] & !scores[1]){
                    console.log((clc.blackBright("Match has not Started Yet !!")));
                }
                else{
                    console.log(clc.cyanBright(scores[0]));
                    console.log(clc.cyanBright(scores[1].trim()));
                }
                if(live){
                    console.log(clc.yellowBright(live));
                }
                if(matchRes){
                    console.log(clc.greenBright(matchRes));
                }
            }
            console.log("\n");
        done();
    }
});


c.queue('https://www.cricbuzz.com/cricket-match/live-scores');
module.exports = {c};