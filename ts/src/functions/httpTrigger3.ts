import { app, HttpRequest, HttpResponseInit, input, InvocationContext } from '@azure/functions';

const tableInput = input.generic({
    type: 'table',
    partitionKey: 'products',
    tableName: 'products',
    rowKey: '{id}',
});

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    return { jsonBody: context.extraInputs.get(tableInput) };
}

app.http('httpTrigger1', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'products/{id}',
    extraInputs: [tableInput],
    handler: httpTrigger1,
});
