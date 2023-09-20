import { HttpRequest, HttpResponseInit, InvocationContext, app, output } from '@azure/functions';

const sqlTodoOutput = output.sql({
    commandText: 'dbo.ToDo',
    connectionStringSetting: 'SqlConnectionString',
});

const sqlRequestLogOutput = output.sql({
    commandText: 'dbo.RequestLog',
    connectionStringSetting: 'SqlConnectionString',
});

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('HTTP trigger and SQL output binding function processed a request.');

    const newLog = {
        RequestTimeStamp: Date.now(),
        ItemCount: 1,
    };
    context.extraOutputs.set(sqlRequestLogOutput, newLog);

    const body = await request.json();
    context.extraOutputs.set(sqlTodoOutput, body);

    return { status: 201 };
}

app.http('httpTrigger1', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [sqlTodoOutput, sqlRequestLogOutput],
    handler: httpTrigger1,
});
