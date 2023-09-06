const { app } = require('@azure/functions');

app.serviceBusQueue('serviceBusQueueTrigger1', {
    connection: 'MyServiceBusConnection',
    queueName: 'testqueue',
    handler: (message, context) => {
        context.log('Service bus queue function processed message:', message);
        context.log('EnqueuedTimeUtc =', context.triggerMetadata.enqueuedTimeUtc);
        context.log('DeliveryCount =', context.triggerMetadata.deliveryCount);
        context.log('MessageId =', context.triggerMetadata.messageId);
    },
});
