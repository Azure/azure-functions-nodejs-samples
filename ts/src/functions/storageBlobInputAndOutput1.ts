import { app, input, InvocationContext, output } from '@azure/functions';

const blobInput = input.storageBlob({
    path: 'samples-workitems/{queueTrigger}',
    connection: 'MyStorageConnectionAppSetting',
});

const blobOutput = output.storageBlob({
    path: 'samples-workitems/{queueTrigger}-Copy',
    connection: 'MyStorageConnectionAppSetting',
});

export async function storageQueueTrigger1(queueItem: unknown, context: InvocationContext): Promise<unknown> {
    return context.extraInputs.get(blobInput);
}

app.storageQueue('storageQueueTrigger1', {
    queueName: 'myqueue-items',
    connection: 'MyStorageConnectionAppSetting',
    extraInputs: [blobInput],
    return: blobOutput,
    handler: storageQueueTrigger1,
});
