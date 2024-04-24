const { app } = require('@azure/functions');

app.timer('timerTriggerWithRetry', {
    schedule: '0 */5 * * * *',
    retry: {
        strategy: 'fixedDelay',
        delayInterval: {
            seconds: 10,
        },
        maxRetryCount: 4,
    },
    handler: (myTimer, context) => {
        if (context.retryContext?.retryCount < 2) {
            throw new Error('Retry!');
        } else {
            context.log('Timer function processed request.');
        }
    },
});
