    concat   = require('gulp-concat'),
    cssmin   = require('gulp-cssmin'),
    del      = require('del'),
    gulp     = require('gulp'),
    jshint   = require('gulp-jshint'),
    jsonlint = require('gulp-json-lint'),
    less     = require('gulp-less-sourcemap'),
    path     = require('path'),
    prompt   = require('gulp-prompt'),
    uglify   = require('gulp-uglify'),
    argv     = require('yargs').argv;

// LESS plugins
var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });


gulp.task('default', ['build']);
gulp.task('selftest', ['lint_gulp' , 'lint_pkg']);


// Lint package.json 
gulp.task('lint_pkg', function(){

  gulp.src('package.json')
      .pipe(cache('linting_pkg'))
      .pipe(jsonlint())
      .pipe(jsonlint.report('verbose'));
});


// Lint gulpfile.js
gulp.task('lint_gulp', function(){

  gulp.src('gulpfile.js')
      .pipe(cache('linting_pkg'))
      .pipe(jshint())
      .pipe(jshint.reporter());
});


// Clear distribution folder
gulp.task('clean', function () {
  return del(['dist/*/**']);
});


// Customize Bootstrap assets
gulp.task('build', ['clean'], function(){

  if (argv.select) {
    default_state = true;
  } else {
    default_state = false;
  }

  var _components = [
   { name: 'Print media styles', checked: default_state },
   { name: 'Typography', checked: default_state },
   { name: 'Code', checked: default_state },
   { name: 'Grid system', checked: default_state },
   { name: 'Tables', checked: default_state },
   { name: 'Forms', checked: default_state },
   { name: 'Buttons', checked: default_state },
   { name: 'Responsive utilities\n', checked: default_state },
 
   { name: 'Glyphicons', checked: default_state },
   { name: 'Button groups', checked: default_state },
   { name: 'Input groups', checked: default_state },
   { name: 'Navs', checked: default_state },
   { name: 'Navbar', checked: default_state },
   { name: 'Breadcrumbs', checked: default_state },
   { name: 'Pagination', checked: default_state },
   { name: 'Pager', checked: default_state },
   { name: 'Labels', checked: default_state },
   { name: 'Badges', checked: default_state },
   { name: 'Jumbotron', checked: default_state },
   { name: 'Thumbnails', checked: default_state },
   { name: 'Alerts', checked: default_state },
   { name: 'Progress bars', checked: default_state },
   { name: 'Media items', checked: default_state },
   { name: 'List groups', checked: default_state },
   { name: 'Panels', checked: default_state },
   { name: 'Responsive embed', checked: default_state },
   { name: 'Wells', checked: default_state },
   { name: 'Close icon\n', checked: default_state },
 
   { name: 'Component animations (for JS)', checked: default_state },
   { name: 'Dropdowns', checked: default_state },
   { name: 'Tooltips', checked: default_state },
   { name: 'Popovers', checked: default_state },
   { name: 'Modals', checked: default_state },
   { name: 'Carousel\n', checked: default_state },
  ],
  _dir   = 'node_modules/bootstrap/',
  _fonts = [],
  _js    = [], 
  _less  = [
    _dir+'less/variables.less',
    _dir+'less/mixins/*.less',
    _dir+'less/normalize.less',
  ];

   // Dialog
   return gulp.src('./')
     .pipe(prompt.prompt({
       type: 'checkbox',
       name: 'components',
       message: 'Choose Bootstrap components for custom theme',
       choices: _components,
     }, function(res){

            console.log('\nBuilding custom Bootstrap theme:');

            if (res.components.indexOf('Print media styles')  > -1 ) {
              console.log('+Including print.less');
              _less.push(_dir+'less/print.less');
            }
            if (res.components.indexOf('Glyphicons')  > -1 ) {
              console.log('+Including glyphicons.less');
              _less.push(_dir+'less/glyphicons.less');
              console.log(' Including glyphicons-halflings-regular.eot');
              _fonts.push(_dir+'fonts/glyphicons-halflings-regular.eot');
              console.log(' Including glyphicons-halflings-regular.svg');
              _fonts.push(_dir+'fonts/glyphicons-halflings-regular.svg');
              console.log(' Including glyphicons-halflings-regular.ttf');
              _fonts.push(_dir+'fonts/glyphicons-halflings-regular.ttf');
              console.log(' Including glyphicons-halflings-regular.woff');
              _fonts.push(_dir+'fonts/glyphicons-halflings-regular.woff');
            }
            _less.push(_dir+'less/scaffolding.less');
            if (res.components.indexOf('Typography')  > -1 ) {
              console.log('+Including type.less');
              _less.push(_dir+'less/type.less');
            }
            if (res.components.indexOf('Code')  > -1 ) {
              console.log('+Including code.less');
              _less.push(_dir+'less/code.less');
            }
            if (res.components.indexOf('Grid system')  > -1 ) {
              console.log('+Including grid.less');
              _less.push(_dir+'less/grid.less');
            }
            if (res.components.indexOf('Tables')  > -1 ) {
              console.log('+Including tables.less');
              _less.push(_dir+'less/tables.less');
            }
            if (res.components.indexOf('Forms')  > -1 ) {
              console.log('+Including forms.less');
              _less.push(_dir+'less/forms.less');
            }
            if (res.components.indexOf('Buttons')  > -1 ) {
              console.log('+Including buttons.less');
              _less.push(_dir+'less/buttons.less');
            }
            if (res.components.indexOf('Component animations (for JS)\n')  > -1 ) {
              console.log('+Including component-animations.less');
              _less.push(_dir+'less/component-animations.less');
            }
            if (res.components.indexOf('Dropdowns')  > -1 ) {
              console.log('+Including dropdowns.less');
              _less.push(_dir+'less/dropdowns.less');
              console.log(' Including dropdown.js');
              _js.push(_dir+'js/dropdown.js');
            }
            if (res.components.indexOf('Button groups')  > -1 ) {
              console.log('+Including button-groups.less');
              _less.push(_dir+'less/button-groups.less');
              console.log(' Including button.js');
              _js.push(_dir+'js/button.js');
            }
            if (res.components.indexOf('Input groups')  > -1 ) {
              console.log('+Including input-groups.less');
              _less.push(_dir+'less/input-groups.less');
            }
            if (res.components.indexOf('Navs')  > -1 ) {
              console.log('+Including navs.less');
              _less.push(_dir+'less/navs.less');
              console.log(' Including tab.js');
              _js.push(_dir+'js/tab.js');
            }
            if (res.components.indexOf('Breadcrumbs')  > -1 ) {
              console.log('+Including breadcrumbs.less');
              _less.push(_dir+'less/breadcrumbs.less');
            }
            if (res.components.indexOf('Pagination')  > -1 ) {
              console.log('+Including pagination.less');
              _less.push(_dir+'less/pagination.less');
            }
            if (res.components.indexOf('Pager')  > -1 ) {
              console.log('+Including pager.less');
              _less.push(_dir+'less/pager.less');
            }
            if (res.components.indexOf('Labels')  > -1 ) {
              console.log('+Including labels.less');
              _less.push(_dir+'less/labels.less');
            }
            if (res.components.indexOf('Badges')  > -1 ) {
              console.log('+Including badges.less');
              _less.push(_dir+'less/badges.less');
            }
            if (res.components.indexOf('Jumbotron')  > -1 ) {
              console.log('+Including jumbotron.less');
              _less.push(_dir+'less/jumbotron.less');
            }
            if (res.components.indexOf('Thumbnails')  > -1 ) {
              console.log('+Including thumbnails.less');
              _less.push(_dir+'less/thumbnails.less');
            }
            if (res.components.indexOf('Alerts')  > -1 ) {
              console.log('+Including alerts.less');
              _less.push(_dir+'less/alerts.less');
              console.log(' Including alert.js');
              _js.push(_dir+'js/alert.js');
            }
            if (res.components.indexOf('Progress bars')  > -1 ) {
              console.log('+Including progress-bars.less');
              _less.push(_dir+'less/progress-bars.less');
            }
            if (res.components.indexOf('Media bars')  > -1 ) {
              console.log('+Including media-items.less');
              _less.push(_dir+'less/media-items.less');
            }
            if (res.components.indexOf('List groups')  > -1 ) {
              console.log('+Including list-group.less');
              _less.push(_dir+'less/list-group.less');
            }
            if (res.components.indexOf('Panels')  > -1 ) {
              console.log('+Including panels.less');
              _less.push(_dir+'less/panels.less');
            }
            if (res.components.indexOf('Responsive embed')  > -1 ) {
              console.log('+Including responsive-embed.less');
              _less.push(_dir+'less/responsive-embed.less');
            }
            if (res.components.indexOf('Wells')  > -1 ) {
              console.log('+Including wells.less');
              _less.push(_dir+'less/wells.less');
            }
            if (res.components.indexOf('Close icon\n')  > -1 ) {
              console.log('+Including close.less');
              _less.push(_dir+'less/close.less');
            }
            if (res.components.indexOf('Modals')  > -1 ) {
              console.log('+Including modals.less');
              _less.push(_dir+'less/modals.less');
              console.log(' Including modal.js');
              _js.push(_dir+'js/modal.js');
            }
            if (res.components.indexOf('Tooltips')  > -1 ) {
              console.log('+Including tooltips.less');
              _less.push(_dir+'less/tooltips.less');
              console.log(' Including tooltip.js');
              _js.push(_dir+'js/tooltip.js');
            }
            if (res.components.indexOf('Popovers')  > -1 ) {
              console.log('+Including popovers.less');
              _less.push(_dir+'less/popovers.less');
              console.log(' Including popover.js');
              _js.push(_dir+'js/popover.js');
            }
            if (res.components.indexOf('Carousel\n')  > -1 ) {
              console.log('+Including carousel.less');
              _less.push(_dir+'less/carousel.less');
              console.log(' Including carousel.js');
              _js.push(_dir+'js/carousel.js');
            }
            console.log('+Including utilities.less');
            _less.push(_dir+'less/utilities.less');
            if (res.components.indexOf('Responsive utilities')  > -1 ) {
              console.log('+Including responsive-utilities.less');
              _less.push(_dir+'less/responsive-utilities.less');
            }

          console.log('\n'+_less.length+' styles, '+_js.length+' scripts and '+_fonts.length+' in total');
          console.log('Crunching…');

          // Concatenate LESS & compile CSS
          gulp.src(_less)
              .pipe(concat('bootstrap.less'))
              .pipe(less({
                    plugins: [autoprefix],
                    paths: [ path.join(__dirname, 'less', 'includes') ]
                  }))
              .pipe(concat('bootstrap.css'))
              .pipe(gulp.dest('dist/css/'))
              .pipe(concat('bootstrap.min.css'))
              .pipe(cssmin())
              .pipe(gulp.dest('dist/css/'));


          // Copy Fonts
          gulp.src(_fonts)
              .pipe(gulp.dest('dist/fonts/'));


          // Compile JavaScript
          gulp.src(_js)
              .pipe(jshint())
              .pipe(concat('bootstrap.js'))
              .pipe(gulp.dest('dist/js/'))
              .pipe(concat('bootstrap.min.js'))
              .pipe(uglify())
              .pipe(gulp.dest('dist/js/'));

        }));
});