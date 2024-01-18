const { app } = require('@azure/functions');

app.hook.appStart((context) => {
    // add your logic here
});

app.hook.appTerminate((context) => {
    // add your logic here
});
