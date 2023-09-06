const { app } = require('@azure/functions');

app.cosmosDB('cosmosDBTrigger1', {
    connection: '<connection-app-setting>',
    databaseName: 'Tasks',
    containerName: 'Items',
    createLeaseContainerIfNotExists: true,
    handler: (documents, context) => {
        context.log(`Cosmos DB function processed ${documents.length} documents`);
    },
});
