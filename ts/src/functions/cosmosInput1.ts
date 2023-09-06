import { app, input, InvocationContext, output } from '@azure/functions';

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

export async function storageQueueTrigger1(queueItem: unknown, context: InvocationContext): Promise<void> {
    const doc = context.extraInputs.get(cosmosInput);
    doc.text = 'This was updated!';
    context.extraOutputs.set(cosmosOutput, doc);
}

app.storageQueue('storageQueueTrigger1', {
    queueName: 'outqueue',
    connection: 'MyStorageConnectionAppSetting',
    extraInputs: [cosmosInput],
    extraOutputs: [cosmosOutput],
    handler: storageQueueTrigger1,
});
