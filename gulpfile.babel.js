/* GULPFILE - MID WIZARD
------------------------------------------------- */


/* REQUIRE
------------------------------------------------- */
const gulp = require('gulp'),
  merge = require('merge-stream'),
  $ = require('gulp-load-plugins')(),
  pug_markdown_filter = require('jstransformer-markdown-it'),
  pug_bemify = require('pug-bemify'),
  browser_sync = require('browser-sync').create(),
  jpeg_recompress = require('imagemin-jpeg-recompress'),
  png_quant = require('imagemin-pngquant'),
  del = require('del');

/**
 * Import Data Objects to Pass to Pug
 */
import {
  EVIDENCE_FIELDS,
  INDUSTRIES,
  CURRENCIES,
  COUNTRIES
} from './data/data.js';

/* SETTINGS
------------------------------------------------- */
var settings = {
  // set the name of the production build folder
  build_folder: 'dist',
  // checks if production build (gulp --production)
  production: !!$.util.env.production,
  // set different asset paths for development and production
  assets: {
    dev: 'http://localhost:3000/',
    pro: 'https://test.chargebacks911.com/mid-wizard/',
    // this tag will be replaced throughout the files with the appropriate asset path
    tag: '{{path}}'
  },
  inject_transform: {
    style: function (filepath, file) {
      return '<style>\n' + file.contents.toString('utf8') + '\n</style>';
    }
  },
  error: function (err) {
    $.util.log($.util.colors.yellow('Error encountered.\n'), $.util.colors.magenta(err));
    this.emit('end');
  },
  browsers: [
      'last 2 versions',
      'safari >= 6',
      'ie >= 7',
      'ff >= 3',
      'ios 6',
      'opera 11',
      'android 4'
    ],
  // css, js, pug paths and names
  css: {
    src: 'src/sass/',
    dest: 'dist/css',
    name: 'main'
  },
  js: {
    src: 'src/js/',
    dest: 'dist/js',
    name: 'main',
    vendor: 'vendor/**/*.js',
    files: [
        'abstracts/variables/**/*.js',
        'abstracts/functions/**/*.js',
        'abstracts/**/*.js',
        'methods/**/*.js',
        'modules/**/*.js',
        'main.js'
      ]
  },
  pug: {
    src: 'src/pug/',
    dest: 'dist/'
  },
  img: {
    src: 'src/img/'
  }
};

// change the assets path if production
var $path = settings.production ? settings.assets.pro.replace(/\/+$/, "") : settings.assets.dev.replace(/\/+$/, "");


/* DELETE all files in dist folder
------------------------------------------------- */
function clean_dist() {
  $.util.log($.util.colors.grey("Cleaning out the production folder...\n"));
  return del(['dist/*/**', 'dist/index.html']);
}
gulp.task('clean', [], function () {
  clean_dist();
});

/* DELETE all images in dist/images folder
------------------------------------------------- */
function clean_img() {
  return del('./dist/img/');
}
gulp.task('clean-img', [], function () {
  clean_img();
});


/* COMPILE CSS
------------------------------------------------- */
function process_css() {
  $.util.log($.util.colors.magenta("Compiling Sass & Minifying CSS\n"));
  var css = gulp.src([settings.css.src + '**/*.scss'])
    .pipe($.sourcemaps.init())
    .pipe($.sass()).on('error', settings.error)
    .pipe($.autoprefixer({
      browsers: settings.browsers,
      cascade: true
    }))
    .pipe($.replace(settings.assets.tag, $path))
    .pipe($.rename(settings.css.name + '.css'));

  // minify and clean css
  var min = css.pipe($.clone())
    .pipe($.cleanCss({
      compatibility: 'ie9',
      level: {
        1: {
          all: true,
          specialComments: 'none'
        },
        2: {
          all: true,
          restructureRules: false,
          mergeNonAdjacentRules: false
        }
      }
    }))
    .pipe($.replace(settings.assets.tag, $path))
    .pipe($.rename(settings.css.name + '.min.css'));

  // merge pipes and output separate files with sourcemaps
  return merge(css, min)
    .pipe($.sourcemaps.write('.'))
    .pipe($.replace(settings.assets.tag, $path))
    .pipe(gulp.dest(settings.css.dest))
    .pipe(browser_sync.stream());
}

gulp.task('css', function () {
  process_css();
});

/* CONCAT and MINIFY JavaScript
------------------------------------------------- */
function process_js() {
  $.util.log($.util.colors.yellow("Combining, transpiling, and minifying JavaScript files\n"));
  // get js files and attach src to beginning
  var js_import = (function () {
    var js_src = settings.js.src,
      i, arr = [],
      src = settings.js.files;

    for (i = 0; i <= src.length - 1; i++) {
      arr.push(js_src + src[i]);
    }
    return arr;
  }());

  // compile Babel & combine all js files in folder, starting alphabetically
  var concat = gulp.src(js_import)
    .pipe($.sourcemaps.init())
    .pipe($.replace(settings.assets.tag, $path))
    .pipe($.concat(settings.js.name + '.js')).on('error', settings.error)
    .pipe($.babel({
      presets: [['env', {
        modules: false
        }]]
    })).on('error', settings.error);

  // minify javascript file
  var ugly = concat.pipe($.clone())
    .pipe($.uglify()).on('error', settings.error)
    .pipe($.replace(settings.assets.tag, $path))
    .pipe($.rename(settings.js.name + '.min.js'));

  // merge pipes and output separate files with sourcemaps.
  return merge(concat, ugly)
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(settings.js.dest))
    .pipe(browser_sync.stream());
}

