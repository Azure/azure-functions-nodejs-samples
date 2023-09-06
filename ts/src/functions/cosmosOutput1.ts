import { app, InvocationContext, output } from '@azure/functions';

interface MyQueueItem {
    name: string;
    employeeId: string;
    address: string;
}

interface MyCosmosItem {
    id: string;
    name: string;
    employeeId: string;
    address: string;
}

export async function storageQueueTrigger1(queueItem: MyQueueItem, context: InvocationContext): Promise<MyCosmosItem> {
    return {
        id: `${queueItem.name}-${queueItem.employeeId}`,
        name: queueItem.name,
        employeeId: queueItem.employeeId,
        address: queueItem.address,
    };
}

app.storageQueue('storageQueueTrigger1', {
    queueName: 'inputqueue',
    connection: 'MyStorageConnectionAppSetting',
    return: output.cosmosDB({
        databaseName: 'MyDatabase',
        collectionName: 'MyCollection',
        createIfNotExists: true,
        connectionStringSetting: 'MyAccount_COSMOSDB',
    }),
    handler: storageQueueTrigger1,
});
