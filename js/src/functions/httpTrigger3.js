const { app, input } = require('@azure/functions');

const tableInput = input.table({
    connection: 'MyStorageConnectionAppSetting',
    partitionKey: 'products',
    tableName: 'products',
    rowKey: '{id}',
});

app.http('httpTrigger1', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'products/{id}',
    extraInputs: [tableInput],
    handler: async (request, context) => {
        return { jsonBody: context.extraInputs.get(tableInput) };
    },
});
