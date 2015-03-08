var gulp = require('gulp'); 
var domSrc = require('gulp-dom-src'); // 用来打包index.html的js文件为一个
var concat = require('gulp-concat');    // 合并js
var uglify = require('gulp-uglify');    // 压缩js
var templateCache = require('gulp-angular-templatecache');

var es = require('event-stream');
var streamqueue = require('streamqueue');
var cheerio = require('cheerio');   //改变dom结构

gulp.task('build', function () {

    var ngCacheStream = gulp.src(['app/!(bower_components)/**/*.html', 'app/*.html'])
                        .pipe(templateCache());

    var jsStream = domSrc({
        file: 'app/index.html',
        selector: 'script',
        attribute: 'src'
    });

    var combineJs = streamqueue({
        objectMode: true
    }, jsStream, ngCacheStream)

    .pipe(concat('app.full.min.js'))

    //.pipe(uglify())

    .pipe(gulp.dest('build/'));


    var htmlStream = gulp.src('app/index.html')

                    .pipe(es.through(function (data) {

                        // load jsdom
                        var $ = cheerio.load(data.contents.toString());

                        // 移除js和css
                        $('script').remove();
                        $('link[rel="stylesheet"]').remove();
                       
                        // append 合并的js和css 路径
                        $('head').append('<link rel="stylesheet" href="app.full.min.css">\n');
                        $('head').append('<script src="app.full.min.js" async></script>');

                        data.contents = new Buffer($.html());

                        // emit
                        this.emit('data', data);
                    }))

                    .pipe(concat('index.html'))

                    .pipe(gulp.dest('build/'));

    var cssStream = domSrc({
                        file: 'app/index.html',
                        selector: 'link',
                        attribute: 'href'
                    })

                    .pipe(concat('app.full.min.css'))

                    .pipe(gulp.dest('build/'));

    return es.merge(combineJs, htmlStream, cssStream);

});