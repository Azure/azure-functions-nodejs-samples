const { app, output } = require('@azure/functions');

const serviceBusOutput = output.serviceBusQueue({
    queueName: 'testqueue',
    connection: 'MyServiceBusConnection',
});

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    return: serviceBusOutput,
    handler: (myTimer, context) => {
        const timeStamp = new Date().toISOString();
        return `Message created at: ${timeStamp}`;
    },
});
