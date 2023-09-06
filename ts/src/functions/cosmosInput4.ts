import { app, input, InvocationContext } from '@azure/functions';

const cosmosInput = input.cosmosDB({
    databaseName: 'MyDb',
    collectionName: 'MyCollection',
    sqlQuery: 'SELECT * from c where c.departmentId = {departmentId}',
    connectionStringSetting: 'CosmosDBConnection',
});

export async function storageQueueTrigger1(queueItem: unknown, context: InvocationContext): Promise<void> {
    const documents = context.extraInputs.get(cosmosInput);
    for (const document of documents) {
        // operate on each document
    }
}

app.storageQueue('storageQueueTrigger1', {
    queueName: 'outqueue',
    connection: 'MyStorageConnectionAppSetting',
    extraInputs: [cosmosInput],
    handler: storageQueueTrigger1,
});
