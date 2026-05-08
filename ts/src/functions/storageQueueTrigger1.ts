import { app, InvocationContext } from '@azure/functions';

export async function storageQueueTrigger1(queueItem: string, context: InvocationContext): Promise<void> {
    context.log('Storage queue function processed work item:', queueItem);
    context.log('expirationTime =', context.triggerMetadata.expirationTime);
    context.log('insertionTime =', context.triggerMetadata.insertionTime);
    context.log('nextVisibleTime =', context.triggerMetadata.nextVisibleTime);
    context.log('id =', context.triggerMetadata.id);
    context.log('popReceipt =', context.triggerMetadata.popReceipt);
    context.log('dequeueCount =', context.triggerMetadata.dequeueCount);
}

app.storageQueue<string>('storageQueueTrigger1', {
    queueName: 'myqueue-items',
    connection: 'MyStorageConnectionAppSetting',
    handler: storageQueueTrigger1,
});
