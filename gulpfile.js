var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    // minifycss = require('gulp-minify-css'),
    // jshint = require('gulp-jshint'),
    // uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    // rename = require('gulp-rename'),
    // concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    // livereload = require('gulp-livereload'),
    // del = require('del'),
    browserSync = require('browser-sync');

gulp.task('html', function () {
	return gulp.src('src/**/*.html', {base: 'src'})
		.pipe(gulp.dest('.'))
		.pipe(notify({message: 'HTML done!'}));
});

gulp.task('sass', function () {
	return sass('src/**/*.scss', {base: 'src'}, {style: 'expanded'})
		.pipe(autoprefixer('last 2 version', 'ie >= 7'))
		.pipe(gulp.dest('.'))
		.pipe(notify({message: 'Sass done!'}));
});

gulp.task('css', function () {
	return gulp.src('src/**/*.css', {base: 'src'})
		.pipe(gulp.dest('.'))
		.pipe(notify({message: 'CSS done!'}));
});

gulp.task('js', function () {
	return gulp.src('src/**/*.js', {base: 'src'})
		// .pipe(jshint())
		// .pipe(jshint.reporter('default'))
		.pipe(gulp.dest('.'))
		.pipe(notify({message: 'JS done!'}));
});

gulp.task('img', function () {
	return gulp.src('src/**/images/*', {base: 'src'})
		.pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
		.pipe(gulp.dest('.'))
		.pipe(notify({message: 'Images done!'}))
});

gulp.task('default', ['html', 'sass', 'css', 'js', 'img']);

gulp.task('refresh', ['html', 'sass', 'css', 'js', 'img'], function () {
	var files = [
		'./**/*.html',
		'./**/*.css',
		'./**/*.js',
		'./**/images/*'
	];

	browserSync.init(files, {
		server: {
			baseDir: '.'
		}
	});

	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/**/*.scss', ['sass']);
	gulp.watch('src/**/*.css', ['css']);
	gulp.watch('src/**/*.js', ['js']);
	gulp.watch('src/**/images/*', ['img']);
});