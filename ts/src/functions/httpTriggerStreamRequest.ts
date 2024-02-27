import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { createWriteStream } from 'fs';
import { Writable } from 'stream';

export async function httpTriggerStreamRequest(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    const writeStream = createWriteStream('<output file path>');
    await request.body.pipeTo(Writable.toWeb(writeStream));

    return { body: 'Done!' };
}

app.http('httpTriggerStreamRequest', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: httpTriggerStreamRequest,
});
