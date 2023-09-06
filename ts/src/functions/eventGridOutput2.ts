import { app, EventGridPartialEvent, InvocationContext, output, Timer } from '@azure/functions';

export async function timerTrigger1(myTimer: Timer, context: InvocationContext): Promise<EventGridPartialEvent[]> {
    // <displayInDocs>
    const timeStamp = new Date().toISOString();
    return [
        {
            id: 'message-id',
            subject: 'subject-name',
            dataVersion: '1.0',
            eventType: 'event-type',
            data: {
                name: 'John Henry',
            },
            eventTime: timeStamp,
        },
        {
            id: 'message-id-2',
            subject: 'subject-name',
            dataVersion: '1.0',
            eventType: 'event-type',
            data: {
                name: 'John Doe',
            },
            eventTime: timeStamp,
        },
    ];
    // </displayInDocs>
}

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    return: output.eventGrid({
        topicEndpointUri: 'MyEventGridTopicUriSetting',
        topicKeySetting: 'MyEventGridTopicKeySetting',
    }),
    handler: timerTrigger1,
});
