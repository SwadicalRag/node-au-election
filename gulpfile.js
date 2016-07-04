var gulp = require("gulp");

var source = require("vinyl-source-stream");

var browserify = require("browserify");
var watchify = require("watchify");
var tsify = require("tsify");

var ts = require("gulp-typescript");

var notify = require("gulp-notify");
var gutil = require("gulp-util");

var config = {
    apps: [
        {
            dest: __dirname + "/js/",
            base: __dirname + "/",
            browserify: false
        }
    ]
};

var tasks = [];

function register(i,app) {
    var id = app.id || "task-" + i;
    if(app.browserify) {
        tasks[tasks.length] = id;
        
        gulp.task(id,function() {
            // gutil.log("Running sub-task " + id);

            var bundler = browserify({
                cache: {},
                packageCache: {},
                basedir: app.path
            }).add(app.path + "/" + app.main)
                .plugin(tsify)
                .on("time",function(time) {
                    // gutil.log("Finished rebuilding after " + time/1000 + " s")
                });

            function build(rebuild) {
                var bundle = bundler.bundle();

                return bundle
                .pipe(source(app.result))
                .pipe(gulp.dest(app.dest))
                // .on("error",function(err) {
                //     var args = Array.prototype.slice.call(arguments);
                //     notify.onError({
                //         title: "Compile Error",
                //         message: "<%= error.message %>"
                //     }).apply(this,args);
                //     this.emit("end");
                // });
            }

            return build(false);
        });
    }
    else {
        tasks[tasks.length] = id;

        var project = ts.createProject(app.base + "tsconfig.json");

        gulp.task(id,function() {
            // gutil.log("Running sub-task " + id);

            var tsResult = project.src().pipe(ts(project));

            return tsResult.js.pipe(gulp.dest(app.dest));
        });
    }
}

for(var i=0;i < config.apps.length;i++) {
    register(i,config.apps[i]);
}

gulp.task("watch",tasks,function() {
    gulp.watch([
        "**/*.ts",
        "**/*.tsx"
    ],tasks);
});
