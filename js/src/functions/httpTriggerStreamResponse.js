const { app } = require('@azure/functions');
const { createReadStream } = require('fs');

app.http('httpTriggerStreamResponse', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const body = createReadStream('<input file path>');

        return { body };
    },
});
