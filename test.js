var ss = require("./sitescript");
var fs = require("fs");

fs.writeFileSync("./test.html", ss.build().index);