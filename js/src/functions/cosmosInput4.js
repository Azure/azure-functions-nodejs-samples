const { app, input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'MyDb',
    collectionName: 'MyCollection',
    sqlQuery: 'SELECT * from c where c.departmentId = {departmentId}',
    connectionStringSetting: 'CosmosDBConnection',
});

app.storageQueue('storageQueueTrigger1', {
    queueName: 'outqueue',
    connection: 'MyStorageConnectionAppSetting',
    extraInputs: [cosmosInput],
    handler: (queueItem, context) => {
        const documents = context.extraInputs.get(cosmosInput);
        for (const document of documents) {
            // operate on each document
        }
    },
});
