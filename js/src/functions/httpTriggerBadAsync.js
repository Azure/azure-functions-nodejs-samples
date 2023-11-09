// NOT RECOMMENDED PATTERN
const { app } = require('@azure/functions');
const fs = require('fs');

app.http('httpTriggerBadAsync', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        let fileData;
        fs.readFile('./helloWorld.txt', (err, data) => {
            if (err) {
                context.error(err);
                // BUG #1: This will result in an uncaught exception that crashes the entire process
                throw err;
            }
            fileData = data;
        });
        // BUG #2: fileData is not guaranteed to be set before the invocation ends
        return { body: fileData };
    },
});
