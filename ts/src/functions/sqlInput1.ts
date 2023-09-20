import { app, HttpRequest, HttpResponseInit, input, InvocationContext } from '@azure/functions';

const sqlInput = input.sql({
    commandText: 'select [Id], [order], [title], [url], [completed] from dbo.ToDo',
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString',
});

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('HTTP trigger and SQL input binding function processed a request.');
    const toDoItems = context.extraInputs.get(sqlInput);
    return {
        jsonBody: toDoItems,
    };
}

app.http('httpTrigger1', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [sqlInput],
    handler: httpTrigger1,
});
