const { app, input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'ToDoItems',
    collectionName: 'Items',
    id: '{Query.id}',
    partitionKey: '{Query.partitionKeyValue}',
    connectionStringSetting: 'CosmosDBConnection',
});

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    handler: (request, context) => {
        const toDoItem = context.extraInputs.get(cosmosInput);
        if (!toDoItem) {
            return {
                status: 404,
                body: 'ToDo item not found',
            };
        } else {
            return {
                body: `Found ToDo item, Description=${toDoItem.Description}`,
            };
        }
    },
});
