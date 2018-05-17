let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsp = ts.createProject('tsconfig.json'); //使用tsconfig.json文件配置tsc
let exec = require('child_process').exec;
let named = require('vinyl-named')

// const webpack = require('gulp-webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')
let child;
//目录常量
const PATHS = {
  scripts: ['./src/**/*.ts'],
  output: './build',
  view: ['./views/src/**/*.tsx','./views/src/**/*.ts']
};
//编译ts文件
gulp.task('build-ts', ['restart'], function () {
  return gulp.src(PATHS.scripts)
    .pipe(tsp())
    .pipe(gulp.dest(PATHS.output));
});
//监视ts文件变化
gulp.task('watch-ts', ['build-ts'], function () {
  gulp.watch(PATHS.scripts, ['build-ts']);
});
gulp.task('watch-view', ['views'], function () {
  gulp.watch(PATHS.view, ['views']);
});
//自动重启服务器
gulp.task('restart', function () {
  child = exec('supervisor -w build ./build/server.js', (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
});
gulp.task('views', () => {
  return gulp.src('./views/src/index.tsx')
      // 使用webpack配置文件，详细见下
      .pipe(named())
      .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('./views/dist'));
});
//开发任务
gulp.task('dev-server', ['build-ts', 'restart', 'watch-ts']);
gulp.task('dev-view', ['views', 'watch-view'])