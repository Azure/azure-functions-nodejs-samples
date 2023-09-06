const { app, output } = require('@azure/functions');

const queueOutput = output.storageQueue({
    queueName: 'outqueue',
    connection: 'MyStorageConnectionAppSetting',
});

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraOutputs: [queueOutput],
    handler: async (request, context) => {
        // <displayInDocs>
        context.extraOutputs.set(queueOutput, ['message 1', 'message 2']);
        // </displayInDocs>
        return { body: 'Created queue item.' };
    },
});
