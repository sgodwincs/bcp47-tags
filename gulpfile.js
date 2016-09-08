/// <reference path="./node_modules/@types/node/index.d.ts" />

/* Module Dependencies. */

// External.

// Internal.

const tasks = require('./gulp/tasks.js');

/* Module Body. */

tasks.LoadTasks(
    [
        'fetch_data',
        'lint',
        'test'
    ]);
