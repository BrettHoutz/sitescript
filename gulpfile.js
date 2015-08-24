var es6 = './*.es6.js';
var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var fs = require('fs');

gulp.task('babel', function () {
    return gulp.src(['./engine.es6.js', es6])
        .pipe(concat('engine.js'))
        .pipe(babel())
        .pipe(gulp.dest('./sitescript/'));
});

gulp.task('aliases', function(){
    var text = fs.readFileSync("./sitescript/elements.js");
    fs.writeFileSync("./sitescript/aliases.js", buildAliases(text));
})

gulp.task('watch', function() {
    gulp.watch(es6, ['babel']);
});

gulp.task('default', ['watch']);

function buildAliases(elements){
    var res = "";
    var pattern = /\/\/\/((\w+,?)+)\s*.*ss__(\w+)\((.*)\)/gm;
    var match;
    while(match = pattern.exec(elements)){
        var args = match.pop();
        var name = match.pop();
        var aliases = match[1].split(",");
        for(var i=0;i<aliases.length;i++){
            var alias = aliases[i];
            if(alias){
                res += "function ss__" + alias + "(" + args
                    + "){ return ss__" + name+ "(" + args + "); }\n";
            }
            
        }
    }
    return res;
}