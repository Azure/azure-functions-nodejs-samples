const { app } = require('@azure/functions');

app.warmup('warmupTrigger1', {
    handler: (warmupContext, context) => {
        context.log('Function App instance is warm.');
    },
});
