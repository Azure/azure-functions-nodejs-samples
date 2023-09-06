import { app, InvocationContext, output, Timer } from '@azure/functions';

export async function timerTrigger1(myTimer: Timer, context: InvocationContext): Promise<string> {
    const timeStamp = new Date().toISOString();
    return `Message created at: ${timeStamp}`;
}

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    return: output.serviceBusQueue({
        queueName: 'testqueue',
        connection: 'MyServiceBusConnection',
    }),
    handler: timerTrigger1,
});
