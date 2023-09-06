import { app, InvocationContext } from '@azure/functions';

export async function serviceBusQueueTrigger1(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus queue function processed message:', message);
    context.log('EnqueuedTimeUtc =', context.triggerMetadata.enqueuedTimeUtc);
    context.log('DeliveryCount =', context.triggerMetadata.deliveryCount);
    context.log('MessageId =', context.triggerMetadata.messageId);
}

app.serviceBusQueue('serviceBusQueueTrigger1', {
    connection: 'MyServiceBusConnection',
    queueName: 'testqueue',
    handler: serviceBusQueueTrigger1,
});
