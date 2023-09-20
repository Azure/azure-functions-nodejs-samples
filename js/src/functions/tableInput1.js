const { app, input } = require('@azure/functions');

const tableInput = input.table({
    tableName: 'Person',
    partitionKey: 'Test',
    rowKey: '{queueTrigger}',
    connection: 'MyStorageConnectionAppSetting',
});

app.storageQueue('storageQueueTrigger1', {
    queueName: 'myqueue-items',
    connection: 'MyStorageConnectionAppSetting',
    extraInputs: [tableInput],
    handler: (queueItem, context) => {
        context.log('Node.js queue trigger function processed work item', queueItem);
        const person = context.extraInputs.get(tableInput);
        context.log('Person entity name: ' + person.Name);
    },
});
