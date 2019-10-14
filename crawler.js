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
            matches = matches.split("News");
            console.log(clc.greenBright("LIVE   🏏  SCORES AND SCHEDULES"))
            for (i = 0; i < matches.length - 1; i++) {
                console.log("\n");
                var individualMatchDetail = matches[i].split(",");
                var matchCity;
                var locationIndex = individualMatchDetail.findIndex(matchDetail => matchDetail.includes(' at '));
                var cityIndex = locationIndex + 1;
                if(individualMatchDetail[cityIndex].includes('Read Preview')) {
                    matchCity = individualMatchDetail[cityIndex].split('Read Preview')[0];
                }
                else {
                    matchCity = individualMatchDetail[cityIndex].split('   ')[0];
                }
                individualMatchDetail[cityIndex] = individualMatchDetail[cityIndex].replace(matchCity, '');
                individualMatchDetail[locationIndex] += `,${matchCity}`;

                for (j = 0; j < individualMatchDetail.length; j++) {
                    individualMatchDetail[j].includes()
                    if (individualMatchDetail[j].includes("      ")) {
                        console.log(clc.cyanBright(individualMatchDetail[j].split("      ")[0]));
                    } else if (individualMatchDetail[j].includes("Read Preview  Match")) {
                        console.log(" Match yet to start")
                    } else if (j == 0) {
                        console.log(clc.redBright(individualMatchDetail[j] + "\n---------------------------------------------------------"));
                    } else {
                        console.log(clc.yellowBright(individualMatchDetail[j]));
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