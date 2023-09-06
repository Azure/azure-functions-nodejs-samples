import { app, EventGridPartialEvent, InvocationContext, output, Timer } from '@azure/functions';

export async function timerTrigger1(myTimer: Timer, context: InvocationContext): Promise<EventGridPartialEvent> {
    const timeStamp = new Date().toISOString();
    return {
        id: 'message-id',
        subject: 'subject-name',
        dataVersion: '1.0',
        eventType: 'event-type',
        data: {
            name: 'John Henry',
        },
        eventTime: timeStamp,
    };
}

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    return: output.eventGrid({
        topicEndpointUri: 'MyEventGridTopicUriSetting',
        topicKeySetting: 'MyEventGridTopicKeySetting',
    }),
    handler: timerTrigger1,
});
