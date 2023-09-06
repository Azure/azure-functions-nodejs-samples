import { app, InvocationContext } from '@azure/functions';

export async function cosmosDBTrigger1(documents: unknown[], context: InvocationContext): Promise<void> {
    context.log(`Cosmos DB function processed ${documents.length} documents`);
}

app.cosmosDB('cosmosDBTrigger1', {
    connection: '<connection-app-setting>',
    databaseName: 'Tasks',
    containerName: 'Items',
    createLeaseContainerIfNotExists: true,
    handler: cosmosDBTrigger1,
});
