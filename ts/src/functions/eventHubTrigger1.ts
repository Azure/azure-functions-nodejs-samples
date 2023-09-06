import { app, InvocationContext } from '@azure/functions';

export async function eventHubTrigger1(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Event hub function processed message:', message);
    context.log('EnqueuedTimeUtc =', context.triggerMetadata.enqueuedTimeUtc);
    context.log('SequenceNumber =', context.triggerMetadata.sequenceNumber);
    context.log('Offset =', context.triggerMetadata.offset);
}

app.eventHub('eventHubTrigger1', {
    connection: 'myEventHubReadConnectionAppSetting',
    eventHubName: 'MyEventHub',
    cardinality: 'one',
    handler: eventHubTrigger1,
});
