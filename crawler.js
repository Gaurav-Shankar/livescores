var Crawler = require("crawler");
var clc = require("cli-color");
var $;
var f = new Crawler({
    maxConnections: 10,
    callback: function(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            $ = res.$;
            var _parent = $('.cb-lv-main');
            var matches = _parent.text();
            matches = matches.split("News")
            console.log(clc.greenBright("LIVE   🏏  SCORES AND SCHEDULES"))
            for (i = 0; i < matches.length - 1; i++) {
                console.log("\n");
                var individualMatchDetai = matches[i].split(",");
                for (j = 0; j < individualMatchDetai.length; j++) {
                    if (individualMatchDetai[j].includes("      ")) {
                        console.log(clc.cyanBright(individualMatchDetai[j].split("      ")[0]));
                    } else if (individualMatchDetai[j].includes("Read Preview  Match")) {
                        console.log(clc.yellowBright(individualMatchDetai[j].split("Read Preview  Match")[0]));
                        console.log(" Match yet to start")
                    } else if (j == 0) {
                        console.log(clc.redBright(individualMatchDetai[j] + "\n---------------------------------------------------------"));
                    } else {
                        console.log(clc.yellowBright(individualMatchDetai[j]));
                    }
                }
                console.log("\n");
            }
            done();
        }
    }
});

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
                    console.log(clc.cyanBright(scores[1]));
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

f.queue('https://www.cricbuzz.com/cricket-match/live-scores');
c.queue('https://www.cricbuzz.com/cricket-match/live-scores');

module.exports = {
    f,
    c
};