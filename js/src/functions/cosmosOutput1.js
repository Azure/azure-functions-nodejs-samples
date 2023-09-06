const { app, output } = require('@azure/functions');

const cosmosOutput = output.cosmosDB({
    databaseName: 'MyDatabase',
    collectionName: 'MyCollection',
    createIfNotExists: true,
    connectionStringSetting: 'MyAccount_COSMOSDB',
});

app.storageQueue('storageQueueTrigger1', {
    queueName: 'inputqueue',
    connection: 'MyStorageConnectionAppSetting',
    return: cosmosOutput,
    handler: (queueItem, context) => {
        return {
            id: `${queueItem.name}-${queueItem.employeeId}`,
            name: queueItem.name,
            employeeId: queueItem.employeeId,
            address: queueItem.address,
        };
    },
});
