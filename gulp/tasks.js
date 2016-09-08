/* Module Dependencies. */

// External.

// Internal.

/* Module Body. */

const tasks = { };

tasks.LoadTasks =
    function(taskNames)
    {
        taskNames.forEach(
            (taskName) =>
            {
                require('./' + taskName + '.js');
            });
    };

module.exports = tasks;
