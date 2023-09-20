const { app, input } = require('@azure/functions');

const sqlInput = input.sql({
    commandText: 'select [Id], [order], [title], [url], [completed] from dbo.ToDo',
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString',
});

app.http('httpTrigger1', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [sqlInput],
    handler: (request, context) => {
        context.log('HTTP trigger and SQL input binding function processed a request.');
        const toDoItems = context.extraInputs.get(sqlInput);
        return {
            jsonBody: toDoItems,
        };
    },
});
