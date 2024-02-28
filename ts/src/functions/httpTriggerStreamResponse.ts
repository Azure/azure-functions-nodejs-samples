import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { createReadStream } from 'fs';

export async function httpTriggerStreamResponse(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    const body = createReadStream('<input file path>');

    return { body };
}

app.http('httpTriggerStreamResponse', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: httpTriggerStreamResponse,
});
