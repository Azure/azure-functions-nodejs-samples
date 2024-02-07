import { app, InvocationContext, WarmupContext } from '@azure/functions';

export async function warmupFunction(warmupContext: WarmupContext, context: InvocationContext): Promise<void> {
    context.log('Function App instance is warm.');
}

app.warmup('warmup', {
    handler: warmupFunction,
});
