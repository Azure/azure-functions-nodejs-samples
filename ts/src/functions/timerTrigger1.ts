import { app, InvocationContext, Timer } from '@azure/functions';

export async function timerTrigger1(myTimer: Timer, context: InvocationContext): Promise<void> {
    context.log('Timer function processed request.');
}

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    handler: timerTrigger1,
});
