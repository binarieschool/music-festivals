import { src, dest, watch, parallel } from 'gulp';

// CSS
const sass = require('gulp-sass')(require('sass'));
import plumber from 'gulp-plumber';

// ** Improve the performance of the css code ** //
// npm i --save-dev cssnano autoprefixer postcss gulp-postcss

// autoprefixer = It works in the browser that is indicated
import autoprefixer from 'autoprefixer';

// cssnano = minify the css code to make the web faster
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';

// gulp-sourcemaps = they are a reference that the browser will 
// use to know exactly which line of the scss code is being referenced
// npm i --save-dev gulp-sourcemaps
import { init, write } from 'gulp-sourcemaps';

// Images
import cache from 'gulp-cache';

/* npm install --save-dev gulp-imagemin@7.1.0  THIS VERSION WORKS !!! */
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import avif from 'gulp-avif';

// JAVASCRIPT

// terser = Compress the js code
// npm install gulp-terser-js
import terser from 'gulp-terser-js';

/* ==================== EXAMPLE FOR TASKS
function myTask(done)
    console.log("The first task...");
    done();
}
exports.myTask = myTask; 

NOTE: WE CAN HAVE MANY TASKS
========================================*/


//*** PROJECT TASKS IN GULPFILE.JS ***// 

function taskCSS(done){
    src('src/scss/**/*.scss') // Identify the .scss file that I am going to use
        .pipe(init())
        .pipe(plumber()) // If the pipe fails, the program does not stop
        .pipe( sass() ) // Compile file
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(write('.'))
        .pipe( dest('build/css') ); // Save file to hard disk

    console.log("Task for compile file .scss to .css ...");
    done();
}

/* npm install --save-dev gulp-imagemin@7.1.0  THIS VERSION WORKS !!! */
function taskImages( done ) {
    const op = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(op) ) )
        .pipe( dest('build/img') )
    done();
}

function taskWebp( done ) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(options) )
        .pipe( dest('build/img') )
    done();
}

function taskAvif( done ) {
    const options = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}') 
        .pipe( avif(options) )
        .pipe( dest('./build/img') )
    done();
}

function taskJS(done) {
    src('src/js/**/*.js', taskJS)
        .pipe(init())
        .pipe( terser() )
        .pipe(write('.'))
        .pipe(dest('./build/js'))

    done();    
}

function taskWatch(done) {

    /* watch ('file that listens', the calling function) */
    watch('src/scss/**/*.scss', taskCSS);
    watch('src/js/**/*.js', taskJS);
    console.log("Task for watch...");
    done();
}
exports.taskCSS = taskCSS; 
exports.taskJS = taskJS;
exports.taskImages = taskImages;
exports.taskWebp = taskWebp;
exports.taskAvif = taskAvif;
exports.taskWatch = taskWatch;
exports.taskWatch = parallel ( taskImages,taskWebp,taskAvif,taskJS,taskWatch );
