// NOT RECOMMENDED PATTERN
import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import * as fs from 'fs';

export async function httpTriggerBadAsync(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    let fileData: Buffer;
    fs.readFile('./helloWorld.txt', (err, data) => {
        if (err) {
            context.error(err);
            // BUG #1: This will result in an uncaught exception that crashes the entire process
            throw err;
        }
        fileData = data;
    });
    // BUG #2: fileData is not guaranteed to be set before the invocation ends
    return { body: fileData };
}

app.http('httpTriggerBadAsync', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: httpTriggerBadAsync,
});
