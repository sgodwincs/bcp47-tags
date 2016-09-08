/* Module Dependencies. */

// External.

const fs = require('fs');
const gulp = require('gulp');
const Mocha = require('mocha');
const path = require('path');

// Internal.

/* Module Body. */

function AddDirectory(mochaInstance, dirPath)
{
    fs.readdirSync(dirPath).forEach(
        (file) =>
        {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory())
            {
                AddDirectory(mochaInstance, filePath);
            }
            else if (!file.endsWith('.d.ts') && file.endsWith('.ts') && file !== 'globals.ts')
            {
                mochaInstance.addFile(filePath);
            }
        });
}

gulp.task('test',
    (Callback) =>
    {
        // Use Babel transpiler.

        process.env.NODE_ENV = 'development';
        require('ts-node/register',
            {
                compiler: require('typescript'),
                project: './tests/'
            });

        // Start tests.

        const mochaInstance = new Mocha();
        mochaInstance.addFile('./tests/globals.ts');
        AddDirectory(mochaInstance, './tests');

        mochaInstance.run(
            (errors) =>
            {
                if (errors)
                {
                    console.error(errors);
                    process.exit(1);
                }
                else
                {
                    Callback();
                }
            });
    });
