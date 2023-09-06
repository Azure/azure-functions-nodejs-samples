import { app, InvocationContext } from '@azure/functions';

export async function eventHubTrigger1(messages: unknown[], context: InvocationContext): Promise<void> {
    context.log(`Event hub function processed ${messages.length} messages`);
    for (let i = 0; i < messages.length; i++) {
        context.log('Event hub message:', messages[i]);
        context.log(`EnqueuedTimeUtc = ${context.triggerMetadata.enqueuedTimeUtcArray[i]}`);
        context.log(`SequenceNumber = ${context.triggerMetadata.sequenceNumberArray[i]}`);
        context.log(`Offset = ${context.triggerMetadata.offsetArray[i]}`);
    }
}

app.eventHub('eventHubTrigger1', {
    connection: 'myEventHubReadConnectionAppSetting',
    eventHubName: 'MyEventHub',
    cardinality: 'many',
    handler: eventHubTrigger1,
});
