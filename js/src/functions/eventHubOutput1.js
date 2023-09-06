const { app, output } = require('@azure/functions');

const eventHubOutput = output.eventHub({
    eventHubName: 'myeventhub',
    connection: 'MyEventHubSendAppSetting',
});

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    return: eventHubOutput,
    handler: (myTimer, context) => {
        const timeStamp = new Date().toISOString();
        return `Message created at: ${timeStamp}`;
    },
});
