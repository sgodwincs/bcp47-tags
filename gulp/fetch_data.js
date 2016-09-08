
/* Module Dependencies. */

// External.

const gulp = require('gulp');

// Internal.

/* Module Body. */

gulp.task('fetch-data',
    () =>
    {
        require('ts-node/register',
            {
                compiler: require('typescript'),
                compilerOptions: {
                    noImplicitAny: true,
                    strictNullChecks: true
                }
            });
        require('../data/fetch_data.ts');
    });
