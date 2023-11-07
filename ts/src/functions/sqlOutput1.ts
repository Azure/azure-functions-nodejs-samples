import { app, HttpRequest, HttpResponseInit, InvocationContext, output } from '@azure/functions';

const sqlOutput = output.sql({
    commandText: 'dbo.ToDo',
    connectionStringSetting: 'SqlConnectionString',
});

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('HTTP trigger and SQL output binding function processed a request.');

    const body = await request.json();
    context.extraOutputs.set(sqlOutput, body);
    return { status: 201 };
}

app.http('httpTrigger1', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [sqlOutput],
    handler: httpTrigger1,
});
