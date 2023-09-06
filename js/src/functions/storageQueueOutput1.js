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
        const body = await request.text();
        context.extraOutputs.set(queueOutput, body);
        return { body: 'Created queue item.' };
    },
});
