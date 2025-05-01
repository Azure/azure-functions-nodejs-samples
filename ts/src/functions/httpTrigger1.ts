import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const nameFromQueryParam = request.query.get('name');

    const nameFromJsonBody: string = request.headers.get('content-type')?.includes('application/json') 
    ? (await request.json())?.name 
    : undefined;

    return { body: `Hello, ${nameFromQueryParam || nameFromJsonBody || `world`}!` };
}

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: httpTrigger1,
});