gulp.task('js', function () {
  process_js();
});

function concat_vendor_js() {
  return gulp.src(settings.js.src + settings.js.vendor)
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browser_sync.stream());
}
gulp.task('vendor-js', function () {
  concat_vendor_js();
});


/* COMPILE Pug
------------------------------------------------- */
function process_pug() {
  $.util.log($.util.colors.green("Compiling Pug\n"));
  var pug_src = settings.pug.src + 'index.pug';
  return gulp.src(pug_src)
    .pipe($.pug({
      pretty: true,
      filters: {
        md: pug_markdown_filter
      },
      data: {
        EVIDENCE_FIELDS,
        CURRENCIES,
        COUNTRIES,
        INDUSTRIES
      },
      plugins: [pug_bemify()]
    })).on('error', settings.error)
    .pipe($.rename(function (filepath) {
      filepath.extname = ".html";
    }))
    .pipe($.replace(settings.assets.tag, $path))
    .pipe(gulp.dest(settings.pug.dest))
    .pipe(browser_sync.stream());
}
gulp.task('pug', function () {
  process_pug();
});

/* COMPRESS Images
------------------------------------------------- */
function process_img() {
  $.util.log($.util.colors.blue("Compressing images\n"));
  clean_img();
  var img_src = settings.img.src + '*';
  return gulp.src(img_src)
    .pipe($.imagemin([
      $.imagemin.gifsicle({
        interlaced: true,
        optimizationLevel: 3
      }),
      $.imagemin.svgo({
        plugins: [{
          removeViewBox: true
        }]
      }),
      jpeg_recompress({
        quality: 'low'
      }),
      png_quant({
        quality: '50'
      })
    ])).on('error', settings.error)
    .pipe(gulp.dest('dist/img'))
    .pipe(browser_sync.stream());
}

gulp.task('img', function () {
  process_img();
});

/* INJECT minified CSS into HTML file <style> tag and remove CSS <link> tag
------------------------------------------------------------------------------- */
function inject_style() {
  $.util.log($.util.colors.grey("Injecting minified CSS into <head>..."));
  return gulp.src('./dist/index.html')
    .pipe($.inject(gulp.src('./dist/css/main.min.css'), {
      starttag: '<!--inject:style-->',
      endtag: '<!--endinject-->',
      removeTags: false,
      transform: settings.inject_transform.style
    }))
    .pipe($.replace('<link rel="stylesheet" href="' + $path + '/css/main.min.css">', ''))
    .pipe(gulp.dest('./dist'));
}

gulp.task('inject-style', function () {
  inject_style();
});

/* CHANGE assets paths
------------------------------------------------- */
function change_asset_path() {

  gulp.src(['./dist/*.html', './dist/css/*'], {
      base: './'
    })
    .pipe($.replace(settings.assets.tag, $path))
    .pipe(gulp.dest('./'));
}
gulp.task('path', function () {
  change_asset_path();
});

/* RUN all Tasks
------------------------------------------------- */
gulp.task('run-tasks', ['css', 'js', 'pug', 'img']);
gulp.task('run', function () {
  clean_dist();
  process_pug();
  process_css();
  process_js();
  process_img();
});

function run() {
  clean_dist();
  process_pug();
  process_css();
  process_js();
  process_img();
}

/* WATCH all folders
------------------------------------------------- */
function watch_files() {
  browser_sync.init({
    server: "./dist/"
  });
  gulp.watch(settings.css.src + '**/*.scss', ['css']);
  gulp.watch(settings.js.src + '**/*.js', ['js']);
  gulp.watch(settings.js.dest + '**/*.js', ['jsdoc']);
  gulp.watch(settings.js.src + settings.js.vendor, ['vendor-js']);
  gulp.watch(settings.pug.src + '**/*.pug', ['pug']);
  gulp.watch(settings.img.src + '*', ['img']);
  gulp.watch(["./dist/index.html"]).on('change', function () {
    browser_sync.reload;
  });
  console.log($.util.colors.grey('\nWatching for Changes...\n'));
}
gulp.task('watch', function () {
  if (settings.production) {
    return;
  } else {
    watch_files();
  }
});

/* DEFAULT TASK
------------------------------------------------- */
gulp.task('default', ['vendor-js'], function () {
  if (settings.production) {
    console.log($.util.colors.red('\nProduction Build.\n'));
    run();
    //      inject_style();
    setTimeout(function () {
      console.log($.util.colors.green('\nBuild Complete.\n'));
    }, 2000);
  } else {
    console.log($.util.colors.yellow('\nDevelopment Build.\n'));
    run();
    setTimeout(watch_files, 2000);
  }
  setTimeout(function () {
    gulp.start('jsdoc');
  }, 3000);

});

/* GENERATE JS DOCUMENTS
------------------------------------------------- */
gulp.task('jsdoc', $.shell.task(['.\\node_modules\\.bin\\jsdoc --readme .\\README.md ' + 'dist\\js\\main.js' + ' -r -d docs']));
