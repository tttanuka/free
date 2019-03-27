var gulp = require('gulp'),
	scss = require('gulp-sass'),
	browserSync = require('browser-sync'),
	uglifyjs = require('gulp-uglifyjs'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer');


gulp.task('scss', function(){
	return gulp.src('app/scss/**/*.scss')
			.pipe(scss({outputStyle: 'compressed'}))
			.pipe(autoprefixer({browsers:['last 8 version']}))
			.pipe(rename({suffix:'.min'}))
			.pipe(gulp.dest('app/css'))
			.pipe(browserSync.reload({stream:true}))
		});

gulp.task('script', function(){
	return gulp.src('app/js/**/*.js')
			.pipe(browserSync.reload({stream:true}))
		});

gulp.task('code', function(){
	return gulp.src('app/*.html')
			.pipe(browserSync.reload({stream:true}))
		});




gulp.task('browser-sync', function(){
	browserSync.init({
		server:{
			baseDir:"app"
		}
	})
});

gulp.task('js', function(){
	return gulp.src(/*[*/'app/libs/slick-carousel/slick/slick.js'/*,
			'app/libs/magnific-popup/dist/jquery.magnific-popup.js']*/)
	.pipe(concat('libs.min.js'))
	.pipe(uglifyjs())
	.pipe(gulp.dest('app/js'))

});

gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', gulp.parallel('scss' ))
	gulp.watch('app/js/**/*.js', gulp.parallel('script' ))
	gulp.watch('app/*.html', gulp.parallel('code' ))
});

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'))
