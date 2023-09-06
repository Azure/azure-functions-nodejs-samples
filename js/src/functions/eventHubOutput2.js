const { app, output } = require('@azure/functions');

const eventHubOutput = output.eventHub({
    eventHubName: 'myeventhub',
    connection: 'MyEventHubSendAppSetting',
});

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    return: eventHubOutput,
    handler: (myTimer, context) => {
        // <displayInDocs>
        const timeStamp = new Date().toISOString();
        const message = `Message created at: ${timeStamp}`;
        return [`1: ${message}`, `2: ${message}`];
        // </displayInDocs>
    },
});
