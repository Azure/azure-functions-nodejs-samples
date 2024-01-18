const { app } = require('@azure/functions');

app.hook.preInvocation((context) => {
    if (context.invocationContext.options.trigger.type === 'httpTrigger') {
        context.invocationContext.log(
            `preInvocation hook executed for http function ${context.invocationContext.functionName}`
        );
    }
});

app.hook.postInvocation((context) => {
    if (context.invocationContext.options.trigger.type === 'httpTrigger') {
        context.invocationContext.log(
            `postInvocation hook executed for http function ${context.invocationContext.functionName}`
        );
    }
});
