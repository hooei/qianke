/*
 * htmlmin	html压缩
 * cssmin	css压缩、前缀
 * jsmin		js压缩、混淆
 * imagemin	图片压缩
 * sass		编译
 * allmin	htmlmin cssmin jsmin imagemin
 * watch		自动编译
 * rev		引用文件自动添加版本号   ?rev=@@hash
 * 
 * 
 * watch		src sass => src css		html header footer  src/html => src
 * include	include => src
 * allmin   htmlmin cssmin jsmin   	src => dist
 * rev		dist html => dist html
 * 
 * 
 * 项目初始化
 * gulp dir		创建项目文件夹
 * 
 * 开发
 * gulp watch	监控 自动编译sass、添加header footer
 * 
 * 发布
 * gulp include		添加header footer
 * gulp dist		sass编译，html、css、js压缩，复制img、libs目录
 * 
 * */


var gulp = require('gulp'),

	uglify = require('gulp-uglify'),
	
	sass = require('gulp-ruby-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cleancss = require('gulp-clean-css'),
	
	htmlmin = require('gulp-htmlmin'),
	
//	imagemin = require('gulp-imagemin'),
	
	rev = require('gulp-rev-append'),
	
	fs = require('fs'),
	replace = require('gulp-replace'),
	
	mkdirp = require('mkdirp');
	
	
	
//js压缩混淆
gulp.task('jsmin',function(){
	return gulp.src('src/static/js/*.js')
		.pipe(uglify({
			compress: {
		         drop_console: true
		    }
		}).on('error', function(e){
            console.log(e);
         }))
		.pipe(gulp.dest('dist/static/js/'));
});


//sass编译
gulp.task('sass', function() {
	return sass('src/static/sass/*.scss', {
		style: 'expanded',
		sourcemap: true
	})
	.pipe(sourcemaps.write("./"))
	.pipe(gulp.dest('src/static/css/'))
});



//css编译、自动添加前缀、压缩
gulp.task('cssmin',['sass'], function() {
	return sass('src/static/sass/*.scss', {
		style: 'expanded'
	})
//	gulp.src('src/sass/*.scss')
	.pipe(autoprefixer({
		browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
	}))
	.pipe(cleancss({
		advanced: true,
		compatibility: 'ie7',
		keepBreaks: true,
		keepSpecialComments: '*'
	}))
	.pipe(gulp.dest('dist/static/css/'))
});


//header footer
gulp.task('include', function() {
    var htmlDir = 'src/static/html/';
    fs.readdir(htmlDir, function(err, files) {
        files.forEach(function(f) {
            gulp.src(htmlDir + f)
                .pipe(replace(/<!--header-->[\s\S]*<!--headerend-->/, '<!--header-->\n' + fs.readFileSync('src/static/include/_header.html', 'utf-8') + '\n<!--headerend-->'))
//              .pipe(replace(/<!--footer-->[\s\S]*<!--footerend-->/, '<!--footer-->\n' + fs.readFileSync('src/static/include/_footer.html', 'utf-8') + '\n<!--footerend-->'))
                .pipe(gulp.dest('src/'))
        });
    });
});


//html压缩
gulp.task('htmlmin', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			removeComments: true,//清除注释
			collapseWhitespace: true,//压缩HTML
			removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
			minifyJS: true,//压缩页面JS
			minifyCSS: true//压缩页面CSS
		}))
		.pipe(gulp.dest('dist/'))
});


//imagemin
gulp.task('imagemin', () =>
	gulp.src('src/static/img/*')
		.pipe(imagemin({
			optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
			progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
			interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
			multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		}))
		.pipe(gulp.dest('dist/static/img/'))
);


var revFuc = function(){
	gulp.src('dist/static/*.html')
		.pipe(rev())
		.pipe(gulp.dest('dist/static/'));
}
var revFuc2 = function(){
	gulp.src('dist/static/css/*')
		.pipe(rev())
		.pipe(gulp.dest('dist/static/css/'));
}
var revFuc3 = function(){
	gulp.src('dist/static/js/*')
		.pipe(rev())
		.pipe(gulp.dest('dist/static/js/'));
}
//引用添加版本号   ?rev=@@hash
gulp.task('rev', function() {
	revFuc();
	revFuc2();
	revFuc3();
});


//引用添加版本号   ?rev=@@hash
gulp.task('revSrc', function() {
	gulp.src('src/static/*.html')
		.pipe(rev())
		.pipe(gulp.dest('src/static/'));
	gulp.src('src/static/js/*')
		.pipe(rev())
		.pipe(gulp.dest('src/js/static/'));
	gulp.src('src/static/css/*')
		.pipe(rev())
		.pipe(gulp.dest('src/static/css/'));	
});


//复制文件
gulp.task('copyimg', function() {
    return gulp.src(['src/static/img/*'])
        .pipe(gulp.dest('dist/static/img/'));
});
gulp.task('copylib', function() {
    return gulp.src(['src/static/libs/*'])
        .pipe(gulp.dest('dist/static/libs/'));
});
gulp.task('copyphp', function() {
    return gulp.src(['src/static/server/*'])
        .pipe(gulp.dest('dist/static/server/'));
});



	//sass编译
	gulp.task('sass2', function() {
		return sass('other/src/static/*/css/*.scss', {
			style: 'expanded',
			sourcemap: true
		})
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest('other/src/'))
	});
	
	//sass编译
	gulp.task('sass3', function() {
		return sass('other/html/*/css/*.scss', {
			style: 'expanded',
			sourcemap: true
		})
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest('other/html/'))
	});



//自动watch sass编译
gulp.task('watch', function() {
	gulp.watch('src/static/sass/*.scss', ['sass']);
	gulp.watch(['src/static/include/_header.html', 'src/static/include/_footer.html','src/static/html/*.html'], ['include']);
});

//allmin
gulp.task('allmin', ['htmlmin','cssmin','jsmin']);


//发布
gulp.task('dist', ['htmlmin','cssmin','jsmin','copyimg','copylib'],function(){
	revFuc();
});


////创建文件夹
//gulp.task('dir',function(){
//	var dirs = ['src/','src/css/','src/html/','src/img','src/include/','src/js','src/libs','src/sass','dist/','dist/css/','dist/img/','dist/js/','dist/libs/'];
//	dirs.forEach(dir => {
//	    mkdirp.sync(dir);
//	});
//});
//
