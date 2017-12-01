var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

//生成图标字体文件
gulp.task('Iconfont', function () {
    return gulp.src(['../assets/iconfontSvg/*.svg'])
        .pipe(iconfontCss({
            fontName: 'spicons', //字体名 
            path: '../assets/templates/iconFont.less', //模板文件路径 
            targetPath: '../_spicons-icons.less',
            cssClass: 'sp-icon', //样式类名 
            fontPath: '/fonts/'
        }))
        .pipe(iconfont({
            fontName: 'spicons', // required
            prependUnicode: false, // recommended option
            formats: ['ttf', 'eot', 'woff', 'svg'],
            normalize: true,
            fontHeight: 1001 // default, 'woff2' and 'svg' are available
        }))
        .pipe(gulp.dest('../src/styles/common/iconfont/fonts'));
});
// 编译less
gulp.task('css', ['Iconfont'], function () {
    gulp.src('../src/styles/index.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(rename('myDesign.css'))
        .pipe(gulp.dest('../dist/styles'));
});
// 拷贝字体文件
gulp.task('fonts', ['Iconfont'],function () {
    gulp.src('../src/styles/common/iconfont/fonts/*.*')
        .pipe(gulp.dest('../dist/styles/fonts'));
});

gulp.task('default', ['css', 'fonts','Iconfont']);