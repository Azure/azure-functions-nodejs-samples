const { app, input } = require('@azure/functions');

const sqlInput = input.sql({
    commandText: 'select [Id], [order], [title], [url], [completed] from dbo.ToDo where Id = @Id',
    commandType: 'Text',
    parameters: '@Id={Query.id}',
    connectionStringSetting: 'SqlConnectionString',
});

app.http('httpTrigger1', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [sqlInput],
    handler: (request, context) => {
        context.log('HTTP trigger and SQL input binding function processed a request.');
        const toDoItem = context.extraInputs.get(sqlInput);
        return {
            jsonBody: toDoItem,
        };
    },
});
