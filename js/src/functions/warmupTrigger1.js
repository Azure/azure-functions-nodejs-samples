const { app } = require('@azure/functions');

app.warmup('warmupTrigger', {
    handler: (warmupContext, context) => {
        context.log('Function App instance is warm.');
    },
});
