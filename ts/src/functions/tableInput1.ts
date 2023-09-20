import { app, input, InvocationContext } from '@azure/functions';

const tableInput = input.table({
    tableName: 'Person',
    partitionKey: 'Test',
    rowKey: '{queueTrigger}',
    connection: 'MyStorageConnectionAppSetting',
});

interface PersonEntity {
    PartitionKey: string;
    RowKey: string;
    Name: string;
}

export async function storageQueueTrigger1(queueItem: unknown, context: InvocationContext): Promise<void> {
    context.log('Node.js queue trigger function processed work item', queueItem);
    const person = <PersonEntity>context.extraInputs.get(tableInput);
    context.log('Person entity name: ' + person.Name);
}

app.storageQueue('storageQueueTrigger1', {
    queueName: 'myqueue-items',
    connection: 'MyStorageConnectionAppSetting',
    extraInputs: [tableInput],
    handler: storageQueueTrigger1,
});
