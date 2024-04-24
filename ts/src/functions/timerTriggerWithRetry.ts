import { app, InvocationContext, Timer } from '@azure/functions';

export async function timerTriggerWithRetry(myTimer: Timer, context: InvocationContext): Promise<void> {
    if (context.retryContext?.retryCount < 2) {
        throw new Error('Retry!');
    } else {
        context.log('Timer function processed request.');
    }
}

app.timer('timerTriggerWithRetry', {
    schedule: '0 */5 * * * *',
    retry: {
        strategy: 'fixedDelay',
        delayInterval: {
            seconds: 10,
        },
        maxRetryCount: 4,
    },
    handler: timerTriggerWithRetry,
});
