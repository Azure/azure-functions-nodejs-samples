const { app, output } = require('@azure/functions');

const serviceBusOutput = output.serviceBusQueue({
    queueName: 'testqueue',
    connection: 'MyServiceBusConnection',
});

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    return: serviceBusOutput,
    handler: (myTimer, context) => {
        // <displayInDocs>
        const timeStamp = new Date().toISOString();
        const message = `Message created at: ${timeStamp}`;
        return [`1: ${message}`, `2: ${message}`];
        // </displayInDocs>
    },
});
