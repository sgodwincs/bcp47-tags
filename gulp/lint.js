/* Module Dependencies. */

// External.

const gulp = require('gulp');
const gulpTSLint = require('gulp-tslint');

// Internal.

/* Module Body. */

gulp.task('lint',
    () =>
    {
        return gulp.src(
                [
                    './data/**/*.ts',
                    './gulp/**/*.ts',
                    './source/**/*.ts',
                    './tests/**/*.ts',
                    '!./**/*.d.ts'
                ])
            .pipe(gulpTSLint(
                {
                    tslint: require('tslint')
                }))
            .pipe(gulpTSLint.report('verbose'));
    });
