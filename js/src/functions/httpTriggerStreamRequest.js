const { app } = require('@azure/functions');
const { createWriteStream } = require('fs');
const { Writable } = require('stream');

app.http('httpTriggerStreamRequest', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const writeStream = createWriteStream('<output file path>');
        await request.body.pipeTo(Writable.toWeb(writeStream));

        return { body: 'Done!' };
    },
});
