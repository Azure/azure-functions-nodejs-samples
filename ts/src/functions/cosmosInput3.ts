import { app, HttpRequest, HttpResponseInit, input, InvocationContext } from '@azure/functions';

const cosmosInput = input.cosmosDB({
    databaseName: 'ToDoItems',
    collectionName: 'Items',
    id: '{id}',
    partitionKey: '{partitionKeyValue}',
    connectionStringSetting: 'CosmosDBConnection',
});

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
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
}

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'todoitems/{partitionKeyValue}/{id}',
    extraInputs: [cosmosInput],
    handler: httpTrigger1,
});
