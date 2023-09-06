const { app, input, output } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'MyDatabase',
    collectionName: 'MyCollection',
    id: '{queueTrigger}',
    partitionKey: '{queueTrigger}',
    connectionStringSetting: 'MyAccount_COSMOSDB',
});

const cosmosOutput = output.cosmosDB({
    databaseName: 'MyDatabase',
    collectionName: 'MyCollection',
    createIfNotExists: false,
    partitionKey: '{queueTrigger}',
    connectionStringSetting: 'MyAccount_COSMOSDB',
});

app.storageQueue('storageQueueTrigger1', {
    queueName: 'outqueue',
    connection: 'MyStorageConnectionAppSetting',
    extraInputs: [cosmosInput],
    extraOutputs: [cosmosOutput],
    handler: (queueItem, context) => {
        const doc = context.extraInputs.get(cosmosInput);
        doc.text = 'This was updated!';
        context.extraOutputs.set(cosmosOutput, doc);
    },
});
