var gulp            = require('gulp');
gulp.task('build', ['copyScripts', 'copyModules', 'copyImg', 'copyHtml', 'copyFonts', 'templates', 'partials', 'iconfont', 'styles']);