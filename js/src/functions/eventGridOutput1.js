const { app, output } = require('@azure/functions');

const eventGridOutput = output.eventGrid({
    topicEndpointUri: 'MyEventGridTopicUriSetting',
    topicKeySetting: 'MyEventGridTopicKeySetting',
});

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    return: eventGridOutput,
    handler: (myTimer, context) => {
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
    },
});
