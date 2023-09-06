const { app } = require('@azure/functions');

app.eventHub('eventHubTrigger1', {
    connection: 'myEventHubReadConnectionAppSetting',
    eventHubName: 'MyEventHub',
    cardinality: 'one',
    handler: (message, context) => {
        context.log('Event hub function processed message:', message);
        context.log('EnqueuedTimeUtc =', context.triggerMetadata.enqueuedTimeUtc);
        context.log('SequenceNumber =', context.triggerMetadata.sequenceNumber);
        context.log('Offset =', context.triggerMetadata.offset);
    },
});
