const { app, input, output } = require('@azure/functions');

const blobInput = input.storageBlob({
    path: 'samples-workitems/{queueTrigger}',
    connection: 'MyStorageConnectionAppSetting',
});

const blobOutput = output.storageBlob({
    path: 'samples-workitems/{queueTrigger}-Copy',
    connection: 'MyStorageConnectionAppSetting',
});

app.storageQueue('storageQueueTrigger1', {
    queueName: 'myqueue-items',
    connection: 'MyStorageConnectionAppSetting',
    extraInputs: [blobInput],
    return: blobOutput,
    handler: (queueItem, context) => {
        return context.extraInputs.get(blobInput);
    },
});
